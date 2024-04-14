import { useState, useEffect, useCallback, Fragment } from 'react'

import { PulseLoader } from 'react-spinners'

import iconAlertBlue from 'assets/svg/icon-alert-md.svg'
import { memberLabel, members } from 'components/Garage/constants'
import { LockIcon } from 'components/Icons'
import * as Images from 'utils/helper/image.helper'

const crewIcons = {
  'crew chief': Images.iconGCrew,
  mechanic: Images.iconGMechanic,
  tirechanger: Images.iconGTirechanger,
  gasman: Images.iconGGasman,
}

const partIcons = {
  intake: Images.iconIntake,
  cams: Images.iconCams,
  headers: Images.iconHeaders,
  converter: Images.iconConverter,
  'tuner kit': Images.iconTunerkit,
  injectors: Images.iconInjector,
  nos: Images.iconNos,
  'trans brake': Images.iconTransbrake,
  'race slicks': Images.iconRaceslicks,
  calipers: Images.iconCalipers,
  'roll cage': Images.iconRollcage,
  exhaust: Images.iconExhaust,
}

const earnIcons = {
  super: crewIcons,
  muscle: partIcons,
}

const CarParts = ({ info, isUpgrading, handleHireMechanic }) => {
  const { earnInfo, id, type } = info

  const [numOfSelects, setNumOfSelects] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  const handleSelect = useCallback(
    (cost) => {
      const currentNum = numOfSelects
      setNumOfSelects(currentNum + 1)
      const newCost = totalCost + +cost
      setTotalCost(newCost)
    },
    [numOfSelects, totalCost]
  )
  const handleUnSelect = useCallback(
    (cost) => {
      const currentNum = numOfSelects === 0 ? 1 : numOfSelects
      setNumOfSelects(currentNum - 1)
      const newCost = totalCost - +cost > 0 ? totalCost - +cost : 0
      setTotalCost(newCost)
    },
    [numOfSelects, totalCost]
  )
  const handleBuyParts = useCallback(() => {
    handleHireMechanic(id, numOfSelects, type)
  }, [handleHireMechanic, id, numOfSelects, type])

  useEffect(() => {
    if (!isUpgrading) {
      setNumOfSelects(0)
      setTotalCost(0)
    }
  }, [isUpgrading])

  return (
    <div className="flex flex-col justify-between px-1 overflow-auto xl:flex-row">
      <div className="flex-grow h-full">
        {!earnInfo.isHired && (
          <div className="flex items-center bg-cyan-600 bg-opacity-10 border border-cyan-600 rounded-tr-lg rounded-bl-lg p-2 mb-4">
            <img src={iconAlertBlue} alt="icon-alert" />
            <div className="text-white text-[10px]" style={{ textShadow: '0px 0px 3px #00A3FF' }}>
              You must {type === 'muscle' ? 'hire a mechanic' : 'unlock a pit crew'} before you can start earning more with your vehicle.
            </div>
          </div>
        )}
        {earnInfo.isHired ? (
          <div className="flex justify-between px-4 py-2 uppercase bg-black bg-opacity-50 xl:hidden rounded-tr-2xl">
            <div>
              <div className="text-white text-[10px] tracking-[1.6px] text-shadow-blue">
                {type === 'muscle' ? 'parts' : 'crew'} selected
              </div>
              {numOfSelects > 0 ? (
                <div className="text-cyan-200 text-xl font-bold font-roboto">
                  {numOfSelects}{' '}
                  <span className="text-sm font-normal text-gray-400 whitespace-nowrap">({totalCost.toLocaleString()} mcv)</span>
                </div>
              ) : (
                <div className="text-xl font-bold text-gray-400 font-roboto">0</div>
              )}
            </div>
            {numOfSelects > 0 ? (
              <>
                {isUpgrading ? (
                  <div
                    className={`text-[10px] w-20 text-cyan-600 font-semibold bg-cyan-600 border border-white rounded-tr-lg rounded-bl-lg flex items-center justify-center px-2 py-1 tracking-[1px] cursor-not-allowed self-stretch`}
                  >
                    <PulseLoader color="#ffffff" size={8} />
                  </div>
                ) : (
                  <div
                    className={`text-[10px] text-white font-semibold bg-cyan-600 hover:bg-blue-500 border border-white rounded-tr-lg rounded-bl-lg flex items-center justify-center px-2 py-1 tracking-[1px] cursor-pointer self-stretch`}
                    onClick={() => handleBuyParts()}
                  >
                    {type === 'muscle' ? 'buy parts' : 'hire crew'}
                  </div>
                )}
              </>
            ) : (
              <div className="text-[10px] text-white font-semibold opacity-50 border border-white rounded-tr-lg rounded-bl-lg flex items-center justify-center px-2 py-1 tracking-[1px] self-stretch">
                {type === 'muscle' ? 'buy parts' : 'hire crew'}
              </div>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className={`xl:hidden bg-black bg-opacity-50 rounded-br-2xl border-t-2 border-cyan-600 uppercase py-2 px-4 mb-4`}>
          <div className="flex justify-between">
            <div>
              <div className="text-white text-[10px] tracking-[1.6px] text-shadow-blue">{memberLabel[type]}</div>
              <div className="flex items-center">
                {earnInfo.isHired ? (
                  <div className={`text-cyan-600 text-base font-bold`}>hired</div>
                ) : (
                  <>
                    <img src={iconAlertBlue} alt="icon-alert" className="w-6" />
                    <div className="text-cyan-200 text-base font-bold">needed</div>
                  </>
                )}
              </div>
            </div>
            <div>
              <div className="text-white text-[10px] tracking-[1.6px]" style={{ textShadow: '0px 0px 3px #00A3FF' }}>
                {type === 'muscle' ? 'parts installed' : 'crew hired'}
              </div>
              <div className="text-cyan-200 text-base font-bold font-roboto">{earnInfo.stage}</div>
            </div>
            <div>
              <div className="text-white text-[10px] tracking-[1.6px]" style={{ textShadow: '0px 0px 3px #00A3FF' }}>
                earning
              </div>
              <div className="text-cyan-200 text-base font-bold font-roboto">{earnInfo.earnSpeed}/day</div>
            </div>
          </div>
          {!earnInfo.isHired ? (
            <>
              <div className="w-full h-px border-t border-gray border-dashed my-1"></div>
              <div className="flex justify-between">
                <div className="flex flex-col justify-between text-[10px] tracking-[1px]">
                  <div className="text-white text-shadow-blue">cost:</div>
                  <div className="text-cyan-600 font-bold">{type === 'muscle' ? '300' : '30'} mcv</div>
                </div>
                {isUpgrading ? (
                  <div className={`bg-cyan-600 border border-white rounded-tr-lg rounded-bl-lg py-1 px-7 my-1 cursor-not-allowed`}>
                    <PulseLoader color="#ffffff" size={8} />
                  </div>
                ) : (
                  <div
                    className={`text-[10px] bg-cyan-600 text-center hover:bg-cyan-800 font-bold border border-white rounded-tr-lg rounded-bl-lg text-black py-1.5 px-2 my-1 tracking-[1px] cursor-pointer`}
                    onClick={() => handleHireMechanic(id, 0, type)}
                  >
                    {type === 'muscle' ? 'hire mechanic' : 'unlock pit crew'}
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
        <div className="w-full mb-4 uppercase">
          {type === 'super' && (
            <div className="mb-2 ml-1">
              <div className="grid grid-cols-2 gap-2 ml-2 text-white sm:grid-cols-4">
                <div className="self-end w-full">
                  <img src={Images.iconCrewChief} alt="" className="mx-auto mb-1" />
                  <div className="text-center text-white text-[10px] tracking-[1px] text-shadow-blue font-bold">crew chief</div>
                </div>
                <div className="self-end w-full">
                  <img src={Images.iconMechnic} alt="" className="mx-auto mb-1" />
                  <div className="text-center text-white text-[10px] tracking-[1px] text-shadow-blue font-bold">mechanic</div>
                </div>
                <div className="self-end w-full">
                  <img src={Images.iconTirechanger} alt="" className="mx-auto mb-1" />
                  <div className="text-center text-white text-[10px] tracking-[1px] text-shadow-blue font-bold">tirechanger</div>
                </div>
                <div className="self-end w-full">
                  <img src={Images.iconGasman} alt="" className="mx-auto mb-1" />
                  <div className="text-center text-white text-[10px] tracking-[1px] text-shadow-blue font-bold">gasman</div>
                </div>
              </div>
            </div>
          )}
          {members[type].map((part, idx) => (
            <div className="relative mb-2 ml-1 2xl:mb-4 last:mb-0" key={idx}>
              <div
                className="absolute text-amber-600 text-[10px] left-0 top-1/2 -translate-x-1/2 -rotate-90 tracking-[2px] pl-3"
                style={{ textShadow: '0px 0px 3px #00A3FF' }}
              >
                {part.name}
              </div>
              <div className="grid grid-cols-2 gap-2 ml-2 text-white sm:grid-cols-4 2xl:gap-4">
                {part.subStages.map(({ name, level, cost }, index) => (
                  <Fragment key={index}>
                    {earnInfo.isHired ? (
                      <>
                        {level <= earnInfo.stage ? (
                          <div className="relative border border-cyan-200 rounded-tr-lg rounded-bl-lg p-2 tracking-[1px]">
                            <img src={earnIcons[type][name]} alt="" className="mx-auto mb-1" />
                            <div className="text-white text-[8px] font-bold w-full px-1" style={{ textShadow: '0px 0px 3px #00E0FF' }}>
                              {name}
                            </div>
                            <div className="absolute bottom-2 right-2">
                              <img src={Images.iconCheck} alt="" />
                            </div>
                          </div>
                        ) : level > earnInfo.stage && level < earnInfo.stage + numOfSelects ? (
                          <div className="flex items-center justify-center bg-cyan-600 border border-cyan-400 rounded-tr-lg rounded-bl-lg py-1 tracking-[1px]">
                            <div>
                              <div className="text-lg font-bold leading-3 text-center text-black text-shadow-blue">+{part.speed}</div>
                              <div className="my-1 text-xs font-bold leading-3 text-center text-black text-shadow-blue">mcv/day</div>
                              <div className="text-black text-[10px] leading-3 text-center font-bold mt-1 py-1 mx-2 border-t border-dashed border-amber-600 text-shadow-blue">
                                cost: {cost} mcv
                              </div>
                            </div>
                          </div>
                        ) : level === earnInfo.stage + numOfSelects ? (
                          <div
                            className="flex items-center justify-center bg-cyan-600 border border-cyan-400 rounded-tr-lg rounded-bl-lg py-1 tracking-[1px] cursor-pointer"
                            onClick={() => handleUnSelect(cost)}
                          >
                            <div>
                              <div className="text-lg font-bold leading-3 text-center text-black text-shadow-blue">+{part.speed}</div>
                              <div className="my-1 text-xs font-bold leading-3 text-center text-black text-shadow-blue">mcv/day</div>
                              <div className="text-black text-[10px] leading-3 text-center font-bold mt-1 py-1 mx-2 border-t border-dashed border-amber-600 text-shadow-blue">
                                cost: {cost} mcv
                              </div>
                            </div>
                          </div>
                        ) : level === earnInfo.stage + numOfSelects + 1 ? (
                          <div
                            className="group flex items-center justify-center border-amber-600 bg-cyan-200 bg-opacity-10 hover:border-cyan-200 border rounded-tr-lg rounded-bl-lg p-2 tracking-[1px] cursor-pointer"
                            onClick={() => handleSelect(cost)}
                          >
                            <div>
                              <div className="text-lg font-bold leading-3 text-center text-white text-shadow-blue">+{part.speed}</div>
                              <div className="text-amber-600 group-hover:text-cyan-200 text-xs leading-3 text-center text-shadow-blue my-1">
                                mcv/day
                              </div>
                              <div className="text-amber-600 group-hover:text-cyan-200 text-[10px] leading-3 text-center mt-1 py-1 mx-2 border-t border-dashed border-amber-600 text-shadow-blue">
                                cost: {cost} mcv
                              </div>
                            </div>
                          </div>
                        ) : level > earnInfo.stage + numOfSelects + 1 ? (
                          <div className="relative border border-cyan-200 rounded-tr-lg rounded-bl-lg p-2 tracking-[1px]">
                            <img src={earnIcons[type][name]} alt="" className="mx-auto mb-1 opacity-20" />
                            <div
                              className="text-white text-[8px] text-opacity-70 font-bold w-full px-1"
                              style={{ textShadow: '0px 0px 3px #00E0FF' }}
                            >
                              {name}
                            </div>
                            <div className="absolute bottom-2 right-2 opacity-40">
                              <LockIcon color={`#00CAFF`} />
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <div className="relative border border-cyan-200 rounded-tr-lg rounded-bl-lg p-2 tracking-[1px]">
                        <img src={earnIcons[type][name]} alt="" className="mx-auto mb-1 opacity-20" />
                        <div
                          className="text-white text-[8px] text-opacity-70 font-bold w-full px-1"
                          style={{ textShadow: '0px 0px 3px #00E0FF' }}
                        >
                          {name}
                        </div>
                        <div className="absolute bottom-1 right-1 opacity-40">
                          <LockIcon color={`#00CAFF`} />
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-px border-r border-gray-50 mx-1 2xl:mx-2 mb-4 hidden xl:block"></div>
      <div className="hidden xl:block">
        {earnInfo.isHired ? (
          <div className="p-1 uppercase bg-black bg-opacity-50 rounded-tr-2xl">
            <div className="text-white text-[10px] tracking-[1.6px] text-shadow-blue">{type === 'muscle' ? 'parts' : 'crew'} selected</div>
            {numOfSelects > 0 ? (
              <>
                <div className="text-cyan-200 text-xl font-bold font-roboto">
                  {numOfSelects}{' '}
                  <span className="text-sm font-normal text-gray-400 whitespace-nowrap">({totalCost.toLocaleString()} mcv)</span>
                </div>
                {isUpgrading ? (
                  <div
                    className={`text-[10px] text-black font-semibold bg-cyan-600 border border-white rounded-tr-lg rounded-bl-lg flex items-center justify-center px-2 py-1 tracking-[1px] cursor-not-allowed self-stretch`}
                  >
                    <PulseLoader color="#ffffff" size={8} />
                  </div>
                ) : (
                  <div
                    className={`text-[10px] text-white font-semibold bg-cyan-600 hover:bg-cyan-800 border border-white rounded-tr-lg rounded-bl-lg flex items-center justify-center px-2 py-1 tracking-[1px] cursor-pointer self-stretch`}
                    onClick={() => handleBuyParts()}
                  >
                    {type === 'muscle' ? 'buy parts' : 'hire crew'}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-xl font-bold text-gray-400 font-roboto">0</div>
                <div className="text-[10px] text-white font-semibold opacity-50 border border-white rounded-tr-lg rounded-bl-lg flex items-center justify-center px-2 py-1 tracking-[1px] self-stretch">
                  {type === 'muscle' ? 'buy parts' : 'hire crew'}
                </div>
              </>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className={`bg-black bg-opacity-50 rounded-br-2xl border-t-2 border-cyan uppercase p-1`}>
          <div>
            <div className="text-white text-[10px] tracking-[1.6px] text-shadow-blue">{memberLabel[type]}</div>
            <div className="flex items-center">
              {earnInfo.isHired ? (
                <div className="text-cyan-200 text-[16px] font-bold tracking-[1px]">{type === 'muscle' ? 'hired' : 'active'}</div>
              ) : (
                <>
                  <img src={iconAlertBlue} alt="icon-alert" className="w-6" />
                  <div className="text-cyan-200 text-lg font-bold">needed</div>
                </>
              )}
            </div>
          </div>
          {!earnInfo.isHired ? (
            <div>
              <div className="flex flex-col justify-between text-[10px] tracking-[1px]">
                <div className="text-white text-shadow-blue">cost:</div>
                <div className="text-cyan-600 font-bold">{type === 'muscle' ? '300' : '30'} mcv</div>
              </div>
              {isUpgrading ? (
                <div className={`bg-cyan-600 border border-white rounded-tr-lg rounded-bl-lg py-1 px-7 my-1 cursor-not-allowed`}>
                  <PulseLoader color="#ffffff" size={8} />
                </div>
              ) : (
                <div
                  className={`text-[10px] text-center bg-cyan-600 hover:bg-cyan-800 font-bold border border-white rounded-tr-lg rounded-bl-lg text-black py-1.5 px-2 my-1 tracking-[1px] cursor-pointer`}
                  onClick={() => handleHireMechanic(id, 0, type)}
                >
                  {type === 'muscle' ? 'hire mechanic' : 'unlock pit crew'}
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          <div className="w-10 h-px border-t border-gray border-dashed my-1"></div>
          <div>
            <div className="text-white text-[10px] tracking-[1.6px] text-shadow-blue">
              {type === 'muscle' ? 'parts installed' : 'crew hired'}
            </div>
            <div className={`text-cyan-600 text-lg font-bold font-roboto`}>
              {type === 'muscle' && earnInfo.stage}
              {type === 'super' && (earnInfo.stageLevel > 0 ? 'tier ' + earnInfo.stageLevel : 'none')}
            </div>
          </div>
          <div className="w-10 h-px border-t border-gray border-dashed my-1"></div>
          <div>
            <div className="text-white text-[10px] tracking-[1.6px] text-shadow-blue">earning</div>
            <div className={`text-cyan-600 text-lg font-bold font-roboto`}>{earnInfo.earnSpeed}/day</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarParts
