import { PowerIcon, BoostIcon, TiresIcon, HandlingIcon } from 'components/Icons'
import { imgMuscleCarUrl, imgSuperCarUrl } from 'services/api'
import * as Images from 'utils/helper/image.helper'

const imgUrls = (id, type) => {
  return type === 'muscle' ? `${imgMuscleCarUrl}${id}` : `${imgSuperCarUrl}${id}`
}
const part = (isHired, type, level) =>
  isHired ? (
    <div className="relative w-14 h-7 py-2 text-white text-center text-opacity-40 text-[10px] leading-3 tracking-[0.5px] uppercase">
      {type} {level}
      <img src={Images.iconCheck} alt="" className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
    </div>
  ) : (
    <div className="w-14 h-7 py-2 text-cyan text-center text-opacity-50 text-[10px] leading-3 tracking-[0.5px] uppercase">
      {type} {level}
    </div>
  )
const imgTokens = {
  muscle: Images.iconAhill,
  super: Images.iconGville,
}
const imgLogos = {
  muscle: Images.logoMuscleCar,
  super: Images.logoSuperCar,
}
const partNames = {
  muscle: 'stage',
  super: 'tier',
}

const CarDetail = ({ info }) => {
  const { id, earnInfo, modsInfo, type } = info

  return (
    <>
      <div className="flex items-center justify-between px-2 py-1">
        <div className="text-white text-2xl leading-3 tracking-[1px] text-shadow-blue">
          # <span className="font-bold">{id}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <img src={imgTokens[type]} className="w-5" alt="token" />
          <img src={imgLogos[type]} className="w-40" alt="nfv_label" />
        </div>
      </div>
      <div className="p-3 mt-1 bg-gradient-blue border-cyan-50 border rounded-[10px] md:flex gap-4">
        <img src={imgUrls(id, type)} className="w-64 h-64 mx-auto mb-2 rounded-md md:m-0" alt="super_car" />
        <div className="w-full">
          <div className="flex justify-center gap-6 md:justify-start">
            <div>
              <div className="text-white text-xs leading-3 tracking-[2px] text-shadow-blue uppercase">earning:</div>
              <div className="text-cyan text-lg leading-3 font-bold tracking-[2px] text-shadow-blue uppercase mt-2">
                {earnInfo.earnSpeed}/day
              </div>
            </div>
            <div>
              <div className="text-white text-xs leading-3 tracking-[2px] text-shadow-blue uppercase">earned ytd:</div>
              <div className="text-cyan text-lg leading-3 font-bold tracking-[2px] text-shadow-blue uppercase mt-2">
                {Math.floor(earnInfo.totalClaimed).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-white text-xs leading-3 tracking-[2px] text-shadow-blue uppercase">mcv to claim:</div>
              <div className="text-cyan text-lg leading-3 font-bold tracking-[2px] text-shadow-blue uppercase mt-2">
                {Math.floor(earnInfo.claimable).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="my-3 border-b border-white border-dashed"></div>
          <div className="flex flex-col justify-center px-2 mx-auto md:px-0 md:space-x-6 md:flex-row md:justify-start 2xl:space-x-2">
            <div className="mx-auto md:mx-0">
              <div className="text-[10px] text-white leading-3 tracking-[2px] uppercase">performance</div>
              <div className="flex items-center gap-2 border-violet border rounded-full font-roboto my-2 pr-2">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-violet">
                  <PowerIcon width={24} height={24} />
                </div>
                <div className="text-[10px] text-white leading-7 uppercase">level</div>
                <div className="text-lg font-bold text-violet leading-7 tracking-[1px]">{modsInfo ? modsInfo.power : 0}</div>
              </div>
              <div className="flex items-center gap-2 border-cyan-700 border rounded-full font-roboto my-2 pr-2">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-cyan-700">
                  <HandlingIcon width={24} height={24} />
                </div>
                <div className="text-[10px] text-white leading-7 uppercase">level</div>
                <div className="text-base font-bold text-cyan-700 leading-7 tracking-[1px]">{modsInfo ? modsInfo.handling : 0}</div>
              </div>
              <div className="flex items-center gap-2 border-red-600 border rounded-full font-roboto my-2 pr-2">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600">
                  <BoostIcon width={18} height={24} />
                </div>
                <div className="text-[10px] text-white leading-7 uppercase">level</div>
                <div className="text-base font-bold text-red-600 leading-7 tracking-[1px]">{modsInfo ? modsInfo.boost : 0}</div>
              </div>
              <div className="flex items-center gap-2 border-green-400 border rounded-full font-roboto my-2 pr-2">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-green-400">
                  <TiresIcon width={24} height={24} />
                </div>
                <div className="text-[10px] text-white leading-7 uppercase">level</div>
                <div className="text-base font-bold text-green-400 leading-7 tracking-[1px]">{modsInfo ? modsInfo.tires : 0}</div>
              </div>
            </div>
            <div className="mx-auto md:mx-0">
              <div className="text-[10px] text-white leading-3 tracking-[2px] uppercase">{type === 'muscle' ? 'parts' : 'pit crew'}</div>
              <div className="flex items-center gap-2 my-2 border-b border-cyan-600 border-dashed pb-2 w-fit">
                {type === 'super' ? <img src={Images.iconCrewChief} className="w-5" alt="icon_crew_chief" /> : <></>}
                {part(earnInfo.stage > 0, partNames[type], 1)}
                {part(earnInfo.stage > 4, partNames[type], 2)}
                {part(earnInfo.stage > 8, partNames[type], 3)}
              </div>
              <div className="flex items-center gap-2 my-2 border-b border-cyan-600 border-dashed pb-2 w-fit">
                {type === 'super' ? <img src={Images.iconMechnic} className="w-5" alt="icon_crew_chief" /> : <></>}
                {part(earnInfo.stage > 1, partNames[type], 1)}
                {part(earnInfo.stage > 5, partNames[type], 2)}
                {part(earnInfo.stage > 9, partNames[type], 3)}
              </div>
              <div className="flex items-center gap-2 my-2 border-b border-cyan-600 border-dashed pb-2 w-fit">
                {type === 'super' ? <img src={Images.iconTirechanger} className="w-5" alt="icon_crew_chief" /> : <></>}
                {part(earnInfo.stage > 2, partNames[type], 1)}
                {part(earnInfo.stage > 6, partNames[type], 2)}
                {part(earnInfo.stage > 10, partNames[type], 3)}
              </div>
              <div className="flex items-center gap-2 my-2">
                {type === 'super' ? <img src={Images.iconGasman} className="w-5" alt="icon_crew_chief" /> : <></>}
                {part(earnInfo.stage > 3, partNames[type], 1)}
                {part(earnInfo.stage > 7, partNames[type], 2)}
                {part(earnInfo.stage > 11, partNames[type], 3)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CarDetail
