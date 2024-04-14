import { useCallback, useEffect, useState } from 'react'

import { ethers } from 'ethers'
import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { toast } from 'react-toastify'

import { DealershipIcon } from 'components/Icons'
import tokenABI from 'contracts/abis/MCVToken.json'
import mintABI from 'contracts/abis/Mint.json'
import mintWithTokenABI from 'contracts/abis/MintWithToken.json'
import carABI from 'contracts/abis/Nfv.json'
import { carAddress, mcvAddress, mintAddress, mintWithMcvAddress } from 'contracts/address'
import { useWeb3 } from 'hooks'
import { PageMainWrapper } from 'pages/Layout'
import { imgMuscleCarUrl } from 'services/api'
import { useGetWeb3ReducerValues } from 'state/web3/hooks'
import * as Images from 'utils/helper/image.helper'

const Dealership = () => {
  const navigate = useNavigate()
  const { address } = useWeb3()
  const { avaxBalance, mcvBalance } = useGetWeb3ReducerValues('walletBalance')

  const [mintContract, setMintContract] = useState(null)
  const [carContract, setCarContract] = useState(null)
  const [mintWithMcvContract, setMintWithMcvContract] = useState(null)
  const [mcvContract, setMcvContract] = useState(null)

  const [isMinted, setIsMinted] = useState(false)
  const [minting, setMinting] = useState(false)
  const [hover, setHover] = useState(0)
  const [numBoxToBuy, setNumBoxToBuy] = useState(0)
  const [payMode, setPayMode] = useState('avax')
  const [mintPrice, setMintPrice] = useState(null)
  const [mintWithMcvPrice, setMintWithMcvPrice] = useState(null)
  const [ended, setEnded] = useState(false)
  const [mcvEnded, setMcvEnded] = useState(false)
  const [totalMinted, setTotalMinted] = useState(0)
  const [maxMinted, setMaxMinted] = useState(0)
  const [totalMintedWithMcv, setTotalMintedWithMcv] = useState(0)
  const [mintedTokenIds, setMintedTokenIds] = useState([])
  const [revealedTokenIds, setRevealedTokenIds] = useState([])
  const [revealTokenId, setRevealTokenId] = useState(null)

  const init = useCallback(async (mintContract, mintWithMcvContract, carContract) => {
    try {
      const mintPrice = await mintContract.mintPrice()
      const ended = await mintContract.ended()
      const maxMinted = await carContract.MAX_LAMBOS()
      const totalMinted = await carContract.totalSupply()

      setMintPrice(mintPrice.toString())
      setEnded(ended)
      setTotalMinted(totalMinted.toString())
      setMaxMinted(maxMinted.toString())
      console.log(totalMinted.toString(), maxMinted.toString(), mintPrice.toString())

      const mintWithMcvPrice = await mintWithMcvContract.mintPrice()
      setMintWithMcvPrice(mintWithMcvPrice.toString())
      const totalMintedWithMcv = await mintWithMcvContract.totalMinted()
      setTotalMintedWithMcv(+totalMintedWithMcv.toString())
      const mcvEnded = await mintWithMcvContract.ended()
      setMcvEnded(mcvEnded)
      // console.log('infoWithMcv', totalMintedWithMcv.toString())
      // dispatch(setMintedNum(totalMinted.toString()));
      // dispatch(setStockNum(maxMinted.toString() - totalMinted.toString()));
    } catch (error) {
      console.log(error)
    }
  }, [])
  const handleMint = useCallback(async () => {
    try {
      if (minting) return
      if (numBoxToBuy < 1) {
        toast.warning('You must select at least one NFT.')
        return
      }
      if (maxMinted === totalMinted) {
        return toast.error('MINT ENDS')
      }
      if (payMode === 'avax') {
        if (ended) return toast.error('MINT ENDS')
        if (+avaxBalance < ethers.utils.formatEther(mintPrice) * numBoxToBuy) {
          return toast.error('NOT ENOUGH BALANCE')
        }
      }
      if (payMode === 'mcv') {
        if (+mcvBalance < ethers.utils.formatEther(mintWithMcvPrice) * numBoxToBuy) {
          return toast.error('NOT ENOUGH BALANCE')
        }
        if (mcvEnded || totalMintedWithMcv > 500) {
          return toast.error('MINT ENDS')
        }
      }
      setMinting(true)

      if (payMode === 'avax') {
        const price = ethers.utils.parseEther(ethers.utils.formatEther(mintPrice) * numBoxToBuy + '')
        const tx = await mintContract.mint(numBoxToBuy, {
          value: price,
        })
        const result = await tx.wait()
        // console.log(result)
        const mintedCarIds = result.events
          .filter(({ topics }) => topics.length === 4)
          .map(({ topics }) => ethers.utils.formatUnits(topics[3], 0))
        // console.log(mintedCarIds)
        setMintedTokenIds(mintedCarIds)
      }
      if (payMode === 'mcv') {
        const mcvAllowance = await mcvContract.allowance(address, mintWithMcvAddress)
        if (parseInt(ethers.utils.formatEther(mcvAllowance)) < 10000) {
          const res = await mcvContract.approve(mintWithMcvAddress, ethers.utils.parseEther('99999999999999'))
          await res.wait()
        }

        const tx = await mintWithMcvContract.mint(numBoxToBuy)
        const result = await tx.wait()
        const mintedCarIds = result.events
          .filter(({ topics }) => topics.length === 4)
          .map(({ topics }) => ethers.utils.formatUnits(topics[3], 0))
        // console.log(mintedCarIds)
        setMintedTokenIds(mintedCarIds)
      }

      setIsMinted(true)
      setNumBoxToBuy(0)
      setHover(0)
      toast.success('Minted successfully!')
      init(mintContract, mintWithMcvContract, carContract)
      setMinting(false)
    } catch (error) {
      setMinting(false)
      console.log(error)
    }
  }, [
    address,
    avaxBalance,
    carContract,
    ended,
    init,
    maxMinted,
    mcvBalance,
    mcvContract,
    mcvEnded,
    mintContract,
    mintPrice,
    mintWithMcvPrice,
    mintWithMcvContract,
    minting,
    numBoxToBuy,
    payMode,
    totalMinted,
    totalMintedWithMcv,
  ])
  const handleClickTicket = useCallback(
    (index) => {
      if (minting) return
      setNumBoxToBuy(index)
      setIsMinted(false)
      setMintedTokenIds([])
    },
    [minting]
  )

  const handleSelectPaymentMode = useCallback((mode) => {
    setPayMode(mode)
  }, [])

  const handleReveal = useCallback(
    (tokenId) => {
      setRevealTokenId(tokenId)
      setRevealedTokenIds([...revealedTokenIds, tokenId])
    },
    [revealedTokenIds]
  )

  const handleClose = useCallback(() => {
    setRevealTokenId(null)
  }, [])

  const handleGoToGarage = useCallback(
    (id) => {
      navigate('/garage', {
        state: {
          id,
          type: 'muscle',
        },
      })
    },
    [navigate]
  )

  useEffect(() => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const mintContract = new ethers.Contract(mintAddress, mintABI, signer)
    setMintContract(mintContract)
    const carContract = new ethers.Contract(carAddress, carABI, signer)
    setCarContract(carContract)
    const mintWithMcvContract = new ethers.Contract(mintWithMcvAddress, mintWithTokenABI, signer)
    setMintWithMcvContract(mintWithMcvContract)
    const mcvContract = new ethers.Contract(mcvAddress, tokenABI, signer)
    setMcvContract(mcvContract)

    init(mintContract, mintWithMcvContract, carContract)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PageMainWrapper>
        <div className="relative pb-4 mb-10 md:pb-40 md:mb-24 2xl:pb-20 2xl:mb-12 callout-bg">
          <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-black border border-cyan-650 shadow-[0_0_9px_rgba(77,201,255,0.9)] hidden md:flex items-center justify-center">
            <DealershipIcon width={40} height={40} />
          </div>
          <div className="hidden ml-1 sm:ml-6 md:ml-20 md:flex md:items-center md:justify-between md:mr-[14vw] h-16">
            <div className="md:flex md:items-center">
              <div
                className="font-bold text-xl text-cyan-100 leading-4 tracking-[2.4px] uppercase"
                style={{ textShadow: '0px 0px 5px rgba(50, 171, 252, 0.98)' }}
              >
                MINT AN AVALANCHE HILLS MUSCLE CAR
              </div>
              <div className="w-px border border-r border-dashed border-amber-400 h-6 rotate-[30deg] mx-1 sm:mx-4"></div>
              <div className="text-white text-[10px] font-medium tracking-[2px] text-shadow-blue">Created by MCVerse</div>
            </div>
          </div>
          <div className="grid gap-2 mt-2 xl:pr-4 xl:grid-cols-2 2xl:grid-cols-7 3xl:grid-cols-3">
            <div className="2xl:col-span-3 3xl:col-span-1 bg-gradient-blue border-[0.5px] border-cyan-50 pl-6 pr-4 py-6 md:ml-4 2xl:ml-0 rounded-t-2xl 2xl:rounded-tr-md rounded-b-2xl">
              <img src={Images.logoMuscleCarGD} alt="logo" className="mx-auto md:mx-0" />
              <div className="py-5 text-sm leading-5 ">
                Avax Muscle Cars are 10,000 randomly-generated 3D NFTs with utility that allows you to play, race, win, and earn crypto.
                AMCC Muscle Cars earn up to 34 MCV per day, and you can race your car in the beta game!
              </div>
              <div className="my-2 border-b border-dashed border-cyan-150"></div>
              <div className="grid grid-cols-none gap-2 py-2 sm:grid-cols-12">
                <div className="col-span-5">
                  <div className="text-lg leading-5 text-cyan-250">Cost to mint:</div>
                  <div className="">
                    <div className="flex items-center gap-1 py-1">
                      <img src={Images.logoAvaxWhite} alt="icon_avax" />
                      <div className="text-2xl leading-3 tracking-[1px] text-white text-shadow-blue mt-2 uppercase">
                        {mintPrice ? +ethers.utils.formatEther(mintPrice) : 0} avax
                      </div>
                    </div>
                    <div className=" text-[10px] leading-3 tracking-[1px] text-white text-shadow-blue py-1 uppercase">- or -</div>
                    <div className="flex items-center gap-1 py-1">
                      <div className="bg-black w-7 h-7 flex items-center justify-center rounded-full shadow-[0_0_7px_rgba(0,163,255,0.8)]">
                        <img src={Images.logoMCV} alt="icon_mcv" className="w-5 h-5" />
                      </div>
                      <div className="text-2xl leading-3 tracking-[1px] text-white text-shadow-blue mt-2 uppercase">
                        {mintWithMcvPrice ? (+ethers.utils.formatEther(mintWithMcvPrice)).toLocaleString() : 0} mcv
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 col-span-7">
                  <div>
                    <div className="pb-2">
                      <div className=" text-[10px] leading-3 text-cyan tracking-[1px] text-shadow-blue uppercase">minted</div>
                      <div className="text-2xl leading-3 text-whtie tracking-[1px] text-shadow-blue mt-2">
                        {(+totalMinted).toLocaleString()}
                      </div>
                    </div>
                    <div className="py-2">
                      <div className=" text-[10px] leading-3 text-cyan tracking-[1px] text-shadow-blue uppercase">inventory</div>
                      <div className="text-2xl leading-3 text-whtie tracking-[1px] text-shadow-blue mt-2">
                        {(maxMinted - totalMinted).toLocaleString()}
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className=" text-[10px] leading-3 text-cyan tracking-[1px] text-shadow-blue uppercase">max mints</div>
                      <div className="text-2xl leading-3 text-whtie tracking-[1px] text-shadow-blue mt-2">
                        {(+maxMinted).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="pb-2">
                      <div className=" text-[10px] leading-3 text-amber-700 tracking-[1px] text-shadow-blue uppercase">minted w/ mcv</div>
                      <div className="text-2xl leading-3 text-whtie tracking-[1px] text-shadow-blue mt-2">{totalMintedWithMcv}</div>
                    </div>
                    <div className="py-2">
                      <div className=" text-[10px] leading-3 text-amber-700 tracking-[1px] text-shadow-blue uppercase">mcv mints left</div>
                      <div className="text-2xl leading-3 text-whtie tracking-[1px] text-shadow-blue mt-2">
                        {/* {1000 - totalMintedWithMcv - 214}SOLD OUT{totalMintedWithMcv} */}
                        {500 - totalMintedWithMcv}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-2 border-b border-dashed border-cyan-150"></div>
              <div className="grid grid-cols-none md:grid-cols-3 xl:grid-cols-none">
                <a className="flex gap-6 py-1 mx-auto md:mx-0" target="_blank" href="https://twitter.com/TheMCVerse" rel="noreferrer">
                  <img src={Images.socialTwitter} alt="icon_twitter" />
                  <div className="text-sm leading-7 text-white ">Follow us on Twitter</div>
                </a>
                <a className="flex gap-6 py-1 mx-auto md:mx-0" target="_blank" href="https://discord.gg/8vMcCx3R2K" rel="noreferrer">
                  <img src={Images.socialDiscord} alt="icon_discord" />
                  <div className="text-sm leading-7 text-white ">Join our Discord</div>
                </a>
                <a className="flex gap-6 py-1 mx-auto md:mx-0" target="_blank" href="https://mcverse.app/" rel="noreferrer">
                  <img src={Images.socialWorld} alt="icon_world" />
                  <div className="text-sm leading-7 text-white ">Visit our Website</div>
                </a>
              </div>
            </div>
            <div className="2xl:col-span-4 3xl:col-span-2 bg-gradient-blue border-[0.5px] border-cyan-50 rounded-xl md:ml-4 3xl:ml-0 p-6">
              <div className="text-lg leading-5 text-cyan-250">How many NFTs would you like to mint?</div>
              <div className="py-1 text-sm leading-5 text-white ">You may mint a max of 10 per transaction.</div>
              <div className="my-2 border-b border-dashed border-cyan-150"></div>
              <div className="grid grid-cols-3 gap-2 py-2 sm:grid-cols-5 md:grid-cols-10 xl:grid-cols-5 3xl:grid-cols-10">
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
                          <img src={Images.carActive} alt="car" loading="lazy" className="w-full" />
                        ) : (
                          <div
                            className={`bg-black border border-[#2F2F2F] rounded-md flex items-center justify-center w-full p-2 xl:p-4 aspect-square`}
                          >
                            <img
                              src={Images.iconAhill}
                              alt="icon_ahill"
                              className={`w-full ${index <= hover ? 'opacity-80' : 'opacity-20'}`}
                              loading="lazy"
                            />
                          </div>
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
              <div className=" text-sm leading-5 text-amber-500 py-0.5">{numBoxToBuy} Mints Selected</div>
              <div className="my-2 border-b border-dashed border-cyan-150"></div>
              {isMinted ? (
                <div className="py-2 uppercase ">
                  <div className="text-white text-sm tracking-[2.2px] text-shadow-blue">congratulations!</div>
                  <div
                    className="text-2xl tracking-widest text-cyan-500"
                    style={{
                      textShadow: '0px 0px 5px rgba(77, 201, 255, 0.85)',
                    }}
                  >
                    here are your new mints!
                  </div>
                  <table className="w-full  text-xs text-white tracking-[2.2px]">
                    <thead>
                      <tr className="uppercase border-gray-400 border-dashed border-y border-x-0 text-shadow-blue">
                        <th className="text-left">freshly minted!</th>
                        <th className="p-3">mint id</th>
                        <th className="p-3">mint date</th>
                        <th className="p-3">reveal</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {mintedTokenIds.map((tokenId, index) => (
                        <tr className="border-b border-dashed border-cyan-50 last:border-0" key={index}>
                          <td className="py-3">
                            {revealedTokenIds.includes(tokenId) ? (
                              <img
                                src={`${imgMuscleCarUrl}${tokenId}`}
                                alt="car"
                                loading="lazy"
                                className="w-11"
                                title="Click to go to Garage"
                                onClick={() => handleGoToGarage(tokenId)}
                              />
                            ) : (
                              <img src={Images.carActive} alt="car" loading="lazy" className="w-11" />
                            )}
                          </td>
                          <td className="">{tokenId}</td>
                          <td className="p-3">{new Date().toLocaleDateString().replace(/\//g, '.')}</td>
                          <td className="p-3">
                            {!revealedTokenIds.includes(tokenId) ? (
                              <div
                                className="text-[10px] tracking-[1px] bg-cyan-600 hover:bg-cyan-700 border rounded-tr-lg rounded-bl-lg py-2 cursor-pointer"
                                style={{
                                  textShadow: '0px 0px 5px #EF3B43',
                                }}
                                onClick={() => handleReveal(tokenId)}
                              >
                                reveal
                              </div>
                            ) : (
                              <>REVEALED!</>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  <div className="text-lg leading-5 text-cyan-250">Pay With:</div>
                  <div className="flex flex-wrap items-center gap-4 py-2">
                    <div
                      className={`bg-[black] bg-opacity-10 border ${
                        payMode === 'avax' ? 'border-amber-500' : 'border-gray-700 hover:border-amber-500'
                      } cursor-pointer rounded-md p-3 flex items-center flex-col sm:flex-row`}
                      onClick={() => handleSelectPaymentMode('avax')}
                    >
                      <div>
                        <div className="flex items-center gap-2 py-1">
                          <img src={Images.logoAvaxWhite} alt="icon_avax" />
                          <div className="text-2xl leading-5 text-white uppercase">avax</div>
                        </div>
                        <div className="text-sm leading-5 text-white ">Bal: {avaxBalance && (+avaxBalance).toLocaleString()}</div>
                      </div>
                      <div className="w-full mx-2 border-b border-gray-600 sm:border-r sm:border-b-0 sm:h-11 sm:w-px"></div>
                      <div className={` leading-5 ${payMode === 'avax' ? 'text-amber-500' : 'text-white'}`}>
                        <div className="text-lg">
                          <span className="font-bold">{numBoxToBuy} Mints</span> x {+ethers.utils.formatEther(mintPrice ? mintPrice : 0)}{' '}
                          AVAX
                        </div>
                        <div className="text-sm">
                          You will pay: {numBoxToBuy * ethers.utils.formatEther(mintPrice ? mintPrice : 0)} AVAX
                        </div>
                      </div>
                    </div>
                    <div
                      className={`bg-[black] bg-opacity-10 border ${
                        payMode === 'mcv' ? 'border-amber-500' : 'border-gray-700 hover:border-amber-500'
                      } cursor-pointer rounded-md p-3 flex items-center flex-col sm:flex-row`}
                      onClick={() => handleSelectPaymentMode('mcv')}
                    >
                      <div>
                        <div className="flex items-center gap-2 py-1">
                          <div className="bg-black w-7 h-7 flex items-center justify-center rounded-full shadow-[0_0_7px_rgba(0,163,255,0.8)]">
                            <img src={Images.logoMCV} alt="icon_mcv" className="w-5 h-5" />
                          </div>
                          <div className="text-2xl leading-5 text-white uppercase">mcv</div>
                        </div>
                        <div className="text-sm leading-5 text-white ">Bal: {mcvBalance && (+mcvBalance).toLocaleString()}</div>
                      </div>
                      <div className="w-full mx-2 border-b border-gray-600 sm:border-r sm:border-b-0 sm:h-11 sm:w-px"></div>
                      <div className={` leading-5 ${payMode === 'mcv' ? 'text-amber-500' : 'text-white'}`}>
                        <div className="text-lg">
                          <span className="font-bold">{numBoxToBuy} Mints</span> x{' '}
                          {mintWithMcvPrice ? (+ethers.utils.formatEther(mintWithMcvPrice)).toLocaleString() : 0} MCV
                        </div>
                        <div className="text-sm">
                          You will pay:{' '}
                          {mintWithMcvPrice ? (numBoxToBuy * +ethers.utils.formatEther(mintWithMcvPrice)).toLocaleString() : 0} MCV
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-2 border-b border-dashed border-cyan-150"></div>
                  <div className="text-lg leading-5 text-cyan-250">Checkout:</div>
                  <div className="flex flex-wrap gap-10 py-3">
                    <div className="flex gap-8">
                      <div>
                        <div className=" text-[10px] leading-3 tracking-[1px] text-cyan text-shadow-blue">PAYING WITH</div>
                        <div className="flex items-center gap-2 mt-2">
                          {payMode === 'avax' ? (
                            <img src={Images.logoAvaxWhite} alt="icon_avax" className="w-5" />
                          ) : (
                            <div className="bg-black w-7 h-7 flex items-center justify-center rounded-full shadow-[0_0_7px_rgba(0,163,255,0.8)]">
                              <img src={Images.logoMCV} alt="icon_mcv" className="w-5 h-5" />
                            </div>
                          )}
                          <div className="text-lg font-bold leading-5 text-white uppercase ">{payMode === 'avax' ? 'avax' : 'mcv'}</div>
                        </div>
                      </div>
                      <div>
                        <div className=" text-[10px] leading-3 tracking-[1px] text-cyan text-shadow-blue">MINTS SELECTED</div>
                        <div className="mt-2 text-3xl leading-4 tracking-[1px] text-white text-shadow-blue uppercase ">{numBoxToBuy}</div>
                      </div>
                      <div>
                        <div className=" text-[10px] leading-3 tracking-[1px] text-cyan text-shadow-blue">TOTAL</div>
                        <div className="mt-2 text-3xl leading-4 tracking-[1px] text-white uppercase ">
                          <span className="text-shadow-blue">
                            {(
                              numBoxToBuy *
                              (payMode === 'avax'
                                ? ethers.utils.formatEther(mintPrice ? mintPrice : 0)
                                : ethers.utils.formatEther(mintWithMcvPrice ? mintWithMcvPrice : 0))
                            ).toLocaleString()}
                          </span>{' '}
                          <span className="text-lg leading-5 ">{payMode === 'avax' ? 'avax' : 'mcv'}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        className="border-2 border-[#00C6FB] rounded-tr-lg rounded-bl-lg hover:bg-cyan-700 hover:bg-opacity-30 text-center  font-bold text-lg leading-3 tracking-[1px] text-cyan-250 uppercase px-4 3xl:px-8 py-4"
                        onClick={() => handleMint()}
                      >
                        {minting ? <PulseLoader color="#21D0FF" size={10} className="px-6" /> : <>mint my nfts</>}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </PageMainWrapper>
      {/* Token Reveal Container */}
      {revealTokenId && (
        <div className="fixed inset-0 z-[101]" style={{ background: 'rgba(0,0,0,0.9)' }}>
          <div className="flex items-center justify-center min-h-screen text-white">
            <div>
              <div className="hidden mb-1 text-yellow-400 cursor-pointer sm:block" onClick={() => handleClose()}>
                <svg width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" stroke="#fff" strokeWidth="2" d="M3,3 L21,21 M3,21 L21,3" />
                </svg>
              </div>
              <div className="mx-5 sm:mx-0 sm:w-[450px] 2md:w-[900px]">
                <img src={`${imgMuscleCarUrl}${revealTokenId}`} alt="" className="w-full" loading="lazy" />
              </div>
              <div
                className="flex items-center justify-center w-full mt-2 text-3xl text-yellow-400 cursor-pointer sm:hidden"
                onClick={() => handleClose()}
              >
                <svg width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" stroke="#fff" strokeWidth="2" d="M3,3 L21,21 M3,21 L21,3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Dealership
