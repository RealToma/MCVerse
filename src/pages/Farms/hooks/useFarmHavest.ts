import { useCallback, useState } from 'react'

import { notifyToast } from 'config/toast'
import { farmManagerContract } from 'config/web3'
import { useGetContract } from 'hooks'
import { executeSingleWriteContract } from 'utils/helper'

export const useFarmHavest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const rewardContract = useGetContract(farmManagerContract, true, false)

  const handleHavest = useCallback(
    async (farmIndex: number) => {
      if (!rewardContract) return

      try {
        setIsLoading(true)
        const { status } = await executeSingleWriteContract(rewardContract, 'claim', [[farmIndex]])

        if (status) {
          notifyToast({ id: 'claim', type: 'success', content: 'Successfully claimed!' })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    },
    [rewardContract]
  )

  return { isLoading, handleHavest }
}
