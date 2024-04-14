import { useCallback, useEffect } from 'react'

import { addGeolocation, getGeolocation } from 'utils/api/geolocation'

import { useWeb3 } from './useWeb3'

export const useGeoLocation = () => {
  const { address } = useWeb3()

  const handleGeolocation = useCallback(async () => {
    if (!address) return

    const res = await getGeolocation()
    if (res === undefined) return

    const { ip_address, location } = res

    await addGeolocation(address, ip_address, location)
  }, [address])

  useEffect(() => {
    handleGeolocation()
  }, [handleGeolocation])
}
