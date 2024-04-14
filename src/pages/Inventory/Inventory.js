import React, { useState, useEffect } from 'react'

import { ethers } from 'ethers'

import nftABI from 'contracts/abis/Ticket.json'
import { useWeb3 } from 'hooks'

const wrenchAddress = '0xdf2c4B37607f2cb8A4DBDD2aE1E520AaF23E6210'
const duffleBagAddress = '0x73a184Af4123d97AD84815dAC4439E787B06f5c3'
const skiMaskAddress = '0x724Ca5a12a453E02a3Ce9A8Fce9ec79FC8635747'
const crowbarAddress = '0xaD71fcf287ED267B3DF51F6FE7458c094A44a433'
const dynamiteAddress = '0x1e3709878088b9217c6DdDcccA660B715DB5f9A5'

const Inventory = () => {
  const { address } = useWeb3()

  const [wrenchNum, setWrenchNum] = useState(0)
  const [duffleBagNum, setDuffleBagNum] = useState(0)
  const [skiMaskNum, setSkiMaskNum] = useState(0)
  const [crowbarNum, setCrowbarNum] = useState(0)
  const [dynamiteNum, setDynamiteNum] = useState(0)

  const init = async (wrenchContract, duffleBagContract, skiMaskContract, crowbarContract, dynamiteContract) => {
    try {
      const wrenchBalance = await wrenchContract.balanceOf(address)
      setWrenchNum(+wrenchBalance.toString())
      const duffleBagBalance = await duffleBagContract.balanceOf(address)
      setDuffleBagNum(+duffleBagBalance.toString())
      const skiMaskBalance = await skiMaskContract.balanceOf(address)
      setSkiMaskNum(+skiMaskBalance.toString())
      const corwBarBalance = await crowbarContract.balanceOf(address)
      setCrowbarNum(+corwBarBalance.toString())
      const dynamiteBalance = await dynamiteContract.balanceOf(address)
      setDynamiteNum(+dynamiteBalance.toString())
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    const wrenchContract = new ethers.Contract(wrenchAddress, nftABI, signer)
    const duffleBagContract = new ethers.Contract(duffleBagAddress, nftABI, signer)
    const skiMaskContract = new ethers.Contract(skiMaskAddress, nftABI, signer)
    const crowbarContract = new ethers.Contract(crowbarAddress, nftABI, signer)
    const dynamiteContract = new ethers.Contract(dynamiteAddress, nftABI, signer)
    init(wrenchContract, duffleBagContract, skiMaskContract, crowbarContract, dynamiteContract)
  }, [])

  return (
    <div className="px-8 pb-8 mx-4 mt-8 text-white md:mx-24 lg:mx-40 2xl:ml-64 2xl:mr-64">
      <div className="text-sm text-center">Your mission items and rewards are shown here.</div>
      <div className="grid gap-4 mt-4 md:grid-cols-3">
        <div className="md:col-span-1 bg-[rgba(217,217,217,0.1)] rounded-lg">
          <div className="flex items-center gap-4 p-2">
            <div className="text-xs" style={{ textShadow: '0px 0px 3px #FFCC0D' }}>
              Show:
            </div>
            <div className="bg-white rounded-3xl text-[#000F44] text-xs font-semibold py-1.5 px-3">All Items</div>
            <div className="px-3 py-1.5 text-xs border border-white rounded-3xl">Owned Only</div>
          </div>
        </div>
        <div className="md:col-span-2 bg-[rgba(217,217,217,0.1)] rounded-lg">
          <div className="flex items-center gap-4 p-2">
            <div className="text-xs">Filter By Mission:</div>
            <div className="bg-[rgba(255,174,0,0.30)] rounded-3xl py-1.5 px-3 flex items-center gap-2">
              <div className="text-[#FFAE00] text-xs">Bank Heist</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path
                  d="M9.50004 12.4263C11.1155 12.4263 12.4251 11.1167 12.4251 9.50126C12.4251 7.88578 11.1155 6.57617 9.50004 6.57617C7.88456 6.57617 6.57495 7.88578 6.57495 9.50126C6.57495 11.1167 7.88456 12.4263 9.50004 12.4263Z"
                  fill="#FFAE00"
                />
                <path
                  d="M18.7086 8.69181C16.4601 5.97477 13.0566 3.35938 9.50004 3.35938C5.94277 3.35938 2.53844 5.97659 0.291503 8.69181C-0.0971677 9.16128 -0.0971677 9.84283 0.291503 10.3123C0.85641 10.9949 2.0407 12.3127 3.62244 13.4641C7.60601 16.364 11.3853 16.3704 15.3776 13.4641C16.9594 12.3127 18.1437 10.9949 18.7086 10.3123C19.0961 9.84374 19.0981 9.16282 18.7086 8.69181ZM9.50004 5.40693C11.7582 5.40693 13.5952 7.24389 13.5952 9.50205C13.5952 11.7602 11.7582 13.5972 9.50004 13.5972C7.24187 13.5972 5.40492 11.7602 5.40492 9.50205C5.40492 7.24389 7.24187 5.40693 9.50004 5.40693Z"
                  fill="#FFAE00"
                />
              </svg>
            </div>
            <div className="bg-[rgba(255,255,255,0.30)] rounded-3xl py-1.5 px-3 flex items-center gap-2">
              <div className="text-xs text-opacity-70">Casino Run</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <g opacity="0.7" clipPath="url(#clip0_8631_15000)">
                  <path
                    d="M16.187 6.29436C15.9827 6.11864 15.7774 5.9508 15.5714 5.79004L13.1704 8.19105C13.3167 8.60026 13.3967 9.04078 13.3967 9.49964C13.3967 11.6482 11.6487 13.3961 9.50019 13.3961C9.04134 13.3961 8.60081 13.3162 8.19161 13.1698L6.38965 14.9718C7.44192 15.4034 8.48562 15.6227 9.50019 15.6227C10.7121 15.6227 11.9654 15.3111 13.2254 14.6966C14.2148 14.214 15.2113 13.5439 16.187 12.7049C17.8367 11.2864 18.853 9.88372 18.8954 9.82468C19.0351 9.63053 19.0351 9.36879 18.8954 9.1746C18.853 9.11556 17.8367 7.7129 16.187 6.29436Z"
                    fill="white"
                  />
                  <path
                    d="M9.50022 12.2829C11.0349 12.2829 12.2834 11.0344 12.2834 9.49973C12.2834 9.36621 12.2734 9.23499 12.2551 9.10645L9.10693 12.2546C9.23552 12.2729 9.3667 12.2829 9.50022 12.2829Z"
                    fill="white"
                  />
                  <path
                    d="M18.837 0.163012C18.6197 -0.0543374 18.2672 -0.0543374 18.0498 0.163012L13.6765 4.53628C13.526 4.45434 13.3755 4.3763 13.2252 4.30301C11.9653 3.68848 10.7119 3.37691 9.50003 3.37691C8.28815 3.37691 7.03478 3.68848 5.77484 4.30297C4.78543 4.78558 3.78897 5.4557 2.81318 6.29467C1.16352 7.71321 0.147241 9.11587 0.104788 9.17491C-0.0349292 9.36907 -0.0349292 9.6308 0.104788 9.825C0.147241 9.88404 1.16348 11.2867 2.81318 12.7052C3.31872 13.1399 3.82983 13.5288 4.3426 13.8701L0.163086 18.0497C-0.0543003 18.2671 -0.0543003 18.6195 0.163086 18.8369C0.27178 18.9456 0.414206 19 0.556668 19C0.699131 19 0.841594 18.9456 0.950251 18.8369L18.837 0.950176C19.0544 0.732827 19.0544 0.380362 18.837 0.163012ZM5.60354 9.49995C5.60354 7.35143 7.35151 5.60347 9.50003 5.60347C10.374 5.60347 11.1816 5.8927 11.8324 6.38047L11.0338 7.17906C10.5937 6.88723 10.0665 6.71675 9.50003 6.71675C7.96537 6.71675 6.71682 7.9653 6.71682 9.49995C6.71682 10.0664 6.8873 10.5936 7.17913 11.0337L6.38054 11.8323C5.89277 11.1816 5.60354 10.3739 5.60354 9.49995Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_8631_15000">
                    <rect width="19" height="19" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="bg-[rgba(255,255,255,0.30)] rounded-3xl py-1.5 px-3 flex items-center gap-2">
              <div className="text-xs text-opacity-70">Pizza Shop</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <g opacity="0.7" clipPath="url(#clip0_8631_15000)">
                  <path
                    d="M16.187 6.29436C15.9827 6.11864 15.7774 5.9508 15.5714 5.79004L13.1704 8.19105C13.3167 8.60026 13.3967 9.04078 13.3967 9.49964C13.3967 11.6482 11.6487 13.3961 9.50019 13.3961C9.04134 13.3961 8.60081 13.3162 8.19161 13.1698L6.38965 14.9718C7.44192 15.4034 8.48562 15.6227 9.50019 15.6227C10.7121 15.6227 11.9654 15.3111 13.2254 14.6966C14.2148 14.214 15.2113 13.5439 16.187 12.7049C17.8367 11.2864 18.853 9.88372 18.8954 9.82468C19.0351 9.63053 19.0351 9.36879 18.8954 9.1746C18.853 9.11556 17.8367 7.7129 16.187 6.29436Z"
                    fill="white"
                  />
                  <path
                    d="M9.50022 12.2829C11.0349 12.2829 12.2834 11.0344 12.2834 9.49973C12.2834 9.36621 12.2734 9.23499 12.2551 9.10645L9.10693 12.2546C9.23552 12.2729 9.3667 12.2829 9.50022 12.2829Z"
                    fill="white"
                  />
                  <path
                    d="M18.837 0.163012C18.6197 -0.0543374 18.2672 -0.0543374 18.0498 0.163012L13.6765 4.53628C13.526 4.45434 13.3755 4.3763 13.2252 4.30301C11.9653 3.68848 10.7119 3.37691 9.50003 3.37691C8.28815 3.37691 7.03478 3.68848 5.77484 4.30297C4.78543 4.78558 3.78897 5.4557 2.81318 6.29467C1.16352 7.71321 0.147241 9.11587 0.104788 9.17491C-0.0349292 9.36907 -0.0349292 9.6308 0.104788 9.825C0.147241 9.88404 1.16348 11.2867 2.81318 12.7052C3.31872 13.1399 3.82983 13.5288 4.3426 13.8701L0.163086 18.0497C-0.0543003 18.2671 -0.0543003 18.6195 0.163086 18.8369C0.27178 18.9456 0.414206 19 0.556668 19C0.699131 19 0.841594 18.9456 0.950251 18.8369L18.837 0.950176C19.0544 0.732827 19.0544 0.380362 18.837 0.163012ZM5.60354 9.49995C5.60354 7.35143 7.35151 5.60347 9.50003 5.60347C10.374 5.60347 11.1816 5.8927 11.8324 6.38047L11.0338 7.17906C10.5937 6.88723 10.0665 6.71675 9.50003 6.71675C7.96537 6.71675 6.71682 7.9653 6.71682 9.49995C6.71682 10.0664 6.8873 10.5936 7.17913 11.0337L6.38054 11.8323C5.89277 11.1816 5.60354 10.3739 5.60354 9.49995Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_8631_15000">
                    <rect width="19" height="19" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className="text-center">
          <img
            src="https://storage.fleek-internal.com/c607c1dc-cdb6-453f-ab3e-9e0b1c8a1cd9-bucket/Items/wrench.png"
            alt=""
            className={wrenchNum > 0 ? '' : 'opacity-50'}
          />
          <div className="mt-3 font-bold">WRENCH</div>
          <div className="text-[10px] mt-0.5">BANK HEIST</div>
          <div className="border-t border-dashed border-[#23D0FF] w-8 mx-auto my-1"></div>
          <div className="text-[10px] text-[#55626A] font-medium mt-1">
            OWNED: <span className={wrenchNum > 0 ? 'text-[#FFAE00]' : 'text-white'}>{wrenchNum}</span>
          </div>
        </div>
        <div className="text-center">
          <img
            src="https://storage.fleek-internal.com/c607c1dc-cdb6-453f-ab3e-9e0b1c8a1cd9-bucket/Items/dufflebag1.png"
            alt=""
            className={duffleBagNum > 0 ? '' : 'opacity-50'}
          />
          <div className="mt-3 font-bold">DUFFLE BAG</div>
          <div className="text-[10px] mt-0.5">BANK HEIST</div>
          <div className="border-t border-dashed border-[#23D0FF] w-8 mx-auto my-1"></div>
          <div className="text-[10px] text-[#55626A] font-medium mt-1">
            OWNED: <span className={duffleBagNum > 0 ? 'text-[#FFAE00]' : 'text-white'}>{duffleBagNum}</span>
          </div>
        </div>
        <div className="text-center">
          <img
            src="https://storage.fleek-internal.com/c607c1dc-cdb6-453f-ab3e-9e0b1c8a1cd9-bucket/Items/skimask.png"
            alt=""
            className={skiMaskNum > 0 ? '' : 'opacity-50'}
          />
          <div className="mt-3 font-bold">SKI MASK</div>
          <div className="text-[10px] mt-0.5">BANK HEIST</div>
          <div className="border-t border-dashed border-[#23D0FF] w-8 mx-auto my-1"></div>
          <div className="text-[10px] text-[#55626A] font-medium mt-1">
            OWNED: <span className={skiMaskNum > 0 ? 'text-[#FFAE00]' : 'text-white'}>{skiMaskNum}</span>
          </div>
        </div>
        <div className="text-center">
          <img
            src="https://storage.fleek-internal.com/c607c1dc-cdb6-453f-ab3e-9e0b1c8a1cd9-bucket/Items/crowbar1.png"
            alt=""
            className={crowbarNum > 0 ? '' : 'opacity-50'}
          />
          <div className="mt-3 font-bold">CROWBAR</div>
          <div className="text-[10px] mt-0.5">BANK HEIST</div>
          <div className="border-t border-dashed border-[#23D0FF] w-8 mx-auto my-1"></div>
          <div className="text-[10px] text-[#55626A] font-medium mt-1">
            OWNED: <span className={crowbarNum > 0 ? 'text-[#FFAE00]' : 'text-white'}>{crowbarNum}</span>
          </div>
        </div>
        <div className="text-center">
          <img
            src="https://storage.fleek-internal.com/c607c1dc-cdb6-453f-ab3e-9e0b1c8a1cd9-bucket/Items/dynamite.png"
            alt=""
            className={dynamiteNum > 0 ? '' : 'opacity-50'}
          />
          <div className="mt-3 font-bold">DYNAMITE</div>
          <div className="text-[10px] mt-0.5">BANK HEIST</div>
          <div className="border-t border-dashed border-[#23D0FF] w-8 mx-auto my-1"></div>
          <div className="text-[10px] text-[#55626A] font-medium mt-1">
            OWNED: <span className={dynamiteNum > 0 ? 'text-[#FFAE00]' : 'text-white'}>{dynamiteNum}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory
