import { useCallback } from 'react'

import { notifyToast } from 'config/toast'
import { contractRegister, mcvContract, plateNFTContract } from 'config/web3'
import { useGetContract, useWeb3 } from 'hooks'
import { useAppDispatch } from 'state/hooks'
import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'
import { setForgeInitialize, setIsLoading, setLicensePlate, setMintPrice, setMintRule } from 'state/tagForge/reducer'
import { createLicensePlate } from 'utils/api'
import { executeSingleReadContract, executeSingleWriteContract } from 'utils/helper'

import { ILicensePlate, IPlateRequest } from '../types'
import { PLATE_FONT_LIST } from '../utils'

export const useGetMintPrice = () => {
  const plateMintContract = useGetContract(plateNFTContract)
  const dispatch = useAppDispatch()

  const handleGetMintPrice = useCallback(async () => {
    try {
      if (!plateMintContract) return

      const mintPrice = await executeSingleReadContract(plateMintContract, 'mintPrice', [])

      if (mintPrice) {
        dispatch(setMintPrice(mintPrice))
      }
    } catch (error) {
      console.error(error)
    }
  }, [dispatch, plateMintContract])
}

export const useGetRule = () => {
  const registerContract = useGetContract(contractRegister)

  const dispatch = useAppDispatch()

  const handleGetRule = useCallback(async () => {
    try {
      if (!registerContract) return

      const mintRule = await executeSingleReadContract(registerContract, 'getRules', [])

      if (mintRule) {
        dispatch(setMintRule(mintRule))
      }
    } catch (error) {
      console.error(error)
    }
  }, [dispatch, registerContract])

  return { handleGetRule }
}

export const useSetPlateToStore = () => {
  const dispatch = useAppDispatch()

  const handleLicensePlate = useCallback(
    <T extends keyof ILicensePlate>(key: T, value: ILicensePlate[T]) => {
      dispatch(setLicensePlate({ [key]: value }))
    },
    [dispatch]
  )

  return { handleLicensePlate }
}

export const useMintPlate = () => {
  const { chainId } = useWeb3()
  const mintPrice = useGetLicensePlateReducerValues('mintPrice')
  const plateMintContract = useGetContract(plateNFTContract, true, false)
  const mcvTokenContract = useGetContract(mcvContract, true, false)

  const handlePlateMint = useCallback(async () => {
    if (!plateMintContract || !mcvTokenContract) return

    try {
      const spender: string = plateNFTContract.addressMap[chainId]
      const { status: approveStatus } = await executeSingleWriteContract(mcvTokenContract, 'approve', [spender, mintPrice])

      if (approveStatus) {
        const numberOf = 1 // Consider if we need to implement dynamic numberOf to mint plates
        const { status } = await executeSingleWriteContract(plateMintContract, 'mint', [...[numberOf]])

        if (status) {
          notifyToast({ id: 'plate-mint', type: 'success', content: 'Successfully Minted!' })
          return true
        }

        return false
      }

      return false
    } catch (error) {
      console.error(error)
      return
    }
  }, [chainId, mcvTokenContract, mintPrice, plateMintContract])

  return { handlePlateMint }
}

export const useCreatePlate = () => {
  const licensePlate = useGetLicensePlateReducerValues('licensePlate')
  const imgBlob = useGetLicensePlateReducerValues('imgBlob')
  const { handlePlateMint } = useMintPlate()

  const dispatch = useAppDispatch()

  const handleCreatePlate = async () => {
    try {
      if (imgBlob === undefined) return
      dispatch(setIsLoading(true))

      const isMintSuccess = await handlePlateMint()
      if (isMintSuccess) {
        const plate: IPlateRequest = {
          tag_text: licensePlate.tagText,
          font_style: PLATE_FONT_LIST[licensePlate.fontStyleId].font,
          text_color: licensePlate.color.textColor,
          border_color: licensePlate.color.borderColor,
          img: imgBlob,
        }

        const res = await createLicensePlate(plate)

        if (res) {
          dispatch(setForgeInitialize())
        }
      }
    } catch (error) {
      console.error(error)
      return
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  return { handleCreatePlate }
}
