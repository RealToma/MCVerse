import { useState, useCallback, useRef } from 'react'

import * as Videos from 'utils/helper/video.helper'

const modVideo = {
  super: {
    power: {
      1: Videos.gscModsPowerBronze,
      2: Videos.gscModsPowerSilver,
      3: Videos.gscModsPowerGold,
    },
    boost: {
      1: Videos.gscModsBoostBronze,
      2: Videos.gscModsBoostSilver,
      3: Videos.gscModsBoostGold,
    },
    handling: {
      1: Videos.gscModsHandlingBronze,
      2: Videos.gscModsHandlingSilver,
      3: Videos.gscModsHandlingGold,
    },
    tires: {
      1: Videos.gscModsTiresBronze,
      2: Videos.gscModsTiresSilver,
      3: Videos.gscModsTiresGold,
    },
  },
  muscle: {
    power: {
      1: Videos.amccModsPowerBronze,
      2: Videos.amccModsPowerSilver,
      3: Videos.amccModsPowerGold,
    },
    boost: {
      1: Videos.amccModsBoostBronze,
      2: Videos.amccModsBoostSilver,
      3: Videos.amccModsBoostGold,
    },
    handling: {
      1: Videos.amccModsHandlingBronze,
      2: Videos.amccModsHandlingSilver,
      3: Videos.amccModsHandlingGold,
    },
    tires: {
      1: Videos.amccModsTiresBronze,
      2: Videos.amccModsTiresSilver,
      3: Videos.amccModsTiresGold,
    },
  },
}

const cardBg = {
  1: 'bg-toolbox-bronze',
  2: 'bg-toolbox-silver',
  3: 'bg-toolbox-gold',
}

const cardBorder = {
  1: 'border-[#AEA498]',
  2: 'border-[#FFFFFF]',
  3: 'border-[#FFAE00]',
}

const cardTextColor = {
  1: 'text-[#AEA498]',
  2: 'text-[#FFFFFF]',
  3: 'text-[#FFAE00]',
}

const typeBg = {
  power: 'bg-[#8F00FF]',
  handling: 'bg-[#0075FF]',
  boost: 'bg-[#F8511D]',
  tires: 'bg-[#2FCDA7]',
}

const ModCard = ({ info, handleSelectToolbox, nfvType, isNew }) => {
  const ref = useRef(null)
  const { id, type, value } = info

  const [isSelected, setIsSelected] = useState(false)

  const handleClickCard = useCallback(() => {
    const ns = !isSelected
    handleSelectToolbox(id, ns)
    setIsSelected(ns)
    if (ns) {
      ref.current.currentTime = 0
      ref.current.play()
    } else {
      ref.current.pause()
      ref.current.currentTime = 0
    }
  }, [handleSelectToolbox, isSelected, id])

  return (
    <div className="relative pb-1.5 overflow-hidden">
      {isNew && (
        <div className="absolute top-0 left-0 w-4 h-4">
          <div className="absolute transform -rotate-45 bg-[#23D0FF] text-center text-white text-[8px] font-semibold py-0.5 left-[-48px] top-[4px] w-[120px] z-20">
            NEW
          </div>
        </div>
      )}
      <div
        className={`${cardBg[value]} ${cardBorder[value]} relative rounded p-1.5 border cursor-pointer group`}
        onClick={() => handleClickCard()}
      >
        {isSelected && (
          <div
            className={`${typeBg[type]} absolute w-3 h-3 rounded-full border border-[#28303F] -bottom-1.5 left-1/2 -translate-x-1/2`}
          ></div>
        )}
        <video
          ref={ref}
          src={modVideo[nfvType][type][value]}
          loop
          className={`${isSelected ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'} w-full rounded-md border ${cardBorder[value]}`}
        />
        <div className="flex items-center justify-between mt-1">
          <div className={`${cardTextColor[value]} font-bold text-[10px] leading-3 tracking-[1px]`}>+{value}</div>
          <div className={`${cardTextColor[value]} text-[10px] leading-3 tracking-[1px]`}>#{id}</div>
        </div>
      </div>
    </div>
  )
}

export default ModCard
