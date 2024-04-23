import { useEffect, useState } from 'react'

import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'

import { useSetPlateToStore } from '../hooks'
import { PLATE_BACKGROUND_LIST } from '../utils'

const BackgroundSelector = ({ region }: any) => {
  const licensePlate = useGetLicensePlateReducerValues('licensePlate')
  const { handleLicensePlate } = useSetPlateToStore()

  const [regionCount, setRegionCount] = useState(0)

  useEffect(() => {
    let tmpCnt = 0
    PLATE_BACKGROUND_LIST.map((_, id) => {
      if (PLATE_BACKGROUND_LIST[id]?.nameRegion === region?.nameShortRegion) {
        tmpCnt++
      }
    })
    setRegionCount(tmpCnt)
  }, [region])

  return (
    <div className={`grid grid-cols-4 gap-[20px] ${regionCount > 20 ? 'h-[27rem] overflow-auto	' : ''}`}>
      {PLATE_BACKGROUND_LIST.map((_, id) => {
        if (PLATE_BACKGROUND_LIST[id]?.nameRegion === region?.nameShortRegion) {
          return (
            <div
              key={id}
              className={`cursor-pointer hover:scale-105  hover:duration-300  ${
                licensePlate.backgroundImgId === id
                  ? 'rounded-[10px]  border-[3px]  border-solid border-cyan-200'
                  : 'border-[3px] border-[rgba(0,0,0,0)]'
              }`}
              onClick={() => {
                handleLicensePlate('backgroundImgId', id)
                handleLicensePlate('backgroundCountry', PLATE_BACKGROUND_LIST[id]?.name)
              }}
            >
              <img src={PLATE_BACKGROUND_LIST[id]?.image} className="w-32 h-auto rounded-[6px]" />
            </div>
          )
        } else {
          return <div className="hidden" key={id}></div>
        }
      })}
    </div>
  )
}

export default BackgroundSelector
