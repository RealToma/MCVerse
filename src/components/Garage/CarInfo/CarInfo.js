import { useState, useCallback } from 'react'

import CarDetail from './CarDetail'
import CarMods from './CarMods'
import CarParts from './CarParts'
import CarToolbox from './CarToolbox'
import './CarInfo.css'

const CarInfo = ({
  info,
  isUpgrading,
  isOpeningToolbox,
  isApplyingMods,
  handleHireMechanic,
  toolbox,
  mods,
  handleOpenToolboxes,
  handleApplyMods,
  newBoxOpenStatus,
  handleResetNewBoxStatus,
}) => {
  const { isNewBoxOpened, amountOfNewBox } = newBoxOpenStatus
  const [tab, setTab] = useState('earn')

  const handleClickTab = useCallback(
    (tab) => {
      setTab(tab)
      if (tab === 'mod') {
        handleResetNewBoxStatus()
      }
    },
    [handleResetNewBoxStatus]
  )

  return (
    <>
      {info ? (
        <div className="2xl:pr-[6vw]">
          <CarDetail info={info} />
          <div className="p-3 mt-2 bg-[#000F44] bg-opacity-60 border-[#80C9FF] border rounded-[10px]">
            <div className="flex items-center uppercase gap-9">
              <div
                className={`${
                  tab === 'earn' ? 'text-[#23D0FF] font-bold' : 'text-white font-medium'
                }  text-[10px] leading-3 tracking-[2px] text-shadow-blue cursor-pointer`}
                onClick={() => handleClickTab('earn')}
              >
                {info.type === 'muscle' ? 'parts' : 'pit crew'}
              </div>
              <div
                className={`${
                  tab === 'mod' ? 'text-[#23D0FF] font-bold' : 'text-white font-medium'
                } text-[10px] leading-3 tracking-[2px] text-shadow-blue cursor-pointer flex items-center gap-1`}
                onClick={() => handleClickTab('mod')}
              >
                mods
                {isNewBoxOpened && (
                  <div className="border border-[#FFAE00] px-1 min-w-[16px] min-h-[16px] text-center rounded-full text-[10px] text-[#FFAE00] flex items-center justify-center">
                    {amountOfNewBox}
                  </div>
                )}
              </div>
              <div
                className={`${
                  tab === 'toolbox' ? 'text-[#23D0FF] font-bold' : 'text-white font-medium'
                } text-[10px] leading-3 tracking-[2px] text-shadow-blue cursor-pointer`}
                onClick={() => handleClickTab('toolbox')}
              >
                toolboxes
              </div>
            </div>
            <div className="my-3 border-b border-white border-dashed"></div>
            {tab === 'earn' && <CarParts info={info} isUpgrading={isUpgrading} handleHireMechanic={handleHireMechanic} />}
            {tab === 'mod' && (
              <CarMods
                isApplyingMods={isApplyingMods}
                mods={info.type === 'muscle' ? mods.muscle : mods.super}
                handleApplyMods={handleApplyMods}
                nfvType={info.type}
                isNewBoxOpened={isNewBoxOpened}
              />
            )}
            {tab === 'toolbox' && (
              <CarToolbox
                isOpeningToolbox={isOpeningToolbox}
                toolbox={info.type === 'muscle' ? toolbox.muscle : toolbox.super}
                handleOpenToolboxes={handleOpenToolboxes}
                nfvType={info.type}
              />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default CarInfo
