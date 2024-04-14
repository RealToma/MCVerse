import React from 'react'

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'

import { ArrowDownIcon, ArrowUpIcon } from 'components/Icons'
import { imgMuscleCarUrl, imgSuperCarUrl } from 'services/api'
import * as Images from 'utils/helper/image.helper'

const imgUrls = (id, type) => {
  return type === 'muscle' ? `${imgMuscleCarUrl}${id}` : `${imgSuperCarUrl}${id}`
}
const arrowIcon = (isSelected, order) =>
  isSelected ? order === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon /> : <ArrowDownIcon color={'#66888E'} />

const GarageListView = ({ selectedSort, sortOrder, nfv, selectedCarInfo, handleClickSort, handleSelectCar, handleClaim }) => {
  return (
    <Table className="garage table w-full text-xs sm:text-[9px] text-white uppercase">
      <Thead className="w-full ">
        <Tr className="text-cyan-100 tracking-[0.5px] table table-fixed w-full text-shadow-blue">
          <Th className="py-3 px-0.5 text-center">nft</Th>
          <Th className="px-0.5 text-center">collection</Th>
          <Th className="px-0.5">
            <div className="flex items-center md:justify-center gap-0.5 px-0.5 cursor-pointer" onClick={() => handleClickSort('tokenId')}>
              <div className={selectedSort.value === 'tokenId' ? 'font-bold text-white' : undefined}>mint #</div>
              {arrowIcon(selectedSort.value === 'tokenId', sortOrder)}
            </div>
          </Th>
          <Th className="px-0.5">
            <div className="flex items-center md:justify-center gap-0.5 px-0.5 cursor-pointer" onClick={() => handleClickSort('earn')}>
              <div className={selectedSort.value === 'earn' ? 'font-bold text-white' : undefined}>daily earn</div>
              {arrowIcon(selectedSort.value === 'earn', sortOrder)}
            </div>
          </Th>
          <Th className="px-0.5">
            <div className="flex items-center md:justify-center gap-0.5 px-0.5 cursor-pointer" onClick={() => handleClickSort('locked')}>
              <div className={selectedSort.value === 'locked' ? 'font-bold text-white' : undefined}>locked</div>
              {arrowIcon(selectedSort.value === 'locked', sortOrder)}
            </div>
          </Th>
          <Th className="px-0.5">
            <div className="flex items-center md:justify-center gap-0.5 px-0.5 cursor-pointer" onClick={() => handleClickSort('unlocked')}>
              <div className={selectedSort.value === 'unlocked' ? 'font-bold text-white' : undefined}>unlocked</div>
              {arrowIcon(selectedSort.value === 'unlocked', sortOrder)}
            </div>
          </Th>
          <Th className="px-0.5">
            <div className="flex items-center md:justify-center gap-0.5 px-0.5 cursor-pointer" onClick={() => handleClickSort('claim')}>
              <div className={selectedSort.value === 'claim' ? 'font-bold text-white' : undefined}>to claim</div>
              {arrowIcon(selectedSort.value === 'claim', sortOrder)}
            </div>
          </Th>
          <Th className="px-0.5 text-center">actions</Th>
        </Tr>
      </Thead>
      <Tbody className="block w-full pr-1 overflow-y-auto text-center max-h-96">
        {nfv.map((item, index) => (
          <Tr
            className={`${
              selectedCarInfo ? (selectedCarInfo.id === item.id ? 'active' : null) : null
            } border-gray-900 border-b-[0.5px] last:border-0 border-opacity-70 hover:bg-[#21C6FA] hover:bg-opacity-30 table table-fixed w-full cursor-pointer`}
            key={`car_${index}`}
            onClick={() => handleSelectCar(item.id, item.type)}
          >
            <Td className="px-0.5">
              <div className="flex items-center md:justify-center py-0.5">
                <div className="border border-solid border-gray bg-gray-700 rounded-lg">
                  <img src={imgUrls(item.id, item.type)} alt="car" className="rounded-lg w-9 h-9" loading="lazy" />
                </div>
              </div>
            </Td>
            <Td className="px-0.5">
              <div className="flex items-center gap-1 text-white md:justify-center ">
                {item.type === 'muscle' && (
                  <>
                    <img src={Images.iconAhill} alt="icon-token" className="w-3.5" /> AMCC
                  </>
                )}
                {item.type === 'super' && (
                  <>
                    <img src={Images.iconGville} alt="icon-token" className="w-3.5" /> GSC
                  </>
                )}
              </div>
            </Td>
            <Td className="px-0.5 ">{item.id}</Td>
            <Td className="px-0.5 ">{item.earnSpeed}/day</Td>
            <Td className="px-0.5 ">{item.lockedTotal.toLocaleString()} mcv</Td>
            <Td className="px-0.5 ">{item.unlockedClaimable.toLocaleString()} mcv</Td>
            <Td className="px-0.5 ">{item.claimable.toLocaleString()} mcv</Td>
            <Td className="px-0.5">
              <div className="flex items-center gap-3 md:justify-center">
                <img
                  src={Images.iconActionBank}
                  alt="action_bank"
                  title="CLICK TO CLAIM"
                  className="cursor-pointer"
                  onClick={() => handleClaim()}
                />
                {/* <img src={Images.iconActionNft} alt="action_nft" title="SEE IN MARKETPLACE" /> */}
              </div>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default GarageListView
