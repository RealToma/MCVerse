import { useCallback, useEffect, useMemo, useState } from 'react'

import { Transition } from '@headlessui/react'
import { ethers } from 'ethers'
import { PulseLoader } from 'react-spinners'
import { toast } from 'react-toastify'

import { BoostIcon, HandlingIcon, PowerIcon, SpeedshopIcon, TiresIcon, ToolboxIcon } from 'components/Icons'
import ToolboxContainer from 'components/Speedshop/ToolboxContainer'
import tokenABI from 'contracts/abis/MCVToken.json'
import modsABI from 'contracts/abis/Mods.json'
import toolboxABI from 'contracts/abis/Toolbox.json'
import { mcvAddress, superCarModsAddress, superCarToolboxAddress, muscleCarModsAddress, muscleCarToolboxAddress } from 'contracts/address'
import { useWeb3 } from 'hooks'
import { PageMainWrapper } from 'pages/Layout'
import { useGetWeb3ReducerValues } from 'state/web3/hooks'
import * as Images from 'utils/helper/image.helper'

const Speedshop = () => {
  const { address } = useWeb3()
  const { mcvBalance } = useGetWeb3ReducerValues('walletBalance')

  const [minting, setMinting] = useState(false)
  const [hover, setHover] = useState(0)
  const [numBoxToBuy, setNumBoxToBuy] = useState(0)
  const [isMcToolboxShowing, setIsMcToolboxShowing] = useState(false)
  const [isScToolboxShowing, setIsScToolboxShowing] = useState(false)
  const [isOpeningMcToolbox, setIsOpeningMcToolbox] = useState(false)
  const [isOpeningScToolbox, setIsOpeningScToolbox] = useState(false)

  const [priceSc, setPriceSc] = useState(150)
  const [priceMc, setPriceMc] = useState(70)
  const [toolboxMode, setToolboxMode] = useState('super')

  const [totalMinted, setTotalMinted] = useState(0)
  const [goldMinted, setGoldMinted] = useState(0)
  const [totalUnopened, setTotalUnopened] = useState({
    super: { bronze: [], silver: [], gold: [], total: 0 },
    muscle: { bronze: [], silver: [], gold: [], total: 0 },
  })

  const [mcvContract, setMcvContract] = useState(null)
  const [scToolboxContract, setScToolboxContract] = useState(null)
  const [mcToolboxContract, setMcToolboxContract] = useState(null)
  const [scModsContract, setScModsContract] = useState(null)
  const [mcModsContract, setMcModsContract] = useState(null)

  const handleClickTicket = useCallback(
    (index) => {
      if (minting) return
      setNumBoxToBuy(index)
    },
    [minting]
  )

  const handleSelectMode = useCallback((mode) => {
    setToolboxMode(mode)
  }, [])

  const getInfo = useCallback(async (scToolboxContract, mcToolboxContract) => {
    try {
      const scPrice = await scToolboxContract.price()
      setPriceSc(+ethers.utils.formatEther(scPrice))
      const mcPrice = await mcToolboxContract.price()
      setPriceMc(+ethers.utils.formatEther(mcPrice))

      const scStats = await scToolboxContract.getGlobalStats()
      let scBronze = 0
      let scSilver = 0
      let scGold = 0

      scStats.forEach(({ toolboxName, minted }) => {
        if (toolboxName === 'bronze') scBronze = +minted.toString()
        if (toolboxName === 'silver') scSilver = +minted.toString()
        if (toolboxName === 'gold') scGold = +minted.toString()
      })
      const mcStats = await mcToolboxContract.getGlobalStats()
      let mcBronze = 0
      let mcSilver = 0
      let mcGold = 0

      mcStats.forEach(({ toolboxName, minted }) => {
        if (toolboxName === 'bronze') mcBronze = +minted.toString()
        if (toolboxName === 'silver') mcSilver = +minted.toString()
        if (toolboxName === 'gold') mcGold = +minted.toString()
      })

      setTotalMinted(scBronze + scSilver + scGold + mcBronze + mcSilver + mcGold)
      setGoldMinted(scGold + mcGold)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const getUnopenedToolboxInfo = useCallback(
    async (scToolboxContract, mcToolboxContract) => {
      try {
        const scBalance = await scToolboxContract.getToolboxesOf(address)
        let scBronze = []
        let scSilver = []
        let scGold = []
        scBalance.forEach(({ tokenId, name }) => {
          if (name === 'bronze') scBronze.push(tokenId.toString())
          if (name === 'silver') scSilver.push(tokenId.toString())
          if (name === 'gold') scGold.push(tokenId.toString())
        })

        const mcBalance = await mcToolboxContract.getToolboxesOf(address)
        let mcBronze = []
        let mcSilver = []
        let mcGold = []
        mcBalance.forEach(({ tokenId, name }) => {
          if (name === 'bronze') mcBronze.push(tokenId.toString())
          if (name === 'silver') mcSilver.push(tokenId.toString())
          if (name === 'gold') mcGold.push(tokenId.toString())
        })

        setTotalUnopened({
          super: {
            bronze: scBronze,
            silver: scSilver,
            gold: scGold,
            total: scBalance.length,
          },
          muscle: {
            bronze: mcBronze,
            silver: mcSilver,
            gold: mcGold,
            total: mcBalance.length,
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
    [address]
  )

  const handleMint = useCallback(async () => {
    try {
      if (minting) return

      if (numBoxToBuy < 1) {
        toast.warning('You must select at least one toolbox.')
        return
      }
      if (toolboxMode === 'super' && +mcvBalance < numBoxToBuy * priceSc) {
        toast.error('Not enough funds')
        return
      }
      if (toolboxMode === 'muscle' && +mcvBalance < numBoxToBuy * priceMc) {
        toast.error('Not enough funds')
        return
      }

      setMinting(true)

      if (toolboxMode === 'super') {
        const mcvAllowance = await mcvContract.allowance(address, superCarToolboxAddress)
        if (parseInt(ethers.utils.formatEther(mcvAllowance)) < numBoxToBuy * priceSc) {
          const res = await mcvContract.approve(superCarToolboxAddress, ethers.utils.parseEther('99999999999999'))
          await res.wait()
        }

        const tx = await scToolboxContract.mint(+numBoxToBuy)
        await tx.wait()
      }
      if (toolboxMode === 'muscle') {
        const mcvAllowance = await mcvContract.allowance(address, muscleCarToolboxAddress)
        if (parseInt(ethers.utils.formatEther(mcvAllowance)) < numBoxToBuy * priceMc) {
          const res = await mcvContract.approve(muscleCarToolboxAddress, ethers.utils.parseEther('99999999999999'))
          await res.wait()
        }
        const tx = await mcToolboxContract.mint(+numBoxToBuy)
        await tx.wait()
      }

      setTimeout(() => {
        toast.success('Minted Successfully!')
        setHover(0)
        setNumBoxToBuy(0)
        setMinting(false)
        getInfo(scToolboxContract, mcToolboxContract)
        getUnopenedToolboxInfo(scToolboxContract, mcToolboxContract)
      }, 15000)
    } catch (error) {
      setMinting(false)
      console.log(error)
      toast.error('Something went wrong, Please try again later')
    }
  }, [
    mcvBalance,
    address,
    getInfo,
    getUnopenedToolboxInfo,
    mcToolboxContract,
    mcvContract,
    minting,
    numBoxToBuy,
    priceMc,
    priceSc,
    scToolboxContract,
    toolboxMode,
  ])

  const handleShowSuperCarToolboxes = useCallback(() => {
    setIsScToolboxShowing((prev) => !prev)
    setIsMcToolboxShowing(false)
  }, [])

  const handleShowMuscleCarToolboxes = useCallback(() => {
    setIsMcToolboxShowing((prev) => !prev)
    setIsScToolboxShowing(false)
  }, [])

  const handleOpenToolbox = useCallback(
    async (lists, nfvType) => {
      if (lists.length === 0) {
        toast.warning('You should select at least one toolbox')
        return
      }
      try {
        if (nfvType === 'muscle') {
          if (isOpeningMcToolbox) return
          setIsOpeningMcToolbox(true)
          const isApproved = await mcToolboxContract.isApprovedForAll(address, muscleCarModsAddress)
          if (!isApproved) {
            const txApproval = await mcToolboxContract.setApprovalForAll(muscleCarModsAddress, true)
            await txApproval.wait()
          }

          const txBurn = await mcModsContract.burnToolboxesForMods(lists)
          await txBurn.wait()
        }
        if (nfvType === 'super') {
          if (isOpeningScToolbox) return
          setIsOpeningScToolbox(true)
          const isApproved = await scToolboxContract.isApprovedForAll(address, superCarModsAddress)
          if (!isApproved) {
            const txApproval = await scToolboxContract.setApprovalForAll(superCarModsAddress, true)
            await txApproval.wait()
          }

          const txBurn = await scModsContract.burnToolboxesForMods(lists)
          await txBurn.wait()
        }

        setTimeout(() => {
          getUnopenedToolboxInfo(scToolboxContract, mcToolboxContract)
          setIsMcToolboxShowing(false)
          setIsScToolboxShowing(false)
          toast.success(`${lists.length} toolboxes were opened, please view your mods in the garage!`)
          if (nfvType === 'muscle') setIsOpeningMcToolbox(false)
          if (nfvType === 'super') setIsOpeningScToolbox(false)
        }, 15000)
      } catch (error) {
        console.log(error)
        if (nfvType === 'muscle') setIsOpeningMcToolbox(false)
        if (nfvType === 'super') setIsOpeningScToolbox(false)
      }
    },
    [
      address,
      getUnopenedToolboxInfo,
      isOpeningMcToolbox,
      isOpeningScToolbox,
      mcModsContract,
      mcToolboxContract,
      scModsContract,
      scToolboxContract,
    ]
  )

  const price = useMemo(() => {
    return {
      super: priceSc,
      muscle: priceMc,
    }
  }, [priceMc, priceSc])

  useEffect(() => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const scToolboxContract = new ethers.Contract(superCarToolboxAddress, toolboxABI, signer)
    setScToolboxContract(scToolboxContract)
    const mcToolboxContract = new ethers.Contract(muscleCarToolboxAddress, toolboxABI, signer)
    setMcToolboxContract(mcToolboxContract)
    const mcvContract = new ethers.Contract(mcvAddress, tokenABI, signer)
    setMcvContract(mcvContract)
    const scModsContract = new ethers.Contract(superCarModsAddress, modsABI, signer)
    setScModsContract(scModsContract)
    const mcModsContract = new ethers.Contract(muscleCarModsAddress, modsABI, signer)
    setMcModsContract(mcModsContract)

    getInfo(scToolboxContract, mcToolboxContract)
    getUnopenedToolboxInfo(scToolboxContract, mcToolboxContract)
  }, [])

  return (
    <PageMainWrapper>
      <div className="relative pb-4 mb-10 md:pb-40 md:mb-24 2xl:pb-32 2xl:mb-12 callout-bg">
        <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-black border border-cyan-650 shadow-[0_0_9px_rgba(77,201,255,0.9)] hidden md:flex items-center justify-center">
          <SpeedshopIcon width={32} height={32} />
        </div>
        <div className="flex items-center justify-between h-16 sm:ml-6 md:ml-20 2xl:pr-4">
          <div className="w-11 h-11 rounded-full bg-black border border-[#009EFF] shadow-[0_0_9px_rgba(77,201,255,0.9)] md:hidden flex items-center justify-center">
            <SpeedshopIcon width={24} height={24} />
          </div>
          <div className="md:flex md:items-center">
            <div
              className="font-bold text-xl text-[#33D4FF] leading-4 tracking-[2.4px] uppercase hidden md:block"
              style={{ textShadow: '0px 0px 5px rgba(50, 171, 252, 0.98)' }}
            >
              SPEEDSHOP
            </div>
            <div className="w-px border border-r border-dashed border-[#FFD900] h-6 rotate-[30deg] mx-1 sm:mx-4 hidden md:block"></div>
            <div className="text-white text-xs text-center leading-5 md:text-[10px] font-medium md:tracking-[2px] md:text-shadow-blue">
              Welcome to the MCVerse Speedshop
            </div>
          </div>
          <div className="flex flex-col flex-wrap items-center gap-1 sm:flex-row md:gap-2">
            <div className="relative">
              <div
                className="border md:border-2 border-[#23D0FF] rounded-l-3xl rounded-tr-xl p-1 pl-1.5 md:pl-2.5 flex items-center gap-1 hover:bg-[#23D0FF20] cursor-pointer"
                onClick={() => handleShowSuperCarToolboxes()}
              >
                <img src={Images.iconGville} alt="" className="w-4 h-4 md:w-5 md:h-6" />
                <div className="text-[10px] leading-3 text-right tracking-[1px] text-[#23D0FF] text-shadow-blue w-20 hidden md:block">
                  GSC TOOLBOXES
                </div>
                <div className="md:text-3xl leading-3 tracking-[1px] text-white text-shadow-blue">{totalUnopened.super.total}</div>
              </div>
              <Transition
                show={isScToolboxShowing}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ToolboxContainer
                  isOpening={isOpeningScToolbox}
                  toolbox={totalUnopened.super}
                  type={`super`}
                  handleOpenToolbox={handleOpenToolbox}
                />
              </Transition>
            </div>
            <div className="relative">
              <div
                className="border md:border-2 border-[#FFAE00] rounded-l-3xl rounded-tr-xl p-1 pl-1.5 md:pl-2.5 flex items-center gap-1 hover:bg-[#FFAE0020] cursor-pointer"
                onClick={() => handleShowMuscleCarToolboxes()}
              >
                <img src={Images.iconAhill} alt="" className="w-4 h-4 md:w-6 md:h-6" />
                <div className="text-[10px] leading-3 text-right tracking-[1px] text-[#FFAE00] text-shadow-blue w-20 hidden md:block">
                  AMCC TOOLBOXES
                </div>
                <div className="md:text-3xl leading-3 tracking-[1px] text-white text-shadow-blue">{totalUnopened.muscle.total}</div>
              </div>
              <Transition
                show={isMcToolboxShowing}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ToolboxContainer
                  isOpening={isOpeningMcToolbox}
                  toolbox={totalUnopened.muscle}
                  type={`muscle`}
                  handleOpenToolbox={handleOpenToolbox}
                />
              </Transition>
            </div>
          </div>
        </div>
        <div className="grid gap-2 mt-2 xl:pr-4 xl:grid-cols-2 2xl:grid-cols-7 3xl:grid-cols-3">
          <div className="2xl:col-span-3 3xl:col-span-1 bg-black bg-opacity-50 border-[0.5px] border-cyan-50 pl-6 pr-4 py-6 md:ml-4 2xl:ml-0 rounded-t-2xl 2xl:rounded-tr-md rounded-b-2xl">
            <div className="flex items-center gap-3 mx-auto md:mx-0">
              <ToolboxIcon width={44} height={44} color={`#FFD900`} />
              <img src={Images.logoToolbox} alt="logo" />
            </div>
            <div className="py-5 text-xs leading-5 md:text-sm">
              Toolboxes are unrevealed NFTs and are opened in the garage to reveal the power-up. There are 3 colors of toolboxes: Bronze,
              Silver, and Gold. Power-ups available are Power, Handling, Boost, and Tires. Opened toolboxes can be applied to a NFV in the
              garage.
            </div>
            <div className="my-2 border-b border-dashed border-cyan-150"></div>
            <div className="grid grid-cols-none gap-1 py-2 sm:grid-cols-12">
              <div className="col-span-5">
                <div className="text-lg leading-5 text-cyan-250">Market Price:</div>
                <div className="flex items-center gap-1 py-1">
                  <img src={Images.iconAhill} alt="" className="w-7 h-7" />
                  <div className="w-px h-5 mx-1 border-r border-gray-600"></div>
                  <div className="bg-black w-7 h-7 flex items-center justify-center rounded-full shadow-[0_0_7px_rgba(0,163,255,0.8)]">
                    <img src={Images.logoMCV} alt="icon_mcv" className="w-5 h-5" />
                  </div>
                  <div className=" text-xl leading-3 tracking-[0.8px] text-white text-shadow-blue mt-2 uppercase whitespace-nowrap">
                    {priceMc} <span className="text-xs">mcv</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 py-1">
                  <img src={Images.iconGville} alt="" className="w-7 h-7" />
                  <div className="w-px h-5 mx-1 border-r border-gray-600"></div>
                  <div className="bg-black w-7 h-7 flex items-center justify-center rounded-full shadow-[0_0_7px_rgba(0,163,255,0.8)]">
                    <img src={Images.logoMCV} alt="icon_mcv" className="w-5 h-5" />
                  </div>
                  <div className=" text-xl leading-3 tracking-[0.8px] text-white text-shadow-blue mt-2 uppercase whitespace-nowrap">
                    {priceSc} <span className="text-xs">mcv</span>
                  </div>
                </div>
              </div>
              <div className="grid col-span-7 gap-2 sm:gap-1 sm:grid-cols-2">
                <div>
                  <div className=" text-[10px] leading-3 text-cyan tracking-[1px] text-shadow-blue uppercase">toolboxes minted</div>
                  <div className=" text-2xl leading-3 text-whtie tracking-[1px] text-shadow-blue mt-2">{totalMinted.toLocaleString()}</div>
                </div>
                <div>
                  <div className=" text-[10px] leading-3 text-cyan tracking-[1px] text-shadow-blue uppercase">gold toolboxes minted</div>
                  <div className=" text-2xl leading-3 text-whtie tracking-[1px] text-shadow-blue mt-2">{goldMinted.toLocaleString()}</div>
                </div>
              </div>
            </div>
            <div className="my-2 border-b border-dashed border-cyan-150"></div>
            <div className="grid gap-2 py-2 sm:grid-cols-3">
              <div>
                <div className="pb-2 text-lg font-medium leading-5 text-amber-400">Levels</div>
                <div className="py-2">
                  <div className=" font-medium text-[10px] leading-3 tracking-[1px] text-[#F3B14D] text-shadow-blue">BRONZE</div>
                  <div className=" font-medium text-2xl leading-3 tracking-[1px] text-white text-shadow-blue mt-2">+ 1</div>
                </div>
                <div className="py-2">
                  <div className=" font-medium text-[10px] leading-3 tracking-[1px] text-[#E0E0E0] text-shadow-blue">SILVER</div>
                  <div className=" font-medium text-2xl leading-3 tracking-[1px] text-white text-shadow-blue mt-2">+ 2</div>
                </div>
                <div className="py-2">
                  <div className=" font-medium text-[10px] leading-3 tracking-[1px] text-amber-400 text-shadow-blue">GOLD</div>
                  <div className=" font-medium text-2xl leading-3 tracking-[1px] text-white text-shadow-blue mt-2">+ 3</div>
                </div>
              </div>
              <div className="border-dashed border-y border-x-0 sm:border-x sm:border-y-0 border-amber-400 sm:px-2">
                <div className="pb-2 text-lg font-medium leading-5 text-amber-400">Power-ups</div>
                <div className="flex items-center gap-3 py-1.5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet">
                    <PowerIcon width={28} height={28} />
                  </div>
                  <div className="text-xs font-medium leading-3 text-white ">Power</div>
                </div>
                <div className="flex items-center gap-3 py-1.5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-700">
                    <HandlingIcon width={28} height={28} />
                  </div>
                  <div className="text-xs font-medium leading-3 text-white ">Handling</div>
                </div>
                <div className="flex items-center gap-3 py-1.5">
                  <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full">
                    <BoostIcon width={20} height={28} />
                  </div>
                  <div className="text-xs font-medium leading-3 text-white ">Boost</div>
                </div>
                <div className="flex items-center gap-3 py-1.5">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-400 rounded-full">
                    <TiresIcon width={28} height={28} />
                  </div>
                  <div className="text-xs font-medium leading-3 text-white ">Tires</div>
                </div>
              </div>
              <div>
                <div className="pb-2 text-lg font-medium leading-5 text-amber-400">100% Burn</div>
                <div className="text-xs font-medium leading-3 tracking-wider text-white ">
                  All funds generated from toolbox minting are burned to a dead wallet.
                </div>
              </div>
            </div>
          </div>
          <div className="xl:col-span-4 3xl:col-span-2 bg-black bg-opacity-50 border-[0.5px] border-cyan-50 rounded-xl md:ml-4 3xl:ml-0 md:p-6 py-4 px-2">
            <div className="text-lg leading-5 text-cyan-250">What type of Toolbox would you like to mint?</div>
            <div className="flex flex-wrap items-center gap-4 py-2">
              <div
                className={`${
                  toolboxMode === 'super' ? 'border-amber-500' : 'border-gray-700 hover:border-amber-500 opacity-40 cursor-pointer'
                } border bg-black bg-opacity-10 rounded-md flex flex-col sm:flex-row items-center gap-2 py-2 px-4`}
                onClick={() => handleSelectMode('super')}
              >
                <img src={Images.iconGville} alt="" className="w-5" />
                <img src={Images.logoSuperCar} alt="" className="w-40" />
                <div className="w-full mx-1 border-b border-gray-600 sm:border-r sm:border-b-0 sm:h-11 sm:w-px"></div>
                <div>
                  <div className="text-xs leading-5 text-white uppercase ">cost:</div>
                  <div className="text-lg leading-5 text-white uppercase ">
                    <span className="font-bold">{priceSc}</span> mcv
                  </div>
                </div>
              </div>
              <div
                className={`${
                  toolboxMode === 'muscle' ? 'border-amber-500' : 'border-gray-700 hover:border-amber-500 opacity-40 cursor-pointer'
                } border bg-black bg-opacity-10 rounded-md flex flex-col sm:flex-row items-center gap-2 py-2 px-4`}
                onClick={() => handleSelectMode('muscle')}
              >
                <img src={Images.iconAhill} alt="" className="w-6" />
                <img src={Images.logoMuscleCar} alt="" className="w-40" />
                <div className="w-full mx-1 border-b border-gray-600 sm:border-r sm:border-b-0 sm:h-11 sm:w-px"></div>
                <div>
                  <div className="text-xs leading-5 text-white uppercase ">cost:</div>
                  <div className="text-lg leading-5 text-white uppercase ">
                    <span className="font-bold">{priceMc}</span> mcv
                  </div>
                </div>
              </div>
            </div>
            <div className="my-4 border-b border-dashed border-cyan-150"></div>

            <div className="text-lg leading-5 text-cyan-250">How many Toolboxes would you like to mint?</div>
            <div className="py-1 text-sm leading-5 text-white ">You may mint a max of 10 per transaction.</div>
            <div className="my-4 border-b border-dashed border-cyan-150"></div>
            <div className="grid grid-cols-5 gap-2 py-2 sm:grid-cols-10 md:grid-cols-10 xl:grid-cols-5 2xl:grid-cols-10">
              {[...Array(10)].map((_, index) => {
                index += 1
                return (
                  <div key={index} className="flex items-center justify-center w-full">
                    <button
                      type="button"
                      onClick={() => handleClickTicket(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(numBoxToBuy)}
                      className="w-full h-full bg-transparent border-none outline-none cursor-pointer"
                    >
                      {index <= numBoxToBuy ? (
                        <img src={Images.toolboxActive} alt="car" loading="lazy" className="w-full border rounded-md border-amber-400" />
                      ) : (
                        <div
                          className={`${
                            index <= hover ? 'border-white' : 'border-[#2F2F2F]'
                          } bg-black border  rounded-md flex items-center justify-center w-full p-2 xl:p-4 aspect-square`}
                        >
                          <img
                            src={Images.iconToolbox}
                            alt="icon_toolbox"
                            className={`w-full ${index <= hover ? 'opacity-100' : 'opacity-30'}`}
                            loading="lazy"
                          />
                        </div>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
            <div className=" text-sm leading-5 text-amber-500 py-0.5">
              {numBoxToBuy} {toolboxMode === 'muscle' ? 'MuscleCar' : 'SuperCar'} Toolboxes Selected
            </div>
            <div className="my-4 border-b border-dashed border-cyan-150"></div>
            <div className="items-center gap-4 sm:flex">
              <div className="text-lg leading-5 text-cyan-250">Pay With:</div>
              <div
                className={`bg-[black] bg-opacity-10 border border-amber-500 rounded-md p-3 my-2 w-fit flex items-center flex-col sm:flex-row`}
              >
                <div className="flex items-center justify-between w-full sm:w-auto sm:block">
                  <div className="flex items-center gap-2 py-1">
                    <div className="bg-black w-7 h-7 flex items-center justify-center rounded-full shadow-[0_0_7px_rgba(0,163,255,0.8)]">
                      <img src={Images.logoMCV} alt="icon_mcv" className="w-5 h-5" />
                    </div>
                    <div className="text-2xl leading-5 text-white uppercase ">mcv</div>
                  </div>
                  <div className="text-sm leading-5 text-white ">Bal: {mcvBalance && (+mcvBalance).toLocaleString()}</div>
                </div>
                <div className="w-full mx-2 border-b border-gray-600 sm:border-r sm:border-b-0 sm:h-11 sm:w-px"></div>
                <div className={` leading-5 text-white`}>
                  <div className="text-lg">
                    <span className="font-bold">{numBoxToBuy} Toolboxes</span> x{price[toolboxMode]} MCV
                  </div>
                  <div className="text-sm">You will pay: {(numBoxToBuy * price[toolboxMode]).toLocaleString()} MCV</div>
                </div>
              </div>
            </div>
            <div className="my-4 border-b border-dashed border-cyan-150"></div>
            <div className="items-center gap-4 sm:flex">
              <div className="text-lg leading-5 text-cyan-250">Checkout:</div>
              <div className="flex flex-col justify-between gap-10 py-3 sm:flex-row grow">
                <div className="flex flex-col gap-8 sm:flex-row">
                  <div>
                    <div className=" text-[10px] leading-3 tracking-[1px] text-cyan text-shadow-blue">PAYING WITH</div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="bg-black w-7 h-7 flex items-center justify-center rounded-full shadow-[0_0_7px_rgba(0,163,255,0.8)]">
                        <img src={Images.logoMCV} alt="icon_mcv" className="w-5 h-5" />
                      </div>
                      <div className="text-lg font-bold leading-5 text-white uppercase ">mcv</div>
                    </div>
                  </div>
                  <div>
                    <div className=" text-[10px] leading-3 tracking-[1px] text-cyan text-shadow-blue">TOOLBOXES SELECTED</div>
                    <div className="mt-2 text-3xl leading-4 tracking-[1px] text-white text-shadow-blue uppercase ">{numBoxToBuy}</div>
                  </div>
                  <div>
                    <div className=" text-[10px] leading-3 tracking-[1px] text-cyan text-shadow-blue">TOTAL</div>
                    <div className="mt-2 text-3xl leading-4 tracking-[1px] text-white uppercase ">
                      <span className="text-shadow-blue">{(numBoxToBuy * price[toolboxMode]).toLocaleString()}</span>{' '}
                      <span className="text-lg leading-5 ">mcv</span>
                    </div>
                  </div>
                </div>
                <div className="mx-auto md:mx-0">
                  <button
                    className="border-2 border-[#00C6FB] rounded-tr-lg rounded-bl-lg hover:bg-cyan-700 hover:bg-opacity-30 text-center  font-bold text-lg leading-4 tracking-[1px] text-cyan-250 uppercase px-4 3xl:px-6 py-2.5"
                    onClick={() => handleMint()}
                  >
                    {minting ? (
                      <PulseLoader color="#21D0FF" size={10} className="px-6 mx-auto" />
                    ) : (
                      <div className="items-center gap-3 sm:flex">
                        <img src={Images.iconMint} alt="" className="w-8 h-8 mx-auto" />
                        <div className="mt-2 text-center sm:mt-0">mint my toolboxes</div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageMainWrapper>
  )
}

export default Speedshop
