import axios from 'axios'

import { IPlateRequest } from 'pages/TagForge/types'
import { tagForgeUrl } from 'services/api'

export const createLicensePlate = async (licensePlate: IPlateRequest) => {
  try {
    const { status } = await axios.post(`${tagForgeUrl}`, {
      ...licensePlate,
    })

    if (status === 200) {
      return true
    } else return false
  } catch (e) {
    console.log(e)
    return false
  }
}
