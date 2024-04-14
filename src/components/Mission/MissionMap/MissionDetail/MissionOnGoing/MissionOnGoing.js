import React from 'react'

import { BoostIcon, ClockIcon } from 'components/Icons'
import { carAddress } from 'contracts/address'
// import imgCar from "../../../../../assets/image/super_car.png";
// import { logoMCV } from "../../../../../utils/helper/image.helper";
import { imgMuscleCarUrl, imgSuperCarUrl } from 'services/api'

const imgUrls = (id, type) => {
  return type === 'muscle' ? `${imgMuscleCarUrl}${id}` : `${imgSuperCarUrl}${id}`
}

const remainSecondsToHMS = (value) => {
  const sec = parseInt(value, 10) // convert seconds to number if it's string
  let hours = Math.floor(sec / 3600) // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60) // get minutes
  let seconds = sec - hours * 3600 - minutes * 60 //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return hours + ':' + minutes + ':' + seconds // Return is HH : MM : SS
}

const MissionOnGoing = ({ nowTime, missionId, missionDetail, missionType, missionEntries, onChangeMissionType }) => {
  const tokenType = missionDetail.qualifyingNft === carAddress ? 'muscle' : 'super'
  const onGoingEntries = missionEntries.filter((item) => item.inMission && item.missionEndsAt.toString() >= nowTime)

  const { meta } = missionDetail
  const { name } = JSON.parse(meta)

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between gap-1 px-4">
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
      <div className="border-t border-dashed border-[#FFC33E] my-3.5 mx-4"></div>
      <div className="font-bold text-xl tracking-[1px] text-[#FFC33E] uppercase px-4">
        {/* AVALANCHE HILLS IN INAUGURAL STREET RACE */}
        {name || ''}
      </div>
      <div className="border-t border-dashed border-[#FFC33E] my-3.5 mx-4"></div>
      <div dir="rtl" className="pr-4 overflow-y-auto h-[400px]">
        {onGoingEntries.map((item, index) => (
          <div dir="ltr" className="pt-2 mb-3.5 pb-5 border-b border-dashed border-[#FFC33E] ml-4" key={index}>
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
                  </div>
                </div>
                <div className="mt-2 mb-1 rounded-md bg-[#F0B62C33] p-1.5 flex items-center gap-1">
                  <div className="text-[10px] tracking-[2px] text-[#F0B62C]">STATUS:</div>
                  <ClockIcon color={`#F0B62C`} />
                  <div className="font-bold leading-tight text-[#FFC33E]">
                    {remainSecondsToHMS(+item.missionEndsAt.toString() - nowTime)}
                  </div>
                </div>
                <div className="mt-1 rounded-md bg-[#FFC33E78] p-1.5 text-center font-bold text-xs text-black">UNAVAILABLE</div>
              </div>
              <div className="rounded-md bg-[#F0B62C33] p-1.5 flex flex-col gap-2">
                <div className="grid items-center grid-cols-12 gap-2">
                  <div className="col-span-7 text-[10px] text-right tracking-[1px] text-[#F0B62C] uppercase"># of times completed</div>
                  <div className="col-span-5 font-bold">{item.completionCounts[missionId].toString()}</div>
                </div>
                {/* <div className="grid items-center grid-cols-12 gap-2">
                <div className="col-span-7 text-[10px] text-right tracking-[1px] text-[#F0B62C] uppercase">
                  max potential reward
                </div>
                <div className="flex items-center col-span-5 gap-1">
                  <img src={logoMCV} alt="" className="w-4 h-4" />
                  <div className="font-bold">150</div>
                </div>
              </div>
              <div className="grid items-center grid-cols-12 gap-2">
                <div className="col-span-7 text-[10px] text-right tracking-[1px] text-[#F0B62C] uppercase">
                  total mission earning
                </div>
                <div className="flex items-center col-span-5 gap-1">
                  <img src={logoMCV} alt="" className="w-4 h-4" />
                  <div className="font-bold">9,999</div>
                </div>
              </div>
              <div className="grid items-center grid-cols-12 gap-2">
                <div className="col-span-7 text-[10px] text-right tracking-[1px] text-[#F0B62C] uppercase">
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

export default MissionOnGoing
