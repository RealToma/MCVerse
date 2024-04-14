import React, { useCallback, useState } from 'react'

import { Link } from 'react-router-dom'

import { imgGTicket } from 'utils/helper/image.helper'

import MissionAvailable from './MissionAvailable/MissionAvailable'
import MissionCompleted from './MissionCompleted/MissionCompleted'
import MissionOnGoing from './MissionOnGoing/MissionOnGoing'

const borderColors = {
  available: 'border-[#42EC7C]',
  ongoing: 'border-[#FFC33E]',
  completed: 'border-[#26B3F9]',
}
const colorByMission = {
  available: '#42EC7C',
  ongoing: '#FFC33E',
  completed: '#26B3F9',
}

const MissionDetail = ({
  missionInfo,
  missionEntries,
  nowTime,
  tokenIds,
  numOfTickets,
  closeDetailContainer,
  onEnterMission,
  onCompleteMission,
}) => {
  const { missionId, missionDetail } = missionInfo

  const [missionType, setMissionType] = useState('available') // [available, ongoing, completed]
  const [showModal, setShowModal] = useState(false)
  const handleSwitchMissionType = useCallback((type) => {
    setMissionType(type)
  }, [])
  // console.log(missionDetail.meta);

  const closeModal = () => {
    setShowModal(false)
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  const isValidToEnter = numOfTickets > 0 ? true : false
  console.log('is valid to enter: ', isValidToEnter)
  // const strings = missionDetail.meta
  //   .replace(/^\{|\}$/g, "")
  //   .replace(/^\[/g, "")
  //   .split(", ");
  // const result = {};

  // strings.forEach((pair) => {
  //   const [key, value] = pair
  //     .split(":")
  //     .map((item) => item.trim().replace(/\"/g, ""));
  //   result[key] = value;
  // });

  // console.log(result);
  // console.log(missionEntries);
  const { entryimage } = JSON.parse(missionDetail.meta)
  return (
    <>
      <div className="absolute z-20 bg-black bottom-1 right-1 bg-opacity-90 rounded-tl-[20px] w-[480px] transition-[height] ease-in duration-1000 delay-150">
        <div className={`relative border-t-2 border-l-2 ${borderColors[missionType]} rounded-tl-[20px]`}>
          <div
            // className={`absolute ${
            //   !(stepInMission === "selectCar" || stepInMission === "join")
            //     ? "top-4"
            //     : "-top-6"
            // } -left-6`}
            className={`absolute -left-6 top-4`}
          >
            <div
              className={`w-12 h-12 border-2 ${borderColors[missionType]} bg-black hover:bg-gray-900 rounded-full flex items-center justify-center cursor-pointer`}
              onClick={closeDetailContainer}
            >
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.7197 2.3125L2.31285 20.7194" stroke={colorByMission[missionType]} strokeWidth="4" strokeLinecap="round" />
                <path d="M20.7197 20.7197L2.31286 2.31279" stroke={colorByMission[missionType]} strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          {missionType === 'available' && (
            <MissionAvailable
              missionId={missionId}
              missionDetail={missionDetail}
              missionType={missionType}
              tokenIds={tokenIds}
              isValidToEnter={isValidToEnter}
              onChangeMissionType={handleSwitchMissionType}
              onEnterMission={onEnterMission}
              onCheckEntryTickets={handleShowModal}
            />
          )}
          {missionType === 'ongoing' && (
            <MissionOnGoing
              nowTime={nowTime}
              missionId={missionId}
              missionDetail={missionDetail}
              missionType={missionType}
              missionEntries={missionEntries}
              onChangeMissionType={handleSwitchMissionType}
            />
          )}
          {missionType === 'completed' && (
            <MissionCompleted
              nowTime={nowTime}
              missionId={missionId}
              missionDetail={missionDetail}
              missionType={missionType}
              missionEntries={missionEntries}
              onChangeMissionType={handleSwitchMissionType}
              onCompleteMission={onCompleteMission}
              onEnterMission={onEnterMission}
            />
          )}
          {/* <div className="px-8 py-4">
            {!(stepInMission === "selectCar" || stepInMission === "join") && (
              <>
                <div className="flex items-center justify-between gap-1">
                  {missionType === "available" ? (
                    <div className="px-4 py-2 rounded-full bg-[#3BD470] bg-opacity-40 text-center">
                      <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#42Ec7C]">
                        available
                      </div>
                    </div>
                  ) : (
                    <div
                      className="text-[10px] tracking-[2px] uppercase text-[#42Ec7C] cursor-pointer"
                      onClick={() => handleSwitchMissionType("available")}
                    >
                      available
                    </div>
                  )}
                  {missionType === "ongoing" ? (
                    <div className="px-4 py-2 rounded-full bg-[#FFAE00] bg-opacity-30 text-center">
                      <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#FFC544]">
                        ongoing
                      </div>
                    </div>
                  ) : (
                    <div
                      className="text-[10px] tracking-[2px] uppercase text-[#FFC544] cursor-pointer"
                      onClick={() => handleSwitchMissionType("ongoing")}
                    >
                      ongoing
                    </div>
                  )}
                  {missionType === "completed" ? (
                    <div className="px-4 py-2 rounded-full bg-[#26B3F9] bg-opacity-30 text-center">
                      <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#26B3F9]">
                        completed
                      </div>
                    </div>
                  ) : (
                    <div
                      className="text-[10px] tracking-[2px] uppercase text-[#26B3F9] cursor-pointer"
                      onClick={() => handleSwitchMissionType("completed")}
                    >
                      completed
                    </div>
                  )}
                </div>
                <div className="border-t border-dashed border-[#42EC7C] my-3.5"></div>
              </>
            )}
            <div className="flex items-center justify-between gap-1">
              {stepInMission === "detail" && (
                <>
                  <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#42EC7C]">
                    mission detail
                  </div>
                  <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#8E8E8E]">
                    select car
                  </div>
                  <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#8E8E8E]">
                    join mission
                  </div>
                </>
              )}
              {stepInMission === "selectCar" && (
                <>
                  <div className="flex items-center gap-1">
                    <CheckIIcon width={`16`} height={`16`} color={`#42EC7C`} />
                    <div className="text-[10px] tracking-[2px] uppercase">
                      mission detail
                    </div>
                  </div>
                  <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#42EC7C]">
                    select car
                  </div>
                  <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#8E8E8E]">
                    join mission
                  </div>
                </>
              )}
              {stepInMission === "join" && (
                <>
                  <div className="flex items-center gap-1">
                    <CheckIIcon width={`16`} height={`16`} color={`#42EC7C`} />
                    <div className="text-[10px] tracking-[2px] uppercase">
                      mission detail
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckIIcon width={`16`} height={`16`} color={`#42EC7C`} />
                    <div className="text-[10px] tracking-[2px] uppercase">
                      select car
                    </div>
                  </div>
                  <div className="font-bold text-[10px] tracking-[2px] uppercase text-[#42EC7C]">
                    join mission
                  </div>
                </>
              )}
            </div>
            {stepInMission === "selectCar" && (
              <>
                <div className="border-t border-dashed border-[#42EC7C] my-3.5"></div>
                <div className="flex items-center justify-between gap-1">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleSwtichStepInMission("detail")}
                  >
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
                    <div className="font-bold text-[#42EC7C] text-xs tracking-[1px] uppercase">
                      back to mission detail
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-4 py-2 rounded-full bg-[#3BD46F] bg-opacity-25 text-center">
                      <div className="font-bold text-xs tracking-[1px] uppercase text-[#42EC7C]">
                        all
                      </div>
                    </div>
                    <div className="text-xs tracking-[1px] uppercase text-[#D9D9D9]">
                      qualified
                    </div>
                  </div>
                </div>
              </>
            )}
            {stepInMission === "join" && (
              <>
                <div className="border-t border-dashed border-[#42EC7C] my-3.5"></div>
                <div className="flex items-center justify-between gap-1">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleSwtichStepInMission("selectCar")}
                  >
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
                    <div className="font-bold text-[#42EC7C] text-xs tracking-[1px] uppercase">
                      back to select car
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="border-t border-dashed border-[#42EC7C] my-3.5"></div>
            {stepInMission === "detail" && (
              <MissionAvailableDetail onSelectCar={handleSwtichStepInMission} />
            )}
            {stepInMission === "selectCar" && (
              <MissionAvailableSelectCar
                onSelectCar={handleSwtichStepInMission}
              />
            )}
            {stepInMission === "join" && <MissionAvailableJoin />}
          </div>
          {missionType === "available" && stepInMission === "detail" ? (
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
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-[101]" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="flex items-center justify-center min-h-screen text-white">
            <div>
              <div className="border border-[#42EC7C] rounded-t-xl border-b-0 bg-[rgba(0,0,0,0.7)] p-5 relative">
                <div className="absolute -top-6 -right-6">
                  <div
                    className={`w-12 h-12 border-2 border-[#42EC7C] bg-black hover:bg-gray-900 rounded-full flex items-center justify-center cursor-pointer`}
                    onClick={closeModal}
                  >
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20.7197 2.3125L2.31285 20.7194"
                        stroke={colorByMission[missionType]}
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M20.7197 20.7197L2.31286 2.31279"
                        stroke={colorByMission[missionType]}
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <img src={entryimage || imgGTicket} alt="" className="mx-auto my-2 max-w-[430px]" />
                  <div className="w-[490px]">
                    <div className="text-center font-bold tracking-[0.8px] leading-6">
                      THIS NFT IS REQUIRED FOR ENTRY INTO THIS MISSION.
                    </div>
                    <div className="text-center font-light tracking-[0.8px] text-sm leading-6">
                      {isValidToEnter ? (
                        <>You currently have {numOfTickets} matching NFTs in your wallet, you are cleared for entry into this mission!</>
                      ) : (
                        <>You currently have no matching NFTs in your wallet, please purchase a required NFT at the MCVerse Box Office.</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {isValidToEnter ? (
                <button
                  className="text-[#42EC7C] text-xl font-semibold text-center border border-[#42EC7C] rounded-b-xl bg-[rgba(0,0,0,0.7)] w-full py-4 hover:bg-opacity-90"
                  onClick={closeModal}
                >
                  CLOSE
                </button>
              ) : (
                <Link to={'/shop'}>
                  <button className="text-[#42EC7C] text-xl font-semibold text-center border border-[#42EC7C] rounded-b-xl bg-[rgba(0,0,0,0.7)] w-full py-4 hover:bg-opacity-90">
                    GO TO SHOP
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MissionDetail
