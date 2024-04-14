import React, { useState, useCallback, useEffect } from 'react'

import { ShopIcon, TargetIcon } from 'components/Icons'

const MissionIcon = ({ info, handleClick, isShowDetail, index }) => {
  const { name, duration, x, y, icon, ['Prize info']: prize } = info ? JSON.parse(info.meta) : ''
  const { id } = info ? info : ''
  const [isClicked, setIsClicked] = useState(false)

  const handleClickIcon = useCallback(() => {
    setIsClicked(true)
    handleClick(id, index)
  }, [handleClick, id, index])

  useEffect(() => {
    if (!isShowDetail) setIsClicked(false)
  }, [isShowDetail])
  console.log('mission position: ', x, y, id)
  if (!info) return <></>
  return (
    <div
      className="absolute z-10"
      style={{
        top: `${parseInt((y / 746) * 100)}%`,
        left: `${parseInt((x / 1298) * 100)}%`,
      }}
    >
      {isClicked ? (
        <div className="w-12 h-12 bg-[rgb(66,236,124)] border-2 border-white rounded-full flex items-center justify-center p-0.5 relative">
          <img src={icon} alt="" className="w-9 h-9" />
          {/* <TargetIcon color={`#1C2653`} width={`36`} height={`36`} /> */}
          <div className="w-[60px] h-[60px] bg-[rgba(66,136,124,0.3)] rounded-full absolute -z-20"></div>
          <div className="w-[72px] h-[72px] bg-[rgba(66,136,124,0.3)] rounded-full absolute -z-10"></div>
        </div>
      ) : (
        <div
          className="w-6 h-6 bg-[rgb(66,236,124)] rounded-md flex items-center justify-center p-0.5 relative group cursor-pointer"
          onClick={handleClickIcon}
        >
          {/* <TargetIcon color={`#1C2653`} /> */}
          <img src={icon} alt="" />

          {/* <div className="w-5 h-5 bg-[#00C2FF] border border-black rounded-full flex items-center justify-center text-black text-sm font-bold absolute -top-3 -right-3 group-hover:hidden">
            4
          </div>
          <div className="w-5 h-5 bg-[#FFC33E] border border-black rounded-full flex items-center justify-center text-black text-sm font-bold absolute -bottom-3 -right-3 group-hover:hidden">
            4
          </div> */}
          <div className="w-8 h-8 bg-[rgba(66,136,124,0.3)] rounded-md absolute group-hover:block hidden -z-20"></div>
          <div className="w-10 h-10 bg-[rgba(66,136,124,0.3)] rounded-md absolute group-hover:block hidden -z-10"></div>
          <div className="absolute top-0 hidden left-9 group-hover:block">
            <div className="bg-black bg-opacity-90 border border-[#42EC7C] rounded-md border-l-[10px] p-2 w-36 relative">
              {/* <div className="w-5 h-5 bg-black border border-[#00C2FF] rounded-full flex items-center justify-center text-[#00C2FF] text-sm font-bold absolute top-1/2 -right-2.5">
                4
              </div>
              <div className="w-5 h-5 bg-black border border-[#FFC33E] rounded-full flex items-center justify-center text-[#FFC33E] text-sm font-bold absolute top-3/4 -right-2.5">
                4
              </div> */}
              <div className="text-[#42EC7C] font-bold text-[10px] uppercase">
                {name || 'DEMO MISSION'}
                {/* GRANTSVILLE DOWNS ADRENALINE RUSH */}
                {/* {info ? JSON.parse(info.meta).name : ""} */}
              </div>
              <div className="mt-2 uppercase text-[10px] flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <ShopIcon color={`#42EC7C`} width={12} height={12} />
                  <div>ticket</div>
                </div>
                <div className="flex items-center gap-1">
                  <ShopIcon color={`#42EC7C`} width={12} height={12} />
                  <div>{prize}</div>
                </div>
                {/* <div className="flex items-center gap-1">
                  <svg
                    width="12"
                    height="11"
                    viewBox="0 0 12 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.31514 3.06147C4.26867 2.97646 4.26867 2.87288 4.31514 2.78807L5.77494 0.126899C5.86769 -0.0422998 6.1322 -0.0422998 6.22475 0.126899L7.68475 2.78828C7.73122 2.87308 7.73122 2.97667 7.68475 3.06168C7.63828 3.14648 7.55259 3.19827 7.45985 3.19827H4.54004C4.4473 3.19827 4.36161 3.14628 4.31514 3.06168V3.06147ZM2.49298 6.92932H9.5073C9.60024 6.92932 9.68593 6.87732 9.7322 6.79272C9.77867 6.70792 9.77867 6.60413 9.7322 6.51932L8.45847 4.19758C8.412 4.11277 8.32632 4.06098 8.23357 4.06098H3.76749C3.67475 4.06098 3.58867 4.11298 3.54259 4.19758L2.26847 6.51932C2.222 6.60413 2.222 6.70792 2.26847 6.79272C2.31455 6.87712 2.40024 6.92932 2.49318 6.92932H2.49298ZM11.9653 10.59L10.5053 7.92904C10.4589 7.84423 10.3732 7.79244 10.2804 7.79244H1.71985C1.6271 7.79244 1.54122 7.84444 1.49494 7.92904L0.0349445 10.59C-0.0115261 10.6748 -0.0115261 10.7786 0.0349445 10.8634C0.0814151 10.9482 0.167101 11 0.259846 11H11.7402C11.833 11 11.9189 10.948 11.9651 10.8634C12.0112 10.7786 12.0116 10.6746 11.9651 10.59H11.9653Z"
                      fill="#42EC7C"
                    />
                  </svg>
                  <div>level 10</div>
                </div> */}
                <div className="flex items-center gap-1">
                  <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.36115 4.75313C7.14462 4.02773 8.20385 3.04664 8.30054 0.703125H8.65385C8.84492 0.703125 9 0.545625 9 0.351562C9 0.1575 8.84492 0 8.65385 0H0.346154C0.155077 0 0 0.1575 0 0.351562C0 0.545625 0.155077 0.703125 0.346154 0.703125H0.699462C0.795923 3.04688 1.85538 4.02773 2.63885 4.75313C3.16431 5.23969 3.46154 5.53758 3.46154 6C3.46154 6.46242 3.16431 6.76031 2.63885 7.24688C1.85538 7.97227 0.796154 8.95336 0.699462 11.2969H0.346154C0.155077 11.2969 0 11.4544 0 11.6484C0 11.8425 0.155077 12 0.346154 12H8.65385C8.84492 12 9 11.8425 9 11.6484C9 11.4544 8.84492 11.2969 8.65385 11.2969H8.30054C8.20408 8.95312 7.14462 7.97227 6.36115 7.24688C5.83569 6.76031 5.53846 6.46242 5.53846 6C5.53846 5.53758 5.83569 5.23969 6.36115 4.75313ZM4.15385 8.26547C4.15385 8.47148 4.02877 8.65383 3.84138 8.73211C3.84046 8.73258 3.83931 8.73305 3.83838 8.73352L1.71808 9.62461C2.06423 8.73047 2.622 8.21391 3.10523 7.76625C3.64454 7.2668 4.15385 6.79523 4.15385 5.99977V8.26547ZM5.89477 7.76625C6.378 8.21367 6.93577 8.73047 7.28192 9.62438L5.16162 8.73328C5.16162 8.73328 5.15954 8.73234 5.15862 8.73187C4.971 8.65359 4.84615 8.47125 4.84615 8.26523V5.99953C4.84615 6.79477 5.35546 7.26656 5.89477 7.76602V7.76625ZM1.60662 2.04867C1.49331 1.66781 1.41646 1.22508 1.39269 0.703125H7.60754C7.58377 1.22531 7.50692 1.66781 7.39362 2.04867C7.34169 2.22352 7.18385 2.34375 7.00385 2.34375H1.99615C1.81638 2.34375 1.65854 2.22352 1.60638 2.04867H1.60662Z"
                      fill="#42EC7C"
                    />
                  </svg>
                  <div> {duration || '1 hours'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MissionIcon
