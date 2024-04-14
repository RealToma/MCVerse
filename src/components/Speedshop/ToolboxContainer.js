import React, { useEffect, useState, useCallback } from 'react'

import { PulseLoader } from 'react-spinners'

import ToolboxCard from 'components/Garage/CarInfo/CarToolbox/ToolboxCard'

const ToolboxContainer = ({ isOpening, toolbox, type, handleOpenToolbox }) => {
  const { bronze, silver, gold } = toolbox

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

  const handleOpen = useCallback(() => {
    if (numOfBronze + numOfGold + numOfSilver < 1) return
    handleOpenToolbox(listOfIdsToOpen, type)
  }, [handleOpenToolbox, listOfIdsToOpen, numOfBronze, numOfGold, numOfSilver, type])

  return (
    <div
      className={`${
        type === 'super' ? 'border-[#23D0FF]' : 'border-[#FFAE00]'
      } absolute z-50 top-12 right-0 border rounded-lg bg-gradient-to-b from-[#152348] to-[rgba(3,9,32,0.5)] w-64 sm:w-80 sm:h-80 flex flex-col`}
    >
      <div className="grid grid-cols-3 gap-2 pr-1 m-3 overflow-y-auto">
        {bronze.map((tokenId, index) => (
          <ToolboxCard tokenId={tokenId} level={`bronze`} nfvType={type} handleSelectToolbox={handleSelectToolbox} key={index} />
        ))}
        {silver.map((tokenId, index) => (
          <ToolboxCard tokenId={tokenId} level={`silver`} nfvType={type} handleSelectToolbox={handleSelectToolbox} key={index} />
        ))}
        {gold.map((tokenId, index) => (
          <ToolboxCard tokenId={tokenId} level={`gold`} nfvType={type} handleSelectToolbox={handleSelectToolbox} key={index} />
        ))}
      </div>
      {isOpening ? (
        <button
          className={`${
            type === 'super' ? 'bg-[#23D0FF] hover:bg-cyan-500' : 'bg-[#FFAE00] hover:bg-yellow-500'
          } w-full text-center py-4 mt-auto rounded-b-lg cursor-not-allowed`}
        >
          <PulseLoader color="#000F44" />
        </button>
      ) : (
        <button
          className={`${
            type === 'super' ? 'bg-[#23D0FF] hover:bg-cyan-500' : 'bg-[#FFAE00] hover:bg-yellow-500'
          } w-full text-center font-bold sm:text-lg leading-3 tracking-[1px] text-[#000F44] py-4 mt-auto rounded-b-lg`}
          onClick={() => handleOpen()}
        >
          {numOfBronze + numOfGold + numOfSilver > 0 ? `OPEN ${numOfBronze + numOfGold + numOfSilver}` : 'SELECT'} TOOLBOXES
        </button>
      )}
    </div>
  )
}

export default ToolboxContainer
