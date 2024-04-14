import React, { useState, useCallback, useEffect } from 'react'

import { ethers } from 'ethers'
import { PulseLoader } from 'react-spinners'
import { toast } from 'react-toastify'

import tokenABI from 'contracts/abis/MCVToken.json'
import mintABI from 'contracts/abis/MintWithToken.json'
import ticketABI from 'contracts/abis/Ticket.json'
import { bagAddress, mcvAddress, bagMintAddress } from 'contracts/address'
import { useWeb3 } from 'hooks'
import { useGetWeb3ReducerValues } from 'state/web3/hooks'
import * as Images from 'utils/helper/image.helper'

const BagShop = () => {
  const { address } = useWeb3()
  const { avaxBalance, mcvBalance } = useGetWeb3ReducerValues('walletBalance')

  const [ticketContract, setTicketContract] = useState(null)
  const [mcvContract, setMcvContract] = useState(null)
  const [ticketMintContract, setTicketMintContract] = useState(null)

  const [minting, setMinting] = useState(false)
  const [hover, setHover] = useState(0)
  const [numBoxToBuy, setNumBoxToBuy] = useState(0)
  const [totalMinted, setTotalMinted] = useState(0)
  const [maxMinted, setMaxMinted] = useState(0)
  const [payMode, setPayMode] = useState('mcv')
  const [mintPrice, setMintPrice] = useState(0)
  const [numOfOwnedBags, setNumOfOwnedBags] = useState(0)

  const init = async (ticketMintContract, ticketContract, address) => {
    try {
      const mintPrice = await ticketMintContract.mintPrice()
      const ended = await ticketMintContract.ended()
      const totalMinted = await ticketMintContract.totalMinted()
      setMintPrice(+ethers.utils.formatEther(mintPrice))
      setTotalMinted(totalMinted.toString())
      console.log('bag: ', mintPrice.toString(), ended, totalMinted.toString())
      const tokens = await ticketContract.balanceOf(address)
      setNumOfOwnedBags(+tokens.toString())
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickTicket = useCallback(
    (index) => {
      if (minting) return
      setNumBoxToBuy(index)
    },
    [minting]
  )

  const handleMint = useCallback(async () => {
    try {
      if (minting) return
      if (numBoxToBuy < 1) {
        toast.warning('You must select at least one NFT.')
        return
      }
      if (+mcvBalance < mintPrice * numBoxToBuy) {
        return toast.error('NOT ENOUGH BALANCE')
      }
      setMinting(true)

      const mcvAllowance = await mcvContract.allowance(address, bagMintAddress)
      if (parseInt(ethers.utils.formatEther(mcvAllowance)) < mintPrice * 10) {
        const res = await mcvContract.approve(bagMintAddress, ethers.utils.parseEther(mintPrice * 10 + ''))
        await res.wait()
      }

      const tx = await ticketMintContract.mint(numBoxToBuy)
      const result = await tx.wait()
      console.log(result)

      setNumBoxToBuy(0)
      setHover(0)
      toast.success('Minted successfully!')
      init(ticketMintContract, ticketContract, address)
      setTotalMinted((ps) => +ps + +numBoxToBuy)
      setMinting(false)
    } catch (error) {
      setMinting(false)
      console.log(error)
    }
  }, [minting, numBoxToBuy, mcvBalance, mintPrice, mcvContract, address, ticketMintContract, ticketContract])

  useEffect(() => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const ticketContract = new ethers.Contract(bagAddress, ticketABI, signer)
    setTicketContract(ticketContract)
    const mcvContract = new ethers.Contract(mcvAddress, tokenABI, signer)
    setMcvContract(mcvContract)
    const ticketMintContract = new ethers.Contract(bagMintAddress, mintABI, signer)
    setTicketMintContract(ticketMintContract)

    init(ticketMintContract, ticketContract, address)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative pb-4 mb-10 md:pb-40 md:mb-24 2xl:pb-20 2xl:mb-12 callout-bg">
      <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-black border border-[#009EFF] shadow-[0_0_9px_rgba(77,201,255,0.9)] hidden md:flex items-center justify-center">
        <img src={Images.imgBag} className="" alt="" />
      </div>
      <div className="hidden ml-1 sm:ml-6 md:ml-20 md:flex md:items-center md:justify-between md:mr-[14vw] h-16">
        <div className="md:flex md:items-center">
          <div
            className="font-bold text-xl text-[#33D4FF] leading-4 tracking-[2.4px] uppercase"
            style={{ textShadow: '0px 0px 5px rgba(50, 171, 252, 0.98)' }}
          >
            MINT YOUR CASH BAG TO START BANK HEIST
          </div>
          <div className="w-px border border-r border-dashed border-[#FFD900] h-6 rotate-[30deg] mx-1 sm:mx-4"></div>
          <div className="text-white text-[10px] font-medium tracking-[2px] text-shadow-blue">
            Get access to the bank to scope the vault...
          </div>
        </div>
      </div>
      <div className="relative grid gap-2 mt-2 xl:pr-4 xl:grid-cols-2 2xl:grid-cols-7 3xl:grid-cols-3">
        <div className="absolute right-0 -top-7">
          <div className="text-[10px] tracking-[1px] uppercase xl:pr-4 flex items-center gap-2">
            owned in wallet:{' '}
            <span className="text-black bg-[#23D0FF] rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {numOfOwnedBags}
            </span>
          </div>
        </div>
        <div className="2xl:col-span-3 3xl:col-span-1 bg-[#000F44] bg-opacity-60 border-[0.5px] border-[#80C9FF] pl-6 pr-4 py-6 md:ml-4 2xl:ml-0 rounded-t-2xl 2xl:rounded-tr-md rounded-b-2xl">
          <div className="flex items-center gap-4 mx-auto md:mx-0">
            <img src={Images.imgBankHeist} alt="logo" className="w-80" />
            {/* <img src={Images.imgTitleCarShow} alt="title" /> */}
          </div>
          <div className="py-5 text-sm leading-5 ">
            Brace yourself! The MCVerse Bank at 18 Obsidian Ave is the hottest spot in town, and guess what? They're about to receive a
            whopping 165,000 carats of glinting, glittering diamonds - and not just any pebbles, but rocks of every shape and size! Want in
            on the action? Then here's a tip: hang tight till the fat lady sings, or in this case, until the last armored truck drops off
            its shiny cargo. But hey, genius, before you go all guns blazing, snag yourself a police scanner. You wouldn't want our boys in
            blue crashing your party, would ya?
          </div>
          <div className="border-b border-dashed border-[#2EA0DC] my-2"></div>
          <div className="grid grid-cols-none gap-2 py-2 sm:grid-cols-2">
            <div>
              <div className=" text-lg leading-5 text-[#21D0FF]">Cost to mint:</div>
              <div className="">
                <div className="flex items-center gap-1 py-1">
                  <div className="bg-black w-7 h-7 flex items-center justify-center rounded-full shadow-[0_0_7px_rgba(0,163,255,0.8)]">
                    <img src={Images.logoMCV} alt="icon_mcv" className="w-5 h-5" />
                  </div>
                  <div className="text-2xl leading-3 tracking-[1px] text-white text-shadow-blue mt-2 uppercase">
                    {mintPrice.toLocaleString()} mcv
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="pb-2">
                <div className=" text-[10px] leading-3 text-[#EBBB00] tracking-[1px] text-shadow-blue uppercase">bags minted</div>
                <div className="text-2xl leading-3 text-whtie tracking-[1px] text-shadow-blue mt-2">{totalMinted}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:col-span-4 3xl:col-span-2 bg-[#000F44] bg-opacity-60 border-[0.5px] border-[#80C9FF] rounded-xl md:ml-4 3xl:ml-0 p-6">
          <div className=" text-lg leading-5 text-[#21D0FF]">How many police radios would you like to mint?</div>
          <div className="py-1 text-sm leading-5 text-white ">You may mint a max of 10 per transaction.</div>
          <div className="border-b border-dashed border-[#2EA0DC] my-2"></div>
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
                      <div
                        className={`bg-black border border-[#FFCE0D] rounded-md flex items-center justify-center w-full p-2 xl:p-4 aspect-square`}
                      >
                        <img src={Images.imgBag} alt="ticket" loading="lazy" className="w-full" />
                      </div>
                    ) : (
                      <div
                        className={`bg-black border border-[#2F2F2F] rounded-md flex items-center justify-center w-full p-2 xl:p-4 aspect-square`}
                      >
                        <img
                          src={Images.imgBag}
                          alt="img_ticket"
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
          <div className=" text-sm leading-5 text-[#FFCE0D] py-0.5">{numBoxToBuy} Cash Bags Selected</div>
          <div className="border-b border-dashed border-[#2EA0DC] my-2"></div>
          <>
            <div className=" text-lg leading-5 text-[#21D0FF]">Pay With:</div>
            <div className="flex flex-wrap items-center gap-4 py-2">
              <div
                className={`bg-[black] bg-opacity-10 border ${
                  payMode === 'mcv' ? 'border-[#FFCE0D]' : 'border-[#547076] hover:border-[#FFCE0D]'
                } cursor-pointer rounded-md p-3 flex items-center flex-col sm:flex-row`}
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
                <div className="border-b w-full sm:border-r sm:border-b-0 sm:h-11 sm:w-px border-[#5B7D82] mx-2"></div>
                <div className={` leading-5 ${payMode === 'mcv' ? 'text-[#FFCE0D]' : 'text-white'}`}>
                  <div className="text-lg">
                    <span className="font-bold">{numBoxToBuy} Mints</span> x {mintPrice.toLocaleString()} MCV
                  </div>
                  <div className="text-sm">You will pay: {(numBoxToBuy * mintPrice).toLocaleString()} MCV</div>
                </div>
              </div>
            </div>
            <div className="border-b border-dashed border-[#2EA0DC] my-2"></div>
            <div className=" text-lg leading-5 text-[#21D0FF]">Checkout:</div>
            <div className="flex flex-wrap gap-10 py-3">
              <div className="flex gap-8">
                <div>
                  <div className=" text-[10px] leading-3 tracking-[1px] text-[#00CAFF] text-shadow-blue">PAYING WITH</div>
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
                  <div className=" text-[10px] leading-3 tracking-[1px] text-[#00CAFF] text-shadow-blue">MINTS SELECTED</div>
                  <div className="mt-2 text-3xl leading-4 tracking-[1px] text-white text-shadow-blue uppercase ">{numBoxToBuy}</div>
                </div>
                <div>
                  <div className=" text-[10px] leading-3 tracking-[1px] text-[#00CAFF] text-shadow-blue">TOTAL</div>
                  <div className="mt-2 text-3xl leading-4 tracking-[1px] text-white uppercase ">
                    <span className="text-shadow-blue">{(numBoxToBuy * (payMode === 'avax' ? 0.1 : mintPrice)).toLocaleString()}</span>{' '}
                    <span className="text-lg leading-5 ">{payMode === 'avax' ? 'avax' : 'mcv'}</span>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="border-2 border-[#00C6FB] rounded-tr-lg rounded-bl-lg hover:bg-cyan-700 hover:bg-opacity-30 text-center  font-bold text-lg leading-3 tracking-[1px] text-[#21D0FF] uppercase px-4 3xl:px-8 py-4"
                  onClick={() => handleMint()}
                >
                  {minting ? <PulseLoader color="#21D0FF" size={10} className="px-6" /> : <>mint my bags</>}
                </button>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  )
}

export default BagShop
