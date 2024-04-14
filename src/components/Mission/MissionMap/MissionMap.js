import { useState, useCallback, useEffect, Fragment } from 'react'

import missionMap from 'assets/image/mission-map.png'

import './MissionMap.css'
import MissionDetail from './MissionDetail'
import MissionIcon from './MissionIcon'
import MissionIcon2 from './MissionIcon/MissionIcon2'

const MissionMap = ({
  missions,
  missionsEntriesInfo,
  nowTime,
  tokenIds,
  numOfTickets,
  onEnterMission,
  onCompleteMission,
  showMissionDetailPopup,
  setShowMissionDetailPopup,
}) => {
  // const [showMissionDetailPopup, setShowMissionDetailPopup] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null)
  const [missionEntries, setMissionEntries] = useState([])
  const [missionsInfo, setMissionsInfo] = useState(missions || [])

  const handleMissionClick = useCallback(
    (missionId, index) => {
      setShowMissionDetailPopup((prevShowPopup) => !prevShowPopup) // Toggle the value of showPopup
      setSelectedMission({ missionId, missionDetail: missions[index] })
      const entries = missionsEntriesInfo.filter((item) => +item.missionId.toString() === missionId)
      setMissionEntries(entries)
    },
    [missions, missionsEntriesInfo, setShowMissionDetailPopup]
  )

  const handleCloseDetailContainer = useCallback(() => {
    setShowMissionDetailPopup(false)
    setSelectedMission(null)
  }, [setShowMissionDetailPopup])

  // useEffect(() => {
  //   const entries = missionsEntriesInfo.filter(
  //     (item) => +item.missionId.toString() === 4
  //   );
  //   setMissionEntries(entries);
  // }, [missionsEntriesInfo]);
  useEffect(() => {
    setMissionsInfo(missions)
  }, [missions])

  console.log('missions ', missionsInfo)
  return (
    <div className="relative mt-6">
      <img src={missionMap} alt="" className="w-full" />
      {[...missionsInfo].map((mission, index) => {
        return mission.active ? (
          <MissionIcon key={index} info={mission} index={index} handleClick={handleMissionClick} isShowDetail={showMissionDetailPopup} />
        ) : (
          <Fragment key={index} />
        )
      })}
      {showMissionDetailPopup && (
        <MissionDetail
          missionInfo={selectedMission}
          missionEntries={missionEntries}
          nowTime={nowTime}
          tokenIds={tokenIds}
          numOfTickets={numOfTickets}
          closeDetailContainer={handleCloseDetailContainer}
          onEnterMission={onEnterMission}
          onCompleteMission={onCompleteMission}
        />
      )}
    </div>
  )
}

export default MissionMap
