import { useState, useCallback } from 'react'

import { imgSuperCarUrl } from 'services/api'
import { iconCheckWhite, imgMuscleCar, imgNotSupportedNfv } from 'utils/helper/image.helper'

const BridgeItem = ({ id, isSupported, handleSelectNft }) => {
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = useCallback(() => {
    setIsSelected(!isSelected)
    handleSelectNft(!isSelected, id)
  }, [isSelected, handleSelectNft, id])

  return (
    <>
      {isSupported ? (
        <div className="relative border-2 rounded cursor-pointer border-cyan-250" onClick={() => handleClick()}>
          {isSelected && (
            <div className="absolute z-10 flex items-center justify-center w-full h-full bg-opacity-50 bg-cyan-250">
              <img src={iconCheckWhite} className="w-7 h-7" />
            </div>
          )}
          <img src={`${imgSuperCarUrl}${id}`} alt="" className="w-full rounded" />
        </div>
      ) : (
        <div className="relative border border-white rounded cursor-not-allowed">
          <div className="absolute z-10 flex items-center justify-center w-full h-full">
            <div className="text-[10px] text-center">
              <div>Not</div>
              <div>Supported</div>
            </div>
          </div>
          <img src={imgNotSupportedNfv} alt="" className="w-full rounded" />
        </div>
      )}
    </>
  )
}

export default BridgeItem
