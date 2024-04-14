import React, { useState, useEffect, useMemo, useCallback } from 'react'

import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { TargetIcon, ProgressClockIcon, LockedLockIcon, CheckIIcon, MapIcon, ListIcon } from 'components/Icons'
import MissionMap from 'components/Mission/MissionMap'
import missionABI from 'contracts/abis/Mission.json'
import carABI from 'contracts/abis/Nfv.json'
import ticketABI from 'contracts/abis/Ticket.json'
import lamboABI from 'contracts/abis/Wenlambo/Wenlambo.json'
// import { setLoading } from 'reducers/globalInfoSlice'
import { missionAddress, carAddress, superCarAddress, ticketAddress } from 'contracts/address'
import { useWeb3 } from 'hooks'

const Missions = () => {
  const dispatch = useDispatch()
  const { address } = useWeb3()

  const [nowTime, setNowTime] = useState(Math.floor(new Date().getTime() / 1000))

  const [ticketContract, setTicketContract] = useState(null)
  const [missionContract, setMissionContract] = useState(null)
  const [muscleCarContract, setMuscleCarContract] = useState(null)
  const [superCarContract, setSuperCarContract] = useState(null)
  const [muscleCarIDs, setMuscleCarIDs] = useState([])
  const [superCarIDs, setSuperCarIDs] = useState([])
  const [missions, setMissions] = useState([])
  const [missionsEntriesInfo, setMissionsEntriesInfo] = useState([])
  const [showMissionDetailPopup, setShowMissionDetailPopup] = useState(false)
  const [numOfTickets, setNumOfTickets] = useState(0)

  const getMissions = async (missionContract, muscleCarContract, superCarContract, ticketContract) => {
    try {
      const tickets = await ticketContract.balanceOf(address)
      console.log(tickets.toString())
      setNumOfTickets(+tickets.toString())

      const muscleCarIDs = await muscleCarContract.tokensOfOwner(address)
      const superCarIDs = await superCarContract.tokensOfOwner(address)

      if (muscleCarIDs.length) {
        const myCarIDs = muscleCarIDs.map((each) => each.toString())
        console.log('muscle ids\n', myCarIDs)
        setMuscleCarIDs(myCarIDs)
      }
      if (superCarIDs.length) {
        const mySuperCarIds = superCarIDs.map((id) => id.toString())
        console.log('super ids\n', mySuperCarIds)
        setSuperCarIDs(mySuperCarIds)
      }

      const muscleIds = muscleCarIDs.map((item) => [carAddress, item.toString()])
      const superIds = superCarIDs.map((item) => [superCarAddress, item.toString()])
      const missionEntryInfo = await missionContract.getQualifyingNfts([...muscleIds, ...superIds])
      const entries = missionEntryInfo.map((item, index) => ({
        ...item,
        nft: [...muscleIds, ...superIds][index][0],
        tokenId: [...muscleIds, ...superIds][index][1],
      }))
      console.log('missionEntryInfo:\n', entries)
      setMissionsEntriesInfo(entries)

      const missionsInfo = await missionContract.getMissions()
      console.log(missionsInfo)
      if (missionsInfo.length) {
        const missions = missionsInfo.map((item, index) => ({
          active: item.active,
          currentlyInMission: item.currentlyInMission.toString(),
          duration: item.duration.toString(),
          globalCompletionCount: item.globalCompletionCount.toString(),
          globalMaxCompletionCount: item.globalMaxCompletionCount.toString(),
          maxCompletionCount: item.maxCompletionCount.toString(),
          meta: item.meta,
          entryNfts: item.entryNfts,
          qualifyingNft: item.qualifyingNft,
          rewardNfts: item.rewardNfts,
          id: index,
        }))
        // console.log(missions.splice(0, 4));
        setMissions(missions)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const enterMission = async () => {
    try {
      const result = await missionContract.enterMission('0', '0xcE567C2892E0543245a74ae8BB3618225Caf65e6', '18')
      const r = await result.wait()
      console.log(r)
    } catch (error) {
      console.log(error)
    }
  }
  const getQualifyingNfts = async () => {
    console.log(missions)
    try {
      const result = await missionContract.getQualifyingNfts([
        ['0xcE567C2892E0543245a74ae8BB3618225Caf65e6', '18'],
        ['0x2180d60e53d2abd0d220c14f90512ae192e65598', '234'],
        ['0x0c6abF36D8945720B28E05EE5EdcDa01f18a0cea', '24'],
      ])
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }
  const finishMission = async () => {
    try {
      const result = await missionContract.completeMission('0xcE567C2892E0543245a74ae8BB3618225Caf65e6', '18')
      const r = await result.wait()
      console.log(r)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEnterMission = useCallback(
    async (missionId, nftAddress, tokenId) => {
      try {
        // dispatch(setLoading(true))
        console.log(missionId, nftAddress, tokenId)
        const result = await missionContract.enterMission(missionId, nftAddress, tokenId)
        const r = await result.wait()
        console.log(r)
        toast.success('Joined successfully!')

        setTimeout(async () => {
          // dispatch(setLoading(false))
          const muscleIds = muscleCarIDs.map((item) => [carAddress, item.toString()])
          const superIds = superCarIDs.map((item) => [superCarAddress, item.toString()])
          const missionEntryInfo = await missionContract.getQualifyingNfts([...muscleIds, ...superIds])
          const entries = missionEntryInfo.map((item, index) => ({
            ...item,
            nft: [...muscleIds, ...superIds][index][0],
            tokenId: [...muscleIds, ...superIds][index][1],
          }))
          console.log('missionEntryInfo:\n', entries)
          setMissionsEntriesInfo(entries)
        }, 7000)
      } catch (error) {
        // dispatch(setLoading(false))
        toast.error('Something went wrong')
        console.log(error)
      }
    },
    [missionContract, muscleCarIDs, superCarIDs]
  )

  const handleCompleteMission = useCallback(
    async (missionId, nftAddress, tokenId) => {
      try {
        console.log(nftAddress, tokenId)
        const result = await missionContract.completeMission(nftAddress, tokenId)
        const r = await result.wait()
        console.log(r)
        toast.success('Completed successfully!')

        const currentEntries = JSON.parse(JSON.stringify(missionsEntriesInfo))
        const updatedEntries = [...currentEntries].map((item) => {
          if (item.nft === nftAddress && item.tokenId === tokenId) {
            const updatedComletionCounts = [...item.completionCounts]
            updatedComletionCounts[missionId] = item.completionCounts[missionId]++
            return {
              ...item,
              inMission: false,
              missionEndsAt: 0,
              missionId: 0,
              completionCounts: updatedComletionCounts,
            }
          } else return item
        })

        setMissionsEntriesInfo(updatedEntries)
      } catch (error) {
        toast.error('Something went wrong')
        console.log(error)
      }
    },
    [missionContract, missionsEntriesInfo]
  )

  useEffect(() => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const missionContract = new ethers.Contract(missionAddress, missionABI, signer)
    setMissionContract(missionContract)
    const muscleCarContract = new ethers.Contract(carAddress, carABI, signer)
    setMuscleCarContract(muscleCarContract)
    const superCarContract = new ethers.Contract(superCarAddress, lamboABI, signer)
    setSuperCarContract(superCarContract)
    const ticketContract = new ethers.Contract(ticketAddress, ticketABI, signer)
    setTicketContract(ticketContract)

    getMissions(missionContract, muscleCarContract, superCarContract, ticketContract)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Math.floor(new Date().getTime() / 1000)
      setNowTime(now)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const numOfAvailableMissions = useMemo(() => missions.filter((item) => item.active).length, [missions])
  const numOfOngoingMissions = useMemo(() => {
    const missionIds = missionsEntriesInfo
      .filter((item) => item.inMission && item.missionEndsAt <= nowTime)
      .map((mission) => mission.missionId)
    const uniqueIds = new Set(missionIds)
    return uniqueIds.size
  }, [missionsEntriesInfo, nowTime])
  const numOfCompletedMissions = useMemo(() => {
    const missionIds = missionsEntriesInfo
      .filter((item) => item.inMission && item.missionEndsAt > nowTime)
      .map((mission) => mission.missionId)
    const uniqueIds = new Set(missionIds)
    return uniqueIds.size
  }, [missionsEntriesInfo, nowTime])

  return (
    <div className="px-8 pb-8 mx-4 mt-10 text-white md:mx-24 lg:mx-40 2xl:ml-64 2xl:mr-64">
      <div className="flex justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="bg-[rgba(125,255,138,0.2)] hover:bg-[rgba(125,255,138,0.45)] rounded-md border-l-[12px] border-[#42EC7C] py-3 px-3.5 w-60">
            <div className="flex items-center justify-center gap-2">
              <TargetIcon color={`#42EC7C`} />
              <div className="font-bold text-4xl leading-6 tracking-[2px]">{numOfAvailableMissions}</div>
              <div className="text-xs tracking-[2px] text-[#63FD60] uppercase w-24">available missions</div>
            </div>
          </div>
          <div className="bg-[rgba(255,204,13,0.25)] hover:bg-[rgba(255,204,13,0.45)] rounded-md border-l-[12px] border-[#FFC33E] py-3 px-3.5 w-60">
            <div className="flex items-center justify-center gap-2">
              <ProgressClockIcon color={`#FFC33E`} />
              <div className="font-bold text-4xl leading-6 tracking-[2px]">{numOfOngoingMissions}</div>
              <div className="text-xs tracking-[2px] text-[#FFC544] uppercase w-24">ongoing missions</div>
            </div>
          </div>
          <div className="bg-[rgba(255,47,21,0.4)] hover:bg-[rgba(255,47,21,0.55)] rounded-md border-l-[12px] border-[#FF3C22] py-3 px-3.5 w-60">
            <div className="flex items-center justify-center gap-2">
              <LockedLockIcon color={`#FF3C22`} />
              <div className="font-bold text-4xl leading-6 tracking-[2px]">0</div>
              <div className="text-xs tracking-[2px] text-[#FF7B6A] uppercase w-24">locked missions</div>
            </div>
          </div>
          <div className="bg-[rgba(0,171,255,0.4)] hover:bg-[rgba(0,171,255,0.55)] rounded-md border-l-[12px] border-[#26B3F9] py-3 px-3.5 w-60">
            <div className="flex items-center justify-center gap-2">
              <CheckIIcon color={`#26B3F9`} />
              <div className="font-bold text-4xl leading-6 tracking-[2px]">{numOfCompletedMissions}</div>
              <div className="text-xs tracking-[2px] text-[#6CCEFF] uppercase w-24">completed missions</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-md bg-[rgba(255,176,0,0.3)]">
            {/* border border-[#FFB000] */}
            <MapIcon color={`#FFB000`} />
          </div>
          <div className="w-16 h-16 flex items-center justify-center rounded-md bg-[rgba(255,176,0,0.3)]">
            <ListIcon color={`#FFB000`} />
          </div>
        </div>
      </div>
      {/* <button
        className="p-2 border border-white"
        onClick={() => enterMission()}
      >
        enter
      </button>
      <button
        className="p-2 border border-white"
        onClick={() => getQualifyingNfts()}
      >
        getInfo
      </button>
      <button
        className="p-2 border border-white"
        onClick={() => finishMission()}
      >
        finish
      </button> */}
      <MissionMap
        showMissionDetailPopup={showMissionDetailPopup}
        setShowMissionDetailPopup={setShowMissionDetailPopup}
        missions={missions}
        missionsEntriesInfo={missionsEntriesInfo}
        nowTime={nowTime}
        tokenIds={{ muscle: muscleCarIDs, super: superCarIDs }}
        numOfTickets={numOfTickets}
        onEnterMission={handleEnterMission}
        onCompleteMission={handleCompleteMission}
      />
    </div>
  )
}

export default Missions
