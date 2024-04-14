import { ShopIcon } from 'components/Icons'

const MissionAvailableDetail = ({ missionDetail, isValidToEnter, onSelectCar, onCheckEntryTickets }) => {
  const { meta } = missionDetail
  const { name, description, duration, ['Prize info']: prize } = JSON.parse(meta)
  return (
    <>
      <div className="font-bold text-xl tracking-[1px] text-[#42EC7C] uppercase">
        {/* AVALANCHE HILLS’ INAUGURAL STREET RACE */}
        {name || ''}
      </div>
      {/* <div className="mt-3 text-lg leading-none font-roboto">
        Place in the top 3 to receive an handsome reward.
      </div> */}
      <div className="mt-3 bg-[#42EC7C] bg-opacity-[15%] rounded-md p-3.5">
        <div className="text-[10px] tracking-[2px] text-[#42EC7C]">MISSION</div>
        <div className="mt-1 text-sm">{description || ''}</div>
      </div>
      <div className="grid grid-cols-3 gap-3.5 mt-3">
        <div
          className="bg-[#42EC7C] bg-opacity-[15%] rounded-md p-3.5 hover:border hover:border-[#42EC7C] cursor-pointer"
          onClick={onCheckEntryTickets}
        >
          <div className="text-[10px] tracking-[2px] text-[#42EC7C]">REQ.</div>
          <div className="flex items-center gap-3 mt-1">
            <div className="mt-1 text-sm font-bold uppercase">ticket</div>
            <span>
              <ShopIcon color={`#42EC7C`} />
            </span>
          </div>
        </div>
        <div className="bg-[#42EC7C] bg-opacity-[15%] rounded-md p-3.5">
          <div className="text-[10px] tracking-[2px] text-[#42EC7C]">REWARD</div>
          <div className="flex items-center gap-3 mt-1">
            <div className="mt-1 text-sm font-bold uppercase">{prize || ''}</div>
            <span>
              <ShopIcon color={`#42EC7C`} />
            </span>
          </div>
        </div>
        <div className="bg-[#42EC7C] bg-opacity-[15%] rounded-md p-3.5">
          <div className="text-[10px] tracking-[2px] text-[#42EC7C]">DURATION</div>
          <div className="mt-1 text-sm font-bold uppercase">{duration || ''}</div>
        </div>
      </div>
      {isValidToEnter ? (
        <button
          className="bg-[#42EC7C] hover:bg-[#258645] rounded-md flex items-center justify-center mt-3 text-black hover:text-white hover:font-medium w-full font-bold text-xl p-5"
          onClick={() => onSelectCar('selectCar')}
        >
          SELECT MY CAR
        </button>
      ) : (
        <button
          className="bg-[#42EC7C] hover:bg-[#258645] rounded-md flex items-center justify-center mt-3 text-black hover:text-white hover:font-medium w-full font-bold text-xl p-5"
          onClick={onCheckEntryTickets}
        >
          SELECT MY CAR
        </button>
      )}
    </>
  )
}

export default MissionAvailableDetail
