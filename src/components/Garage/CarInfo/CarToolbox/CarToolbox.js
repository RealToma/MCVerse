import React, { useState, useCallback } from 'react'

import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'

import { iconCheckBlack } from 'utils/helper/image.helper'

import ToolboxCard from './ToolboxCard'

const CarToolbox = ({ isOpeningToolbox, toolbox, handleOpenToolboxes, nfvType }) => {
  const { bronze, silver, gold } = toolbox

  const navigate = useNavigate()
  const [numOfBronze, setNumOfBronze] = useState(0)
  const [numOfSilver, setNumOfSilver] = useState(0)
  const [numOfGold, setNumOfGold] = useState(0)
  const [listOfIdsToOpen, setListOfIdsToOpen] = useState([])

  const handleSelectToolbox = useCallback(
    (tokenId, level, isSelected) => {
      if (level === 'bronze') {
        const num = isSelected ? numOfBronze + 1 : numOfBronze - 1
        setNumOfBronze(num < 0 ? 0 : num)
      }
      if (level === 'silver') {
        const num = isSelected ? numOfSilver + 1 : numOfSilver - 1
        setNumOfSilver(num < 0 ? 0 : num)
      }
      if (level === 'gold') {
        const num = isSelected ? numOfGold + 1 : numOfGold - 1
        setNumOfGold(num < 0 ? 0 : num)
      }
      setListOfIdsToOpen((ps) => {
        let cs = [...ps]
        if (isSelected) cs.push(tokenId)
        else cs = [...ps].filter((id) => id !== tokenId)
        return cs
      })
    },
    [numOfBronze, numOfGold, numOfSilver]
  )

  const handleOpenToolbox = useCallback(() => {
    handleOpenToolboxes(listOfIdsToOpen, nfvType)
  }, [handleOpenToolboxes, listOfIdsToOpen, nfvType])

  const handleGoToSpeedshop = useCallback(() => {
    navigate('/speedshop')
  }, [navigate])

  return (
    <div className="flex flex-col justify-between gap-1 md:flex-row">
      {bronze.length + silver.length + gold.length > 0 ? (
        <div className="grid flex-grow h-full grid-cols-3 sm:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-5 gap-2.5 pr-1 overflow-y-auto max-h-72 py-1.5">
          {bronze.map((tokenId, index) => (
            <ToolboxCard tokenId={tokenId} level={`bronze`} nfvType={nfvType} handleSelectToolbox={handleSelectToolbox} key={index} />
          ))}
          {silver.map((tokenId, index) => (
            <ToolboxCard tokenId={tokenId} level={`silver`} nfvType={nfvType} handleSelectToolbox={handleSelectToolbox} key={index} />
          ))}
          {gold.map((tokenId, index) => (
            <ToolboxCard tokenId={tokenId} level={`gold`} nfvType={nfvType} handleSelectToolbox={handleSelectToolbox} key={index} />
          ))}
        </div>
      ) : (
        <div className="text-[10px] tracking-wide">
          Get your toolboxes from the{' '}
          <span className="text-[#FFD900] underline underline-offset-2 cursor-pointer" onClick={() => handleGoToSpeedshop()}>
            Speedshop!
          </span>
        </div>
      )}
      <div className="border-t-2 border-[#00CAFF] bg-black bg-opacity-50 rounded-br-2xl flex flex-col">
        <div className="py-1.5 px-2.5">
          <div className="text-[10px] leading-3 text-center tracking-[2px] text-white text-shadow-blue uppercase">opening</div>
          <div className="border-t border-[#707070] border-dashed my-1.5"></div>
          <div className="flex flex-col gap-6 pb-4">
            <div className="text-center">
              <div className="text-[10px] leading-3 tracking-[1px] text-[#F3B14D] text-shadow-blue uppercase">bronze</div>
              <div className="text-2xl leading-3 tracking-[1px] text-white text-shadow-blue uppercase mt-3">{numOfBronze}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] leading-3 tracking-[1px] text-[#E0E0E0] text-shadow-blue uppercase">silver</div>
              <div className="text-2xl leading-3 tracking-[1px] text-white text-shadow-blue uppercase mt-3">{numOfSilver}</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] leading-3 tracking-[1px] text-[#FFD900] text-shadow-blue uppercase">gold</div>
              <div className="text-2xl leading-3 tracking-[1px] text-white text-shadow-blue uppercase mt-3">{numOfGold}</div>
            </div>
          </div>
        </div>
        {isOpeningToolbox ? (
          <button className="bg-[#21D0FF] rounded-br-2xl flex items-center justify-center p-2 mt-auto cursor-not-allowed">
            <PulseLoader color="#000F44" />
          </button>
        ) : (
          <>
            {numOfBronze + numOfSilver + numOfGold > 0 ? (
              <button
                className="bg-[#21D0FF] hover:bg-cyan-500 rounded-br-2xl flex items-center justify-center p-2 mt-auto"
                onClick={() => handleOpenToolbox()}
              >
                <div>
                  <img src={iconCheckBlack} alt="" className="mx-auto" />
                  <div className="font-bold text-xs leading-3 text-center tracking-[1px] text-[#000F44] uppercase mt-1">
                    open {numOfBronze + numOfSilver + numOfGold}
                  </div>
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

export default CarToolbox
