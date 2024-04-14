import React, { useState, useCallback } from 'react'

import { CheckIIcon } from 'components/Icons'
import { carAddress } from 'contracts/address'

import MissionAvailableDetail from './MissionAvailableDetail'
import MissionAvailableJoin from './MissionAvailableJoin'
import MissionAvailableSelectCar from './MissionAvailableSelectCar'

const MissionAvailable = ({
  missionId,
  missionDetail,
  missionType,
  tokenIds,
  isValidToEnter,
  onChangeMissionType,
  onEnterMission,
  onCheckEntryTickets,
}) => {
  const [stepInMission, setStepInMission] = useState('detail') // [detail, selectCar, join]
  const [selectedTokenId, setSelectedTokenId] = useState(null)

  const handleSwtichStepInMission = useCallback((step) => {
    setStepInMission(step)
  }, [])

  const handleReviewMission = useCallback((tokenId, step) => {
    setSelectedTokenId(tokenId)
    setStepInMission(step)
  }, [])

  const handleJoinMission = useCallback(() => {
    onEnterMission(missionId, missionDetail.qualifyingNft, selectedTokenId)
  }, [missionDetail.qualifyingNft, missionId, onEnterMission, selectedTokenId])

  const selectableTokenIds = missionDetail.qualifyingNft === carAddress ? tokenIds.muscle : tokenIds.super
  const tokenType = missionDetail.qualifyingNft === carAddress ? 'muscle' : 'super'

  return (
    <>
      <div className="px-8 py-4">
        {!(stepInMission === 'selectCar' || stepInMission === 'join') && (
          <>
            <div className="flex items-center justify-between gap-1">
              {missionType === 'available' ? (
                <div className="px-4 py-2 rounded-full bg-[#3BD470] bg-opacity-40 text-center">
                  <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#42Ec7C]">available</div>
                </div>
              ) : (
                <div
                  className="text-[10px] tracking-[2px] uppercase text-[#42Ec7C] cursor-pointer"
                  onClick={() => onChangeMissionType('available')}
                >
                  available
                </div>
              )}
              {missionType === 'ongoing' ? (
                <div className="px-4 py-2 rounded-full bg-[#FFAE00] bg-opacity-30 text-center">
                  <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#FFC544]">ongoing</div>
                </div>
              ) : (
                <div
                  className="text-[10px] tracking-[2px] uppercase text-[#FFC544] cursor-pointer"
                  onClick={() => onChangeMissionType('ongoing')}
                >
                  ongoing
                </div>
              )}
              {missionType === 'completed' ? (
                <div className="px-4 py-2 rounded-full bg-[#26B3F9] bg-opacity-30 text-center">
                  <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#26B3F9]">completed</div>
                </div>
              ) : (
                <div
                  className="text-[10px] tracking-[2px] uppercase text-[#26B3F9] cursor-pointer"
                  onClick={() => onChangeMissionType('completed')}
                >
                  completed
                </div>
              )}
            </div>
            <div className="border-t border-dashed border-[#42EC7C] my-3.5"></div>
          </>
        )}
        <div className="flex items-center justify-between gap-1">
          {stepInMission === 'detail' && (
            <>
              <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#42EC7C]">mission detail</div>
              <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#8E8E8E]">select car</div>
              <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#8E8E8E]">join mission</div>
            </>
          )}
          {stepInMission === 'selectCar' && (
            <>
              <div className="flex items-center gap-1">
                <CheckIIcon width={`16`} height={`16`} color={`#42EC7C`} />
                <div className="text-[10px] tracking-[2px] uppercase">mission detail</div>
              </div>
              <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#42EC7C]">select car</div>
              <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#8E8E8E]">join mission</div>
            </>
          )}
          {stepInMission === 'join' && (
            <>
              <div className="flex items-center gap-1">
                <CheckIIcon width={`16`} height={`16`} color={`#42EC7C`} />
                <div className="text-[10px] tracking-[2px] uppercase">mission detail</div>
              </div>
              <div className="flex items-center gap-1">
                <CheckIIcon width={`16`} height={`16`} color={`#42EC7C`} />
                <div className="text-[10px] tracking-[2px] uppercase">select car</div>
              </div>
              <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#42EC7C]">join mission</div>
            </>
          )}
        </div>
        {stepInMission === 'selectCar' && (
          <>
            <div className="border-t border-dashed border-[#42EC7C] my-3.5"></div>
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSwtichStepInMission('detail')}>
                <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6L10 11.7735V0.226497L0 6ZM22 5L9 5V7L22 7V5Z" fill="#42EC7C" />
                </svg>
                <div className="font-bold text-[#42EC7C] text-xs tracking-[1px] uppercase">back to mission detail</div>
              </div>
              {/* <div className="flex items-center gap-2">
                <div className="px-4 py-2 rounded-full bg-[#3BD46F] bg-opacity-25 text-center">
                  <div className="font-bold text-xs tracking-[1px] uppercase text-[#42EC7C]">
                    all
                  </div>
                </div>
                <div className="text-xs tracking-[1px] uppercase text-[#D9D9D9]">
                  qualified
                </div>
              </div> */}
            </div>
          </>
        )}
        {stepInMission === 'join' && (
          <>
            <div className="border-t border-dashed border-[#42EC7C] my-3.5"></div>
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSwtichStepInMission('selectCar')}>
                <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6L10 11.7735V0.226497L0 6ZM22 5L9 5V7L22 7V5Z" fill="#42EC7C" />
                </svg>
                <div className="font-bold text-[#42EC7C] text-xs tracking-[1px] uppercase">back to select car</div>
              </div>
            </div>
          </>
        )}
        <div className="border-t border-dashed border-[#42EC7C] my-3.5"></div>
        {stepInMission === 'detail' && (
          <MissionAvailableDetail
            missionDetail={missionDetail}
            isValidToEnter={isValidToEnter}
            onSelectCar={handleSwtichStepInMission}
            onCheckEntryTickets={onCheckEntryTickets}
          />
        )}
        {stepInMission === 'selectCar' && (
          <MissionAvailableSelectCar tokenType={tokenType} selectableTokenIds={selectableTokenIds} onSelectCar={handleReviewMission} />
        )}
        {stepInMission === 'join' && (
          <MissionAvailableJoin
            missionDetail={missionDetail}
            tokenType={tokenType}
            selectedTokenId={selectedTokenId}
            onJoinMission={handleJoinMission}
          />
        )}
      </div>
      {/* {stepInMission === "detail" ? (
        <div className="grid grid-cols-2 gap-1 px-8 bg-[#42EC7C] bg-opacity-[15%] py-7">
          <div className="flex items-center gap-2">
            <svg
              width="22"
              height="12"
              viewBox="0 0 22 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6L10 11.7735V0.226497L0 6ZM22 5L9 5V7L22 7V5Z"
                fill="#42EC7C"
              />
            </svg>
            <div className="text-[#42EC7C] text-[10px] tracking-[2px] uppercase">
              previous mission
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <div className="text-[#42EC7C] text-[10px] tracking-[2px] uppercase">
              next mission
            </div>
            <svg
              width="22"
              height="12"
              viewBox="0 0 22 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 6L12 0.226499L12 11.7735L22 6ZM-1.74846e-07 7L13 7L13 5L1.74846e-07 5L-1.74846e-07 7Z"
                fill="#42EC7C"
              />
            </svg>
          </div>
        </div>
      ) : (
        <></>
      )} */}
    </>
  )
}

export default MissionAvailable
