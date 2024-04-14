import React, { useState, useEffect } from 'react'

import { ethers } from 'ethers'
import { toast } from 'react-toastify'
// import { PulseLoader } from 'react-spinners'

import imgMintFreeA from 'assets/image/mint-free-1.png'
import imgMintFreeB from 'assets/image/mint-free-2.png'
import imgMintFreeC from 'assets/image/mint-free-3.png'
import imgMintMCV from 'assets/image/mint-free-mcv.png'
import tokenABI from 'contracts/abis/MCVToken.json'
import mintClumpABI from 'contracts/abis/MintClump.json'
import mintWithTokenABI from 'contracts/abis/MintWithToken.json'
import { mintClumpAddressWith2, mintClumpAddressWith3, mintClumpAddressWith5, mintClumpAddressWithMCV, mcvAddress } from 'contracts/address'
import { useWeb3 } from 'hooks'
import { useGetWeb3ReducerValues } from 'state/web3/hooks'

import useCountdownTimer from './useCountdownTimer'

const mintsInfo = [
  {
    mints: 3,
    total: 2,
    savings: '33%',
  },
  {
    mints: 5,
    total: 3,
    savings: '40%',
  },
  {
    mints: 10,
    total: 5,
    savings: '50%',
  },
]

const svgLink = (
  <svg xmlns="http://www.w3.org/2000/svg" width="175" height="19" viewBox="0 0 175 19" fill="none" className="w-12 sm:w-24 2xl:w-auto">
    <path d="M4 15.2929C56 -2.20713 144.6 2.89293 171 15.2929" stroke="#FFAE00" strokeWidth="7" strokeLinecap="round" />
  </svg>
)

const Mint = () => {
  const { address } = useWeb3()
  const { avaxBalance, mcvBalance } = useGetWeb3ReducerValues('walletBalance')
  const [mintContracts, setMintContracts] = useState(null)
  const [mintWithTokenContract, setMintWithTokenContract] = useState(null)
  const [mcvContract, setMcvContract] = useState(null)
  const [selectedOption, setSelectedOption] = useState(0)
  const [minting, setMinting] = useState(false)
  const [mintsLeft, setMintsLeft] = useState(0)
  const [dealsLeft, setDealsLeft] = useState([0, 0, 0])
  const [mintPrice, setMintPrice] = useState(null)
  const [mintWithTokenPrice, setMintWithTokenPrice] = useState(null)

  const init = async (mintContract1, mintContract2, mintContract3, mintContractWithToken) => {
    try {
      const mintPrice = await mintContract1.mintPrice()
      const totalMinted = await mintContract1.totalMinted()
      const maxMinted = await mintContract1.maxMinted()
      const nfvsPerClump = await mintContract1.nfvsPerClump()
      const mintPrice2 = await mintContract2.mintPrice()
      const totalMinted2 = await mintContract2.totalMinted()
      const maxMinted2 = await mintContract2.maxMinted()
      const nfvsPerClump2 = await mintContract2.nfvsPerClump()
      const mintPrice3 = await mintContract3.mintPrice()
      const totalMinted3 = await mintContract3.totalMinted()
      const maxMinted3 = await mintContract3.maxMinted()
      const nfvsPerClump3 = await mintContract3.nfvsPerClump()

      const mintPriceT = await mintContractWithToken.mintPrice()
      const totalMintedT = await mintContractWithToken.totalMinted()
      const maxMintedT = await mintContractWithToken.maxMinted()
      // console.log(ethers.utils.formatEther(mintPriceT.toString()), totalMintedT.toString(), maxMintedT.toString())
      // console.log(+ethers.utils.formatEther(mintPrice.toString()), +totalMinted.toString(), +maxMinted.toString(), +nfvsPerClump.toString())
      // console.log(
      //   +ethers.utils.formatEther(mintPrice2.toString()),
      //   +totalMinted2.toString(),
      //   +maxMinted2.toString(),
      //   +nfvsPerClump2.toString()
      // )
      // console.log(
      //   +ethers.utils.formatEther(mintPrice3.toString()),
      //   +totalMinted3.toString(),
      //   +maxMinted3.toString(),
      //   +nfvsPerClump3.toString()
      // )
      setMintPrice([
        ethers.utils.formatEther(mintPrice.toString()),
        ethers.utils.formatEther(mintPrice2.toString()),
        ethers.utils.formatEther(mintPrice3.toString()),
      ])
      setMintsLeft(
        +maxMintedT.toString() -
          +totalMintedT.toString() +
          +nfvsPerClump2.toString() * (+maxMinted2.toString() - +totalMinted2.toString()) +
          +nfvsPerClump3.toString() * (+maxMinted3.toString() - +totalMinted3.toString())
      )
      setDealsLeft([
        +maxMintedT.toString() - +totalMintedT.toString(),
        +maxMinted2.toString() - +totalMinted2.toString(),
        +maxMinted3.toString() - +totalMinted3.toString(),
      ])
      setMintWithTokenPrice(ethers.utils.formatEther(mintPriceT.toString()))
    } catch (error) {
      console.warn(error)
    }
  }

  const mint = async () => {
    try {
      if (minting) return
      if ((selectedOption > 0 && +avaxBalance < mintPrice[selectedOption]) || (selectedOption === 0 && +mcvBalance < mintWithTokenPrice)) {
        return toast.error('NOT ENOUGH BALANCE')
      }

      setMinting(true)

      if (selectedOption > 0) {
        const price = ethers.utils.parseEther(mintPrice[selectedOption])
        const tx = await mintContracts[selectedOption].mint(1, {
          value: price,
        })
        const result = await tx.wait()

        setMintsLeft((ps) => ps - mintsInfo[selectedOption].total)
      } else {
        const mcvAllowance = await mcvContract.allowance(address, mintClumpAddressWithMCV)
        if (parseInt(ethers.utils.formatEther(mcvAllowance)) < 3000) {
          const res = await mcvContract.approve(mintClumpAddressWithMCV, ethers.utils.parseEther('99999999999999'))
          await res.wait()
        }

        const tx = await mintWithTokenContract.mint(1)
        const result = await tx.wait()

        setMintsLeft((ps) => ps - 1)
      }
      toast.success('SUCCESSFULLY MINTED!')

      const newDealsLeft = [...dealsLeft]
      newDealsLeft[selectedOption] -= 1
      setDealsLeft(newDealsLeft)
    } catch (error) {
      console.log(error)
    } finally {
      setMinting(false)
    }
  }

  useEffect(() => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const mintContract1 = new ethers.Contract(mintClumpAddressWith2, mintClumpABI, signer)
    const mintContract2 = new ethers.Contract(mintClumpAddressWith3, mintClumpABI, signer)
    const mintContract3 = new ethers.Contract(mintClumpAddressWith5, mintClumpABI, signer)
    const mintContractWithToken = new ethers.Contract(mintClumpAddressWithMCV, mintWithTokenABI, signer)
    const mcvContract = new ethers.Contract(mcvAddress, tokenABI, signer)
    setMcvContract(mcvContract)
    setMintContracts([mintContract1, mintContract2, mintContract3])
    setMintWithTokenContract(mintContractWithToken)
    init(mintContract1, mintContract2, mintContract3, mintContractWithToken)
  }, [])

  const endTime = new Date('2024-02-14T00:00:00Z').getTime()
  const { days, hours, minutes, seconds } = useCountdownTimer(endTime)

  return (
    <div className="md:px-2 pb-8 mx-4 mt-8 text-white md:mx-10 lg:mx-40 2xl:mx-auto 2xl:w-[1290px]">
      <div className="grid max-w-xs gap-6 mx-auto md:grid-cols-2 2xl:grid-cols-4 md:max-w-full">
        <div className="text-sm font-medium text-center md:col-span-2 md:text-left">
          The Manager has decided to let our Muscle Cars go for dirt cheap, so we need to make room for the next fleet of vehicles in 20
          days!! After the timer runs out or inventory is depleted, there will be no more to be sold{' '}
          <span className="text-[#FFAE00]">The more you buy, the more you save!</span>
        </div>
        <div className="border-x-8 md:border-r-0 border-[#FFAE00] flex items-center">
          <div className="pl-6">
            <p className="font-bold leading-5 md:text-lg">DEAL EXPIRES:</p>
          </div>
          <div className="pl-4 pr-6 pt-7 md:pr-0">
            <p className="text-3xl font-light leading-5 md:text-5xl">
              {days}:{hours}:{minutes}
            </p>
            <div className="flex justify-between mt-2">
              <p className="text-[8px] md:text-[10px] font-light leading-5">DAYS</p>
              <p className="text-[8px] md:text-[10px] font-light leading-5">HOURS</p>
              <p className="text-[8px] md:text-[10px] font-light leading-5">MINUTES</p>
            </div>
          </div>
        </div>
        <div className="border-x-8 md:border-r-0 border-[#FFAE00] flex items-center">
          <div className="py-6 pl-6 md:py-0">
            <p className="md:text-lg font-bold leading-5 md:max-w-[60px]">MINTS LEFT:</p>
          </div>
          <div className="pl-4">
            <p className="text-3xl font-thin leading-5 md:text-5xl">{mintsLeft.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="border-t-[3px] border-dotted border-[#2EA0DC] my-5"></div>
      <div className="grid grid-cols-3 gap-2 md:gap-6">
        <div
          className={`${
            selectedOption === 0
              ? 'from-[rgba(255,174,0,0.21)] border-[3px] border-dashed border-[#FFAE00]'
              : 'from-[rgba(255,255,255,0.21)]'
          } rounded-[10px] bg-gradient-to-t pt-2 pb-3 px-3 cursor-pointer`}
          onClick={() => setSelectedOption(0)}
        >
          <div className="flex flex-col items-center justify-center gap-4 md:gap-7">
            <div className="text-center">
              <p className="uppercase md:leading-9 md:text-lg">mint 1 with</p>
              <p className="text-[#FFAE00] text-3xl md:text-5xl uppercase">mcv!</p>
            </div>
            <div className="relative">
              <img src={imgMintMCV} alt="mint-free" />
              {selectedOption === 0 && <div className="absolute -translate-x-1/2 -top-4 left-1/2">{svgLink}</div>}
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className={`${selectedOption === 0 ? 'text-[#FFAE00]' : ''} text-lg font-bold text-center uppercase md:text-2xl`}>
                2,500 mcv
              </p>
              <div
                className={`${selectedOption === 0 ? 'border-[#FFAE00]' : 'border-[#23D0FF]'} border-t-[1.5px] border-dashed w-14 mx-auto`}
              ></div>
              <p
                className={`${
                  selectedOption === 0 ? 'text-[#FFAE00]' : ''
                } text-sm font-medium text-center uppercase md:leading-8 md:text-lg`}
              >
                rich on mcv! <span className="font-black">save my avax!</span>
              </p>
              <div
                className={`${selectedOption === 0 ? 'border-[#FFAE00]' : 'border-[#23D0FF]'} border-t-[1.5px] border-dashed w-14 mx-auto`}
              ></div>
              <p className="text-sm font-medium text-center uppercase md:text-lg md:leading-8">
                deals left: <span className="font-black">{dealsLeft[0].toLocaleString()}</span>
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${
            selectedOption === 1
              ? 'from-[rgba(255,174,0,0.21)] border-[3px] border-dashed border-[#FFAE00]'
              : 'from-[rgba(255,255,255,0.21)]'
          } rounded-[10px] bg-gradient-to-t pt-2 pb-3 px-3 cursor-pointer`}
          onClick={() => setSelectedOption(1)}
        >
          <div className="flex flex-col items-center justify-center gap-4 md:gap-7">
            <div className="text-center">
              <p className="uppercase md:leading-9 md:text-lg">mint 3 get</p>
              <p className="text-[#FFAE00] text-3xl md:text-5xl uppercase">2 free!</p>
            </div>
            <div className="relative">
              <img src={imgMintFreeB} alt="mint-free" />
              {selectedOption === 1 && <div className="absolute -translate-x-1/2 -top-4 left-1/2">{svgLink}</div>}
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className={`${selectedOption === 1 ? 'text-[#FFAE00]' : ''} text-lg font-bold text-center uppercase md:text-2xl`}>
                3 avax
              </p>
              <div
                className={`${selectedOption === 1 ? 'border-[#FFAE00]' : 'border-[#23D0FF]'} border-t-[1.5px] border-dashed w-14 mx-auto`}
              ></div>
              <p
                className={`${
                  selectedOption === 1 ? 'text-[#FFAE00]' : ''
                } text-sm font-medium text-center uppercase md:leading-8 md:text-lg`}
              >
                let's degen a lil' bit! <span className="font-black">save 40%!</span>
              </p>
              <div
                className={`${selectedOption === 1 ? 'border-[#FFAE00]' : 'border-[#23D0FF]'} border-t-[1.5px] border-dashed w-14 mx-auto`}
              ></div>
              <p className="text-sm font-medium text-center uppercase md:text-lg md:leading-8">
                deals left: <span className="font-black">{dealsLeft[1].toLocaleString()}</span>
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${
            selectedOption === 2
              ? 'from-[rgba(255,174,0,0.21)] border-[3px] border-dashed border-[#FFAE00]'
              : 'from-[rgba(255,255,255,0.21)]'
          } rounded-[10px] bg-gradient-to-t pt-2 pb-3 px-3 cursor-pointer`}
          onClick={() => setSelectedOption(2)}
        >
          <div className="flex flex-col items-center justify-center gap-4 md:gap-7">
            <div className="text-center">
              <p className="uppercase md:leading-9 md:text-lg">mint 5 get</p>
              <p className="text-[#FFAE00] text-3xl md:text-5xl uppercase">5 free!</p>
            </div>
            <div className="relative">
              <img src={imgMintFreeC} alt="mint-free" />
              {selectedOption === 2 && <div className="absolute -translate-x-1/2 -top-4 left-1/2">{svgLink}</div>}
              <div className="absolute top-0 -translate-x-1/2 left-1/2">
                <div className="rounded-md border border-[#13BB6B] bg-black/80 py-1 px-2.5 md:py-1.5 md:px-4 text-xs md:text-base text-[#13BB6B] font-black uppercase whitespace-nowrap">
                  best value
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className={`${selectedOption === 2 ? 'text-[#FFAE00]' : ''} text-lg font-bold text-center uppercase md:text-2xl`}>
                5 avax
              </p>
              <div
                className={`${selectedOption === 2 ? 'border-[#FFAE00]' : 'border-[#23D0FF]'} border-t-[1.5px] border-dashed w-14 mx-auto`}
              ></div>
              <p
                className={`${
                  selectedOption === 2 ? 'text-[#FFAE00]' : ''
                } text-sm font-medium text-center uppercase md:leading-8 md:text-lg`}
              >
                holy savings, batman! <span className="font-black text-[#13BB6B]">save 50%!</span>
              </p>
              <div
                className={`${selectedOption === 2 ? 'border-[#FFAE00]' : 'border-[#23D0FF]'} border-t-[1.5px] border-dashed w-14 mx-auto`}
              ></div>
              <p className="text-sm font-medium text-center uppercase md:leading-8 md:text-lg">
                deals left: <span className="font-black">{dealsLeft[2].toLocaleString()}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[3px] border-dotted border-[#2EA0DC] mt-5 flex flex-wrap-reverse 2xl:flex-nowrap">
        <div className="bg-gradient-to-b from-[rgba(217,217,217,0.2)] flex items-center justify-center shrink-0 grow">
          <div className="px-4 py-8 md:px-10 md:py-5">
            <p className="text-[#21D0FF] text-lg leading-5">Checkout:</p>
            <div className="flex flex-col items-center gap-4 md:gap-10 md:flex-row">
              <div className="flex gap-2 md:gap-6">
                <div>
                  <p className="text-[#00CAFF] text-[10px] leading-3 tracking-[1px] text-shadow-blue">PAYING WITH</p>
                  <div className="flex gap-2 mt-2">
                    {selectedOption > 0 ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                          <path
                            d="M3.28518 16.8457C2.47817 16.8457 1.67061 16.8471 0.86288 16.845C0.612186 16.8442 0.374019 16.7943 0.204022 16.5862C0.00092506 16.3385 -0.0694002 16.0578 0.0800162 15.7653C0.316036 15.3043 0.566019 14.8499 0.821007 14.3991C1.76581 12.7295 2.71419 11.0628 3.66203 9.39463C4.85735 7.28967 6.05284 5.18391 7.24887 3.07896C7.71877 2.25145 8.19081 1.42467 8.66285 0.598684C8.7126 0.512168 8.76897 0.429405 8.82765 0.349507C9.16191 -0.108578 9.76136 -0.121104 10.0897 0.339935C10.2914 0.622841 10.4614 0.929985 10.6351 1.23195C11.2369 2.27633 11.8349 3.32375 12.4322 4.37108C12.6272 4.71339 12.8046 5.06295 12.8559 5.46387C12.9241 5.99237 12.8273 6.48705 12.5693 6.9488C12.0146 7.93976 11.4559 8.92921 10.8967 9.91794C9.89843 11.6828 8.90102 13.4478 7.89914 15.2105C7.69228 15.574 7.49814 15.9478 7.17998 16.2329C6.74391 16.625 6.23823 16.8434 5.64755 16.8457C4.86021 16.8486 4.07306 16.8464 3.28519 16.8464L3.28518 16.8457Z"
                            fill="white"
                          />
                          <path
                            d="M15.1269 16.8457C14.125 16.8457 13.1231 16.8472 12.121 16.845C11.8412 16.845 11.5867 16.7783 11.4146 16.5298C11.2401 16.2792 11.1977 16.0102 11.3443 15.7404C11.6338 15.2061 11.9328 14.6777 12.237 14.1514C12.884 13.0345 13.5343 11.9196 14.188 10.8063C14.3038 10.6099 14.4285 10.4142 14.5743 10.2397C14.8601 9.89966 15.4209 9.90333 15.6891 10.2581C15.9045 10.5432 16.0892 10.8539 16.271 11.1625C17.0736 12.5287 17.8725 13.8972 18.6685 15.2677C18.7783 15.4568 18.881 15.6533 18.9587 15.8563C19.1097 16.2483 18.829 16.7402 18.4142 16.8099C18.1943 16.8464 17.9677 16.8531 17.7442 16.8545C16.8714 16.8597 15.999 16.8567 15.1269 16.8567L15.1269 16.8457Z"
                            fill="white"
                          />
                        </svg>
                        <p className="text-lg leading-5">AVAX</p>
                      </>
                    ) : (
                      <p className="text-lg leading-5">MCV</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[#00CAFF] text-[10px] leading-3 tracking-[1px] text-shadow-blue">MINTS</p>
                  <div className="mt-2">
                    <p className="text-2xl leading-4 text-shadow-blue">{selectedOption > 0 ? mintsInfo[selectedOption].mints : 1}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[#00CAFF] text-[10px] leading-3 tracking-[1px] text-shadow-blue">TOTAL</p>
                  <div className="mt-2">
                    {selectedOption > 0 ? (
                      <p className="text-2xl leading-4 text-shadow-blue">
                        {mintsInfo[selectedOption].total} <span className="text-lg leading-5">AVAX</span>
                      </p>
                    ) : (
                      <p className="text-2xl leading-4 text-shadow-blue">
                        2,500 <span className="text-lg leading-5">MCV</span>
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[#00CAFF] text-[10px] leading-3 tracking-[1px] text-shadow-blue">SAVINGS</p>
                  <div className="mt-2">
                    <p className="text-2xl leading-4 text-shadow-blue">{selectedOption > 0 ? mintsInfo[selectedOption].savings : '0%'}</p>
                  </div>
                </div>
              </div>
              {minting ? (
                <button className="border md:border-2 border-[#00C6FB] rounded-tr-lg rounded-bl-lg py-2 px-4 md:py-4 md:px-7 text-[#21D0FF] text-sm md:text-lg font-bold leading-none tracking-[1px] uppercase">
                  minting...
                </button>
              ) : (
                <button
                  className="border md:border-2 border-[#00C6FB] rounded-tr-lg rounded-bl-lg py-2 px-4 md:py-4 md:px-7 text-[#21D0FF] text-sm md:text-lg font-bold leading-none tracking-[1px] uppercase"
                  onClick={() => mint()}
                >
                  mint my nfts
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-b from-[rgba(35,208,255,0.2)] flex items-center justify-center p-8 grow">
          <div className="border-l-[6px] border-[#FFAE00] pl-5 py-1">
            <p className="text-xs md:text-sm">Disclaimer: The images above are samples and are not the exact NFTs you are minting.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mint
