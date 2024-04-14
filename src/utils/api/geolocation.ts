import axios from 'axios'

import { geolocationUrl } from 'services/api'

export const getGeolocation = async () => {
  try {
    const { data, status } = await axios.get(`http://ipwho.is`)
    if (status === 200) {
      return { ip_address: data.ip, location: `${data.city || ''}, ${data.country}` }
    } else return
  } catch (e) {
    console.log(e)
    return
  }
}

export const addGeolocation = async (wallet: string, ip_address: string, location: string) => {
  try {
    const { status } = await axios.post(`${geolocationUrl}`, {
      wallet,
      ip_address,
      location,
    })

    if (status === 200) {
      return true
    } else return false
  } catch (e) {
    console.log(e)
    return false
  }
}
