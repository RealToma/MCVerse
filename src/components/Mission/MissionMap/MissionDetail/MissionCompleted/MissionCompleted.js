import React from 'react'

import { BoostIcon, CheckCircleIcon, SnowIcon } from 'components/Icons'
import { carAddress } from 'contracts/address'
// import imgCar from "../../../../../assets/image/super_car.png";
// import { logoMCV } from "../../../../../utils/helper/image.helper";
import { imgMuscleCarUrl, imgSuperCarUrl } from 'services/api'

const imgUrls = (id, type) => {
  return type === 'muscle' ? `${imgMuscleCarUrl}${id}` : `${imgSuperCarUrl}${id}`
}

const MissionCompleted = ({
  nowTime,
  missionId,
  missionDetail,
  missionType,
  missionEntries,
  onChangeMissionType,
  onCompleteMission,
  onEnterMission,
}) => {
  const tokenType = missionDetail.qualifyingNft === carAddress ? 'muscle' : 'super'
  const onCompletedEntries = missionEntries.filter(
    (item) =>
      (item.inMission && item.missionEndsAt.toString() < nowTime) || (!item.inMission && +item.completionCounts[missionId].toString() > 0)
  )

  const { meta } = missionDetail
  const { name } = JSON.parse(meta)

  const handleCompleteMission = (tokenId) => {
    onCompleteMission(missionId, missionDetail.qualifyingNft, tokenId)
  }
  const handleStartMission = (tokenId) => {
    onEnterMission(missionId, missionDetail.qualifyingNft, tokenId)
  }
  return (
    <div className="px-8 py-4">
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
      <div className="border-t border-dashed border-[#26B3F9] my-3.5"></div>
      <div className="font-bold text-xl tracking-[1px] text-[#26B3F9] uppercase">
        {/* AVALANCHE HILLS IN INAUGURAL STREET RACE */}
        {name || ''}
      </div>
      <div className="border-t border-dashed border-[#26B3F9] my-3.5"></div>
      <div className="pr-4 overflow-y-auto h-[400px]">
        {onCompletedEntries.map((item, index) => (
          <div className="pt-2 mb-3.5 pb-5 border-b border-dashed border-[#26B3F9]" key={index}>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="flex gap-4">
                  <div className="flex-none bg-gray-700 rounded-lg">
                    <img src={imgUrls(item.tokenId, tokenType)} alt="car" className="w-20 h-20 rounded-lg" loading="lazy" />
                  </div>
                  <div>
                    <div className="text-lg leading-none font-roboto">#{item.tokenId}</div>
                    {/* <div className="flex items-center gap-1 mt-2">
                      <div className="flex items-center justify-center w-5 h-5 bg-[#F8511D] rounded-full">
                        <BoostIcon width={`10`} height={`16`} />
                      </div>
                      <div className="text-sm leading-none tracking-[1px] text-[#F8511D] font-bold">
                        LEVEL 4
                      </div>
                    </div> */}
                    <div className="flex items-center justify-between gap-1 mt-2">
                      {item.inMission ? (
                        <button
                          className="bg-[#26B3F9] rounded py-0.5 px-5 text-[#1E1E1E] text-xs"
                          onClick={() => handleCompleteMission(item.tokenId)}
                        >
                          CLAIM
                        </button>
                      ) : (
                        <div className="bg-[#26B3F9] bg-opacity-60 rounded py-0.5 px-3 text-[#1E1E1E] text-xs">CLAIMED</div>
                      )}
                      <svg width="21" height="6" viewBox="0 0 21 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 3L16 0.113249V5.88675L21 3ZM0 3.5H16.5V2.5H0V3.5Z" fill="#26B3F9" />
                      </svg>
                    </div>
                  </div>
                </div>
                {item.inMission ? (
                  <>
                    <div className="mt-2 mb-1 rounded-md bg-[#26B3F933] p-1.5 flex items-center gap-1">
                      <div className="text-[10px] tracking-[2px] text-[#26B3F9]">STATUS:</div>
                      <SnowIcon color={`#26B3F9`} />
                      {/* <div className="font-bold leading-tight text-[#26B3F9]">
                        12:12:23
                      </div> */}
                    </div>
                    <div className="mt-1 rounded-md bg-[#26B3F95E] p-1.5 text-center text-xs">COMPLETED</div>
                  </>
                ) : (
                  <>
                    <div className="mt-2 mb-1 rounded-md bg-[#044219] p-1.5 flex items-center gap-1">
                      <div className="text-[10px] tracking-[2px] text-[#42EC7C]">STATUS:</div>
                      <CheckCircleIcon color={`#42EC7C`} />
                      <div className="font-bold leading-tight text-[#42EC7C]">READY</div>
                    </div>
                    <div
                      className="mt-1 rounded-md bg-[#42EC7C] p-1.5 text-center text-xs text-[#044219] cursor-pointer"
                      onClick={() => handleStartMission(item.tokenId)}
                    >
                      START MISSION
                    </div>
                  </>
                )}
              </div>
              <div className="rounded-md bg-[#26B3F933] p-1.5 flex flex-col gap-2">
                <div className="grid items-center grid-cols-12 gap-2">
                  <div className="col-span-7 text-[10px] text-right tracking-[1px] text-[#26B3F9] uppercase"># of times completed</div>
                  <div className="col-span-5 font-bold">{item.completionCounts[missionId].toString()}</div>
                </div>
                {/* <div className="grid items-center grid-cols-12 gap-2">
                  <div className="col-span-7 text-[10px] text-right tracking-[1px] text-[#26B3F9] uppercase">
                    max potential reward
                  </div>
                  <div className="flex items-center col-span-5 gap-1">
                    <img src={logoMCV} alt="" className="w-4 h-4" />
                    <div className="font-bold">150</div>
                  </div>
                </div>
                <div className="grid items-center grid-cols-12 gap-2">
                  <div className="col-span-7 text-[10px] text-right tracking-[1px] text-[#26B3F9] uppercase">
                    total mission earning
                  </div>
                  <div className="flex items-center col-span-5 gap-1">
                    <img src={logoMCV} alt="" className="w-4 h-4" />
                    <div className="font-bold">9,999</div>
                  </div>
                </div>
                <div className="grid items-center grid-cols-12 gap-2">
                  <div className="col-span-7 text-[10px] text-right tracking-[1px] text-[#26B3F9] uppercase">
                    recent mission completion
                  </div>
                  <div className="col-span-5 text-xs">6/22 @ 12:00</div>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MissionCompleted
