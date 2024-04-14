import React, { useState } from 'react'

import { Table, Thead, Tbody, Th, Tr, Td } from 'react-super-responsive-table'

import { imgMuscleCarUrl, imgSuperCarUrl } from 'services/api'

// import { BoostIcon } from "../../../../Icons";
// import imgCar from "../../../../../assets/image/muscle_car.png";

const imgUrls = (id, type) => {
  return type === 'muscle' ? `${imgMuscleCarUrl}${id}` : `${imgSuperCarUrl}${id}`
}

const MissionAvailableSelectCar = ({ tokenType, selectableTokenIds, onSelectCar }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [selectedTokenId, setSelectedTokenId] = useState(null)

  const handleSelectToken = (tokenId, index) => {
    setSelectedIndex(index)
    setSelectedTokenId(tokenId)
  }

  const handleClickReviewMission = () => {
    onSelectCar(selectedTokenId, 'join')
  }
  return (
    <>
      <Table className="mission-select-car table w-full text-[11px] uppercase">
        <Thead className="w-full">
          <Tr className="tracking-[1px] font-bold table table-fixed w-full">
            <Th className="pb-3 px-0.5 text-center">nft</Th>
            <Th className="px-0.5 text-center">mint #</Th>
            {/* <Th className="px-0.5 text-left">mod</Th> */}
          </Tr>
        </Thead>
        <Tbody className="block w-full overflow-y-auto overflow-x-visible text-center h-72 bg-[rgba(66,236,124,0.13)] rounded">
          {selectableTokenIds.map((tokenId, index) => (
            <Tr
              className={`${index === selectedIndex ? 'active' : ''} ${
                index % 2 === 0 ? 'bg-[rgba(66,236,124,0.13)]' : ''
              } table table-fixed w-full cursor-pointer hover:border-y-[#42ec7c] hover:border-y`}
              key={`car_${index}`}
              onClick={() => handleSelectToken(tokenId, index)}
            >
              <Td className="px-0.5">
                <div className="flex items-center py-1 md:justify-center">
                  <div className="bg-gray-700 border border-white rounded-tr rounded-bl">
                    <img src={imgUrls(tokenId, tokenType)} alt="car" className="rounded-tr rounded-bl w-11 h-11" loading="lazy" />
                  </div>
                </div>
              </Td>
              <Td className="px-0.5 text-sm leading-none tracking-[1px]"># {tokenId}</Td>
              {/* <Td className="px-0.5">
                <div className="flex items-center gap-1">
                  <div className="flex items-center justify-center w-5 h-5 bg-[#F8511D] rounded-full">
                    <BoostIcon width={`10`} height={`16`} />
                  </div>
                  <div className="text-sm leading-none tracking-[1px] text-[#F8511D]">
                    LEVEL 4
                  </div>
                </div>
              </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <button
        className={`${
          selectedTokenId ? 'hover:text-white hover:font-medium cursor-pointer hover:bg-[#258645]' : 'cursor-not-allowed'
        } bg-[#42EC7C] rounded-md flex items-center justify-center mt-8 text-black w-full font-bold text-2xl leading-none p-5`}
        onClick={() => handleClickReviewMission()}
        disabled={!selectedTokenId}
      >
        REVIEW MISSION
      </button>
    </>
  )
}

export default MissionAvailableSelectCar
