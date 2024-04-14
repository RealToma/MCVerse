import React, { useState, useEffect, useCallback, Fragment } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { CheckIcon } from 'components/Icons'
import tokenABI from 'contracts/abis/MCVToken.json'
import swapABI from 'contracts/abis/Swap.json'
import { ahillAddress, gvilleAddress, mcvAddress, swapAddress } from 'contracts/address'
import { useWeb3 } from 'hooks'
import { iconGville, iconAhill, logoMCV, iconArrowDown } from 'utils/helper/image.helper'

const tokens = [
  { id: 1, name: 'GVILLE', img: iconGville },
  { id: 2, name: 'AHILL', img: iconAhill },
]

const Swap = () => {
  // const { avaxBalance, MCVBalance } = balance;
  const { address } = useWeb3()

  const [selectedToken, setSelectedToken] = useState(tokens[0])
  const [ahillContract, setAhillContract] = useState(null)
  const [gvilleContract, setGvilleContract] = useState(null)
  const [mcvContract, setMcvContract] = useState(null)
  const [swapContract, setSwapContract] = useState(null)
  const [ahillBalance, setAhillBalance] = useState(0)
  const [gvilleBalance, setGvilleBalance] = useState(0)
  const [mcvBalance, setMcvBalance] = useState(0)
  const [mcvFromAhill, setMcvFromAhill] = useState(0)
  const [mcvFromGville, setMcvFromGville] = useState(0)

  const getTokenInfo = async (ahillContract, gvilleContract, mcvContract, swapContract) => {
    try {
      const ahillBalance = await ahillContract.balanceOf(address)
      setAhillBalance(+ethers.utils.formatEther(ahillBalance))
      // setAhillBalance(19928);
      const gvilleBalance = await gvilleContract.balanceOf(address)
      setGvilleBalance(+ethers.utils.formatEther(gvilleBalance))
      // setGvilleBalance(561);
      const mcvBalance = await mcvContract.balanceOf(address)
      setMcvBalance(+ethers.utils.formatEther(mcvBalance))

      const quoteFromAhill = await swapContract.quote(+Math.floor(ethers.utils.formatEther(ahillBalance)), 0)
      const quoteFromGville = await swapContract.quote(+Math.floor(ethers.utils.formatEther(gvilleBalance)), 1)
      setMcvFromAhill(quoteFromAhill.toString())
      setMcvFromGville(quoteFromGville.toString())
      console.log(ahillBalance, gvilleBalance)
      console.log(quoteFromAhill.toString(), quoteFromGville.toString())
      setSelectedToken(tokens[0])
    } catch (error) {
      console.log(error)
    }
  }

  const handleSwap = useCallback(async () => {
    console.log(selectedToken)
    try {
      const options = await swapContract.getOptions()
      console.log(options)
      // const quote = await swapContract.quote(gvilleAddress, 1);
      // console.log(ethers.utils.formatEther(quote));

      const { name } = selectedToken
      if (name === 'AHILL') {
        const ahillAllowance = await ahillContract.allowance(address, swapAddress)
        if (parseInt(ethers.utils.formatEther(ahillAllowance)) < 1) {
          const res = await ahillContract.approve(swapAddress, ethers.utils.parseEther('99999999999999'))
          await res.wait()
        }

        const tx = await swapContract.merge(Math.floor(ahillBalance), 0)
        await tx.wait()
        toast.success('Swap successfully')
      }
      if (name === 'GVILLE') {
        const gvilleAllowance = await gvilleContract.allowance(address, swapAddress)
        if (parseInt(ethers.utils.formatEther(gvilleAllowance)) < 1) {
          const res = await gvilleContract.approve(swapAddress, ethers.utils.parseEther('99999999999999'))
          await res.wait()
        }

        const tx = await swapContract.merge(Math.floor(gvilleBalance), 1)
        await tx.wait()
        toast.success('Swap successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }, [selectedToken, swapContract, ahillContract, address, gvilleContract, ahillBalance, gvilleBalance])

  useEffect(() => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const ahillContract = new ethers.Contract(ahillAddress, tokenABI, signer)
    setAhillContract(ahillContract)
    const gvilleContract = new ethers.Contract(gvilleAddress, tokenABI, signer)
    setGvilleContract(gvilleContract)
    const mcvContract = new ethers.Contract(mcvAddress, tokenABI, signer)
    setMcvContract(mcvContract)
    const swapContract = new ethers.Contract(swapAddress, swapABI, signer)
    setSwapContract(swapContract)

    getTokenInfo(ahillContract, gvilleContract, mcvContract, swapContract)
  }, [])

  return (
    <div
      className="mx-auto w-[360px] p-7"
      style={{
        background: 'linear-gradient(180deg, rgba(0,48,74,0.8) 0%, rgba(0,0,0,0) 100%)',
        backgroundBlendMode: 'multiply',
      }}
    >
      <div className="text-amber-500  text-xs leading-4 tracking-[0.5px]">
        This is where you can get an estimate and swap your GVILLE or AHILL into the new MCV token.
      </div>
      <div className="my-4 border-t border-white border-dashed"></div>
      <div className="flex items-center gap-1.5 p-2">
        <img src={iconGville} alt="token_gville" className="w-5" />
        <div className="text-white  text-xs leading-3 tracking-[2px] uppercase text-shadow-blue">gville balance:</div>
        <div className="text-cyan  text-lg leading-3 tracking-[2px] font-bold text-shadow-blue">{gvilleBalance.toLocaleString()}</div>
      </div>
      <div className="flex items-center gap-1.5 p-2">
        <img src={iconAhill} alt="token_ahill" className="w-5" />
        <div className="text-white  text-xs leading-3 tracking-[2px] uppercase text-shadow-blue">ahill balance:</div>
        <div className="text-cyan  text-lg leading-3 tracking-[2px] font-bold text-shadow-blue">{ahillBalance.toLocaleString()}</div>
      </div>
      <div className="my-2 p-2 bg-[#022133] bg-opacity-60 border border-[#2D4756] rounded-xl">
        <div className="flex items-center justify-center mt-2">
          <div
            className="text-cyan-100  font-bold text-xl leading-4 tracking-[2.7px] uppercase"
            style={{ textShadow: '0px 0px 5px rgba(50, 171, 252, 0.98)' }}
          >
            swap
          </div>
          <div className="w-px border border-r border-dashed border-amber-400 h-5 rotate-[30deg] mx-4"></div>
          <div className="text-white  text-xs leading-4 tracking-[2px] uppercase text-shadow-blue">swap into mcv</div>
        </div>
        <div className="my-4 border-t border-white border-dashed"></div>
        <div className="flex justify-between px-2">
          <div>
            <div className="text-cyan  text-xs leading-3 tracking-[1px] uppercase text-shadow-blue">you have:</div>
            <div className="text-white  text-2xl leading-4 tracking-[1px] mt-2 text-shadow-blue">
              {selectedToken.name === 'GVILLE' ? gvilleBalance.toLocaleString() : ahillBalance.toLocaleString()}
            </div>
          </div>
          <div>
            <Listbox value={selectedToken} onChange={setSelectedToken}>
              <div className="relative mt-1 min-w-[110px]">
                <Listbox.Button className="relative flex items-center gap-1.5 w-full py-2 pl-3 pr-5 bg-cyan-600 bg-opacity-5 border border-cyan-10 rounded-full cursor-default focus:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-xs">
                  <span>
                    <img src={selectedToken.img} className="w-5 h-5" alt="icon_token" />
                  </span>
                  <span className="block truncate text-[10px] leading-3 tracking-[2px] text-white  text-shadow-blue">
                    {selectedToken.name}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <img src={iconArrowDown} aria-hidden="true" alt="icon_arrow_down" />
                  </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-xs text-white tracking-[2px] bg-[#183950] border border-cyan-10 rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-[10px]">
                    {tokens.map((token, tokenIdx) => (
                      <Listbox.Option
                        key={tokenIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-cyan-50 text-cyan-900' : 'text-white'}`
                        }
                        value={token}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{token.name}</span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600">
                                <CheckIcon width={20} height={20} color={'#0891B2'} />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="my-4 border-t border-amber-400 border-dashed"></div>
        <div className="flex justify-between px-2">
          <div>
            <div className="text-cyan  text-xs leading-3 tracking-[1px] uppercase text-shadow-blue">you will receive:</div>
            <div className="text-white  text-2xl leading-4 tracking-[1px] mt-2 text-shadow-blue">
              {selectedToken.name === 'GVILLE' && mcvFromGville.toLocaleString()}
              {selectedToken.name === 'AHILL' && mcvFromAhill.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-white  text-xs leading-3 tracking-[1px] uppercase text-shadow-blue">
              balance: {mcvBalance.toLocaleString()}
            </div>
            <div className="float-right">
              <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-8 flex items-center justify-center bg-black border-[0.5px] border-[#01C7FC] rounded-full">
                  <img src={logoMCV} alt="token_mcv" className="w-6" />
                </div>
                <div className="text-[#B3DAE0]  text-xs leading-3 tracking-[2px] uppercase text-shadow-blue">mcv</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <button
            className="w-full py-2 bg-cyan hover:bg-cyan-500 rounded-lg text-center  text-green-900 font-bold text-xs tracking-[1px] uppercase"
            onClick={() => handleSwap()}
          >
            swap
          </button>
        </div>
        {/* <div className="flex justify-between gap-1 mt-2">
          <div className=" text-[10px] leading-3 text-amber-500">
            *GVILLE Conversion Ratio is 15:1 MCV
          </div>
          <div className=" text-[10px] leading-3 text-amber-500">
            *AHILL Conversion Ratio is 1:1.5 MCV
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Swap
