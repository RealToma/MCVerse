import React, { useState, useCallback, useRef } from 'react'

import * as Videos from 'utils/helper/video.helper'

const toolboxVideo = {
  super: {
    bronze: Videos.gscToolboxBronze,
    silver: Videos.gscToolboxSilver,
    gold: Videos.gscToolboxGold,
  },
  muscle: {
    bronze: Videos.amccToolboxBronze,
    silver: Videos.amccToolboxSilver,
    gold: Videos.amccToolboxGold,
  },
}

const cardBg = {
  bronze: 'bg-toolbox-bronze',
  silver: 'bg-toolbox-silver',
  gold: 'bg-toolbox-gold',
}

const cardBorder = {
  bronze: 'border-[#AEA498]',
  silver: 'border-[#FFFFFF]',
  gold: 'border-[#FFAE00]',
}

const cardTextColor = {
  bronze: 'text-[#AEA498]',
  silver: 'text-[#FFFFFF]',
  gold: 'text-[#FFAE00]',
}

const cardLevel = {
  bronze: 1,
  silver: 2,
  gold: 3,
}

const ToolboxCard = ({ tokenId, level, handleSelectToolbox, nfvType }) => {
  const ref = useRef(null)
  const [isSelected, setIsSelected] = useState(false)

  const handleClickCard = useCallback(() => {
    const ns = !isSelected
    handleSelectToolbox(tokenId, level, ns)
    setIsSelected(ns)
    if (ns) {
      ref.current.currentTime = 0
      ref.current.play()
    } else {
      ref.current.pause()
      ref.current.currentTime = 0
    }
  }, [handleSelectToolbox, isSelected, level, tokenId])

  return (
    <div className="pb-1.5">
      <div
        className={`${cardBg[level]} ${
          isSelected ? 'border-[#23D0FF]' : cardBorder[level]
        } relative rounded p-1.5 border cursor-pointer group`}
        onClick={() => handleClickCard()}
      >
        {isSelected && (
          <div className="absolute bg-[#22CCFB] w-3 h-3 rounded-full border border-[#28303F] -bottom-1.5 left-1/2 -translate-x-1/2"></div>
        )}
        <video
          ref={ref}
          src={toolboxVideo[nfvType][level]}
          loop
          className={`${isSelected ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'} w-full rounded-md border ${cardBorder[level]}`}
        />
        <div className="flex items-center justify-between mt-1">
          <div className={`${cardTextColor[level]} font-bold text-[10px] leading-3 tracking-[1px]`}>+{cardLevel[level]}</div>
          {/* <div
            className={`${cardTextColor[level]} text-[10px] leading-3 tracking-[1px]`}
          >
            #123
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default ToolboxCard
