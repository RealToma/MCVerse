import { useEffect } from 'react'

import { BigNumber, ethers, Contract } from 'ethers'
import { toast } from 'react-toastify'
import { useAccount, useNetwork, useProvider, useSigner } from 'wagmi'

import { contractRegister, contractMint } from 'config/web3'
import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'

import { useCreatePlate, useForgeStep, useGetRule } from '../hooks'
import { initialStepList } from '../utils'

const StepButtonContainer = ({ handleScreenShot }: { handleScreenShot: () => Promise<void> }) => {
  const { address, isConnected } = useAccount()

  const { chain } = useNetwork()
  const { data: signer } = useSigner()

  let chainId = 0
  if (chain) {
    chainId = chain.id
  }
  const provider = useProvider({ chainId })

  const currentStepId = useGetLicensePlateReducerValues('currentStepId')
  const licensePlate = useGetLicensePlateReducerValues('licensePlate')
  const imgBlob = useGetLicensePlateReducerValues('imgBlob')
  const mintRule = useGetLicensePlateReducerValues('mintRule')

  const { handleForgeStep } = useForgeStep()
  const { handleCreatePlate } = useCreatePlate()
  const { handleGetRule } = useGetRule()

  const handleRegister = async () => {
    const maxChar = ethers.utils.formatUnits(mintRule.maxCharacters, 0)
    const minChar = ethers.utils.formatUnits(mintRule.minCharacters, 0)

    const pattern = new RegExp(`^[${mintRule.allowedCharacters}]*$`)
    if (licensePlate.tagText.length > parseInt(maxChar)) {
      return toast.error(`Tag Text length should be less than ${maxChar} characters`)
    }
    if (licensePlate.tagText.length < parseInt(minChar)) {
      return toast.error(`Tag Text length should be bigger than ${minChar} characters`)
    }
    if (!pattern.test(licensePlate.tagText)) {
      return toast.error(`Tag Text should include only ${mintRule.allowedCharacters} characters`)
    }

    if (signer) {
      const registerContract = new Contract(contractRegister.addressMap[chainId], contractRegister.abi, signer)
      const flg = await registerContract.plateExists(licensePlate.tagText, licensePlate.backgroundCountry)
      if (!flg) currentStepId < 4 ? handleForgeStep(currentStepId + 1) : handleMintPlate()
      else return toast.error(`This plate already exists!`)
    }
  }

  const handleMintPlate = async () => {
    if (signer) {
      const mintContract = new Contract(contractMint.addressMap[chainId], contractMint.abi, signer)

      const mintPrice = await mintContract.mintPrice()

      console.log('Mint Price => ', mintPrice)

      const success = await mintContract.mint([{ plate: licensePlate.tagText, background: 'GB' }], {
        value: mintPrice,
      })

      if (success) {
        toast.success('Successfully minted your plate!')
      }
    }
  }

  useEffect(() => {
    handleGetRule()
  }, [handleGetRule])

  return (
    <div className="w-full flex justify-center">
      <div
        className="w-fit h-[52px] px-8 rounded-bl-lg rounded-tr-lg flex items-center justify-center border-2 border-solid border-cyan-570 cursor-pointer hover:bg-cyan"
        onClick={async () => {
          if (currentStepId === 1) {
            handleForgeStep(currentStepId + 1)
          }
          if (currentStepId === 2) {
            handleRegister()
            // return alert(123)
          }
          if (currentStepId === 3) {
            // await handleScreenShot()
            // handleForgeStep(currentStepId + 1)
            handleMintPlate()
          }
          // if (currentStepId === 4) {
          //   handleMintPlate()
          // }
        }}
      >
        {`next step: `}
        <span>{initialStepList[currentStepId - 1].btnText}</span>
      </div>
    </div>
  )
}

export default StepButtonContainer
