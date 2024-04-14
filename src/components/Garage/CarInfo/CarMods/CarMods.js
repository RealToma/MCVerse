import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'

import { PulseLoader } from 'react-spinners'

import { PowerIcon, TiresIcon, BoostIcon, HandlingIcon } from 'components/Icons'
import { iconCheckBlack } from 'utils/helper/image.helper'

import ModCard from './ModCard'

const CarMods = ({ isApplyingMods, mods, nfvType, handleApplyMods, isNewBoxOpened }) => {
  const ref = useRef([])

  const [selectedModIds, setSelectedModIds] = useState([])

  const handleSelectToolbox = useCallback(
    (id, isSelected) => {
      const ps = [...selectedModIds]
      let ns = []
      if (isSelected) ns = [...ps, id]
      else ns = ps.filter((item) => item !== id)
      setSelectedModIds(ns)
    },
    [selectedModIds]
  )

  const handleApplyAll = useCallback(() => {
    handleApplyMods(selectedModIds, nfvType)
  }, [handleApplyMods, selectedModIds, nfvType])

  const applyingAmount = useMemo(() => {
    const selectedMods = mods.filter((mod) => selectedModIds.includes(mod.id))

    let power = 0
    let handling = 0
    let boost = 0
    let tires = 0

    selectedMods.forEach((mod) => {
      if (mod.type === 'power') power = power + +mod.value
      if (mod.type === 'boost') boost = boost + +mod.value
      if (mod.type === 'handling') handling = handling + +mod.value
      if (mod.type === 'tires') tires = tires + +mod.value
    })

    return { power, handling, boost, tires }
  }, [mods, selectedModIds])

  useEffect(() => {
    ref.current = mods
  })

  return (
    <div className="flex flex-col justify-between gap-1 md:flex-row">
      <div className="grid flex-grow h-full grid-cols-3 sm:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-5 gap-2.5 pr-1 overflow-y-auto max-h-80 py-1.5">
        {mods.map((mod, index) => (
          <ModCard
            isNew={isNewBoxOpened && !ref.current.find(({ id }) => id === mod.id)}
            info={mod}
            nfvType={nfvType}
            handleSelectToolbox={handleSelectToolbox}
            key={index}
          />
        ))}
      </div>
      <div className="border-t-2 border-[#00CAFF] bg-black bg-opacity-50 rounded-br-2xl flex flex-col">
        <div className="py-1.5 px-2.5">
          <div className="text-[10px] leading-3 text-center tracking-[2px] text-white text-shadow-blue uppercase">applying:</div>
          <div className="border-t border-[#707070] border-dashed my-1.5"></div>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex items-center gap-2 mx-auto">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8F00FF]">
                <PowerIcon width={24} height={24} />
              </div>
              <div className="leading-5 tracking-[1px] text-[#8F00FF] uppercase font-bold">+{applyingAmount.power}</div>
            </div>
            <div className="flex items-center gap-2 mx-auto">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0075FF]">
                <HandlingIcon width={24} height={24} />
              </div>
              <div className="leading-5 tracking-[1px] text-[#0075FF] uppercase font-bold">+{applyingAmount.handling}</div>
            </div>
            <div className="flex items-center gap-2 mx-auto">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F8511D]">
                <BoostIcon width={18} height={24} />
              </div>
              <div className="leading-5 tracking-[1px] text-[#F8511D] uppercase font-bold">+{applyingAmount.boost}</div>
            </div>
            <div className="flex items-center gap-2 mx-auto">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2FCDA7]">
                <TiresIcon width={24} height={24} />
              </div>
              <div className="leading-5 tracking-[1px] text-[#2FCDA7] uppercase font-bold">+{applyingAmount.tires}</div>
            </div>
          </div>
          <div className="border-t border-[#707070] border-dashed my-1.5"></div>
          <div className="text-[10px] leading-5 font-bold w-full text-center tracking-[1px] text-[#55D3FF] uppercase">
            {selectedModIds.length} toolboxes
          </div>
        </div>
        {isApplyingMods ? (
          <button className="bg-[#21D0FF] rounded-br-2xl flex items-center justify-center p-2 mt-auto cursor-not-allowed">
            <PulseLoader color="#000F44" />
          </button>
        ) : (
          <>
            {selectedModIds.length > 0 ? (
              <button
                className="bg-[#21D0FF] hover:bg-cyan-500 rounded-br-2xl flex items-center justify-center p-2 mt-auto"
                onClick={() => handleApplyAll()}
              >
                <div>
                  <img src={iconCheckBlack} alt="" className="mx-auto" />
                  <div className="font-bold text-xs leading-3 text-center tracking-[1px] text-[#000F44] uppercase mt-1">apply all</div>
                </div>
              </button>
            ) : (
              <div className="bg-[#21D0FF] bg-opacity-40 rounded-br-2xl flex items-center justify-center p-2 mt-auto">
                <div className="font-bold text-xs leading-3 text-center tracking-[1px] text-[#000F44] uppercase mt-1">select</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CarMods
