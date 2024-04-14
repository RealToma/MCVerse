import { useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'

import { TargetIcon, ShopIcon } from 'components/Icons'
// import imgCar from "../../../../../assets/image/muscle_car.png";
import { imgMuscleCarUrl, imgSuperCarUrl } from 'services/api'

const imgUrls = (id, type) => {
  return type === 'muscle' ? `${imgMuscleCarUrl}${id}` : `${imgSuperCarUrl}${id}`
}

const MissionAvailableJoin = ({ missionDetail, selectedTokenId, tokenType, onJoinMission }) => {
  // const isLoading = useSelector((state) => state.globalInfo.isLoading)
  // console.log('loading: ', isLoading)
  const { meta } = missionDetail
  const { name, duration, ['Prize info']: prize } = JSON.parse(meta)

  const handleJoinMission = () => {
    onJoinMission()
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <TargetIcon width={`35`} height={`35`} color={`#42EC7C`} />
        <div className="font-bold tracking-[1px]">{name || ''}</div>
      </div>
      <div className="mt-4 bg-[#42EC7C26] rounded-md py-3 px-4">
        <div className="text-[#42EC7C] text-xs tracking-[1px]">SELECTED CAR</div>
        <div className="flex items-center gap-3 mt-4">
          <img src={imgUrls(selectedTokenId, tokenType)} className="w-20 h-20 border border-white rounded-tr rounded-bl" alt="" />
          <div>
            <div className="text-lg leading-none tracking-[1px] font-bold">
              <span className="font-medium">#</span>
              {selectedTokenId}
            </div>
            {/* <div className="flex items-center gap-1 mt-4">
            <div className="flex items-center justify-center w-5 h-5 bg-[#F8511D] rounded-full">
              <BoostIcon width={`10`} height={`16`} />
            </div>
            <div className="text-sm leading-none tracking-[1px] text-[#F8511D]">
              LEVEL 4
            </div>
          </div> */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3.5 mt-3">
        <div className="bg-[#42EC7C] bg-opacity-[15%] rounded-md p-3.5">
          <div className="text-[10px] tracking-[2px] text-[#42EC7C]">COST</div>
          <div className="flex items-center gap-3 mt-1">
            <div className="mt-1 text-sm font-bold uppercase">ticket</div>
            <span>
              <ShopIcon color={`#42EC7C`} />
            </span>
          </div>
          {/* <div className="mt-1 text-sm text-[#42EC7C] uppercase font-bold">
            250 mcv
          </div> */}
        </div>
        <div className="bg-[#42EC7C] bg-opacity-[15%] rounded-md p-3.5">
          <div className="text-[10px] tracking-[2px] text-[#42EC7C]">REWARD</div>
          <div className="flex items-center gap-3 mt-1">
            <div className="mt-1 text-sm font-bold uppercase">{prize || ''}</div>
            <span>
              <ShopIcon color={`#42EC7C`} />
            </span>
          </div>
          {/* <div className="mt-1 text-sm font-bold uppercase">
            1,000 mcv
          </div> */}
        </div>
        <div className="bg-[#42EC7C] bg-opacity-[15%] rounded-md p-3.5">
          <div className="text-[10px] tracking-[2px] text-[#42EC7C]">DURATION</div>
          <div className="mt-1 text-sm font-bold uppercase">{duration || ''}</div>
        </div>
      </div>
      <div className="border-t border-dashed border-[#42EC7C] my-3.5"></div>
      <div className="mt-4 bg-[#42EC7C26] rounded-md p-3.5">
        <div className="text-[#42EC7C] text-xs tracking-[1px]">TERMS</div>
        <div className="mt-4 text-sm">
          This mission can only be completed ONCE per car. When mission ends, please go to{' '}
          <span className="text-[#00C2FF] font-bold">Completed Missions</span> to claim your rewards.{' '}
        </div>
      </div>
      <button
        className="bg-[#42EC7C] hover:bg-[#258645] rounded-md flex items-center justify-center mt-3 text-black hover:text-white hover:font-medium w-full font-bold text-xl p-5"
        onClick={() => handleJoinMission()}
      >
        {/* {isLoading ? <PulseLoader color="#FFF" size={10} className="px-6" /> : <>JOIN MISSION</>} */}
        JOIN MISSION
      </button>
    </>
  )
}

export default MissionAvailableJoin
