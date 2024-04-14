import React from 'react'

import { imgMuscleCarUrl, imgSuperCarUrl } from 'services/api'
import * as Images from 'utils/helper/image.helper'

const imgUrls = (id, type) => {
  return type === 'muscle' ? `${imgMuscleCarUrl}${id}` : `${imgSuperCarUrl}${id}`
}

const GarageGridView = ({ nfv, selectedCarInfo, handleClaim, handleSelectCar }) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-3 3xl:grid-cols-4 overflow-auto max-h-[50vh]">
      {nfv.map((item, index) => (
        <div
          className={
            selectedCarInfo
              ? selectedCarInfo.id === item.id
                ? 'relative bg-gradient-to-b from-[rgba(255,174,0,0.5)] to-[rgba(4,36,45,0.5)] border border-amber-600 rounded mt-5'
                : 'relative bg-gradient-blue hover:bg-cyan-200 hover:bg-opacity-20 border border-cyan-50 rounded mt-5 cursor-pointer'
              : undefined
          }
          key={`car_${index}`}
          onClick={() => handleSelectCar(item.id, item.type)}
        >
          <div className="absolute z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 bg-black border border-white rounded-full w-9 h-9 left-1/2">
            <img src={Images.iconAhill} alt="" className="w-6 h-6" />
          </div>
          <div className="p-2.5">
            <div
              className={`${
                selectedCarInfo ? (selectedCarInfo.id === item.id ? 'border-amber-600' : 'border-white') : null
              } border border-white bg-gray-100 rounded-[3px] relative`}
            >
              <img src={imgUrls(item.id, item.type)} alt="car" className="rounded-[3px]" loading="lazy" />
              <img
                src={selectedCarInfo ? (selectedCarInfo.id === item.id ? Images.bgIdActive : Images.bgId) : Images.bgId}
                alt=""
                className="absolute -bottom-[1px] -translate-x-1/2 left-1/2 min-w-[72px]"
                loading="lazy"
              />
              <div
                className={`${
                  selectedCarInfo ? (selectedCarInfo.id === item.id ? 'text-amber-600' : 'text-white') : null
                } absolute text-center flex justify-center items-center w-full bottom-0 text-[10px] tracking-[0.5px]`}
              >
                #{item.id}
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between gap-1 py-0.5">
                <div className="text-[9px] leading-3 text-white text-opacity-60">Earning</div>
                <div className="font-bold text-[10px] leading-3 text-right tracking-[0.5px] text-white">{item.earnSpeed}/DAY</div>
              </div>
              <div className="flex justify-between gap-1 py-0.5">
                <div className="text-[9px] leading-3 text-white text-opacity-60">To Claim</div>
                <div className="font-bold text-[10px] leading-3 text-right tracking-[0.5px] text-cyan-200">
                  {item.claimable.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-between gap-1 py-0.5">
                <div className="text-[9px] leading-3 text-white text-opacity-60">Locked</div>
                <div className="font-bold text-[10px] leading-3 text-right tracking-[0.5px] text-white">
                  {item.lockedTotal.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-between gap-1 py-0.5">
                <div className="text-[9px] leading-3 text-white text-opacity-60">Unlocked</div>
                <div className="font-bold text-[10px] leading-3 text-right tracking-[0.5px] text-white">
                  {item.unlockedClaimable.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <button className="bg-cyan-200 rounded-bl-[3px] flex justify-center items-center gap-0.5 py-2" onClick={() => handleClaim()}>
              <img src={Images.iconActionBankBlack} alt="" className="w-4 h-4" />
              <div className="text-[10px] font-bold leading-3 text-center tracking-[0.5px] text-black">CLAIM</div>
            </button>
            <button className="bg-black rounded-br-[3px] flex justify-center items-center gap-0.5 py-2">
              <img src={Images.iconActionNft} alt="" className="w-4 h-4" />
              <div className="text-[10px] leading-3 text-center tracking-[0.5px] text-white">MARKET</div>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GarageGridView
