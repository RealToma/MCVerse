import { useCallback, useState } from 'react'

import { notifyToast } from 'config/toast'
import { farmManagerContract } from 'config/web3'
import { useGetContract } from 'hooks'
import { executeSingleWriteContract } from 'utils/helper'

import { useFetFarmData } from './useFarmData'

export const useFarmHarvest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { handleFetchFarmData } = useFetFarmData()
  const rewardContract = useGetContract(farmManagerContract, true, false)

  const handleHarvest = useCallback(
    async (farmIndex: number) => {
      if (!rewardContract) return
      try {
        setIsLoading(true)

        const { status } = await executeSingleWriteContract(rewardContract, 'claim', [[farmIndex]])

        if (status) {
          notifyToast({ id: 'claim', type: 'success', content: 'Successfully claimed!' })
          handleFetchFarmData()
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    },
    [handleFetchFarmData, rewardContract]
  )

  return { isLoading, handleHarvest }
}
