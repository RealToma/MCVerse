import { useState, useCallback, useEffect } from 'react'

import { all } from 'axios'
import { ethers } from 'ethers'
import { toast } from 'react-toastify'

import { BridgeIcon } from 'components/Icons'
import badgeABI from 'contracts/abis/Badge.json'
import bridgeABI from 'contracts/abis/Bridge.json'
import multiCallABI from 'contracts/abis/MultiCall.json'
import lamboABI from 'contracts/abis/Wenlambo/Wenlambo.json'
import {
  bridgeAddress,
  superCarAddress,
  multiCallAddress,
  harmonyLamboAddress,
  harmonyBridgeAddress,
  harmonyMultiCallAddress,
  badgeAddress,
  harmonyBadgeAddress,
} from 'contracts/address'
import { useWeb3 } from 'hooks'
import { PageMainWrapper } from 'pages/Layout'
import { imgSuperCarUrl } from 'services/api'
import { harmonyLogo, logoAvaxWhite } from 'utils/helper/image.helper'

import BridgeItem from './components/BridgeItem'

const Bridge = () => {
  const { address } = useWeb3()

  const [bridgeContract, setBridgeContract] = useState(null)
  const [superCarContract, setSuperCarContract] = useState(null)
  const [badgeContract, setBadgeContract] = useState(null)
  const [multiCallContract, setMultiCallContract] = useState(null)
  const [harmonyBadgeContract, setHarmonyBadgeContract] = useState(null)
  const [harmonyBridgeContract, setHarmonyBridgeContract] = useState(null)
  const [harmonyLamboContract, setHarmonyLamboContract] = useState(null)
  const [harmonyMultiCallContract, setHarmonyMultiCallContract] = useState(null)

  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isBridging, setIsBridging] = useState(false)

  const [numOfSelected, setNumOfSelected] = useState(0)
  const [lamboIds, setLamboIds] = useState([])
  const [superCarIds, setSuperCarIds] = useState([])
  const [numOfBadges, setNumOfBadges] = useState(0)
  const [harmonyBadgeIds, setHarmonyBadgeIds] = useState([])
  const [idsForRetransfer, setIdsForRetransfer] = useState([])
  const [idsToBridge, setIdsToBridge] = useState([])

  const handleSelectNft = useCallback(
    (isSelected, id) => {
      if (isSelected) setNumOfSelected(numOfSelected + 1)
      else setNumOfSelected(numOfSelected - 1)
      setIdsToBridge([...idsToBridge, id])
    },
    [numOfSelected, idsToBridge]
  )

  const getHarmonyAssets = async (
    harmonyLamboContract,
    superCarContract,
    bridgeContract,
    harmonyBridgeContract,
    multiCallContract,
    harmonyMultiCallContract,
    badgeContract,
    harmonyBadgeContract
  ) => {
    try {
      setIsLoading(true)
      const lamboIds = await harmonyLamboContract.tokensOfOwner(address)
      const myLamboIds = lamboIds.map((id) => id.toString())
      setLamboIds(myLamboIds)
      const superCarIds = await superCarContract.tokensOfOwner(address)
      const mySuperCarIds = superCarIds.map((id) => id.toString())
      setSuperCarIds(mySuperCarIds)
      console.log('lambos\n', myLamboIds)
      console.log('super cars\n', mySuperCarIds)
      const numOfBadgeIds = await harmonyBadgeContract.balanceOf(address)
      // const myBadgeIds = badgeIds.map((id) => id.toString());
      // setBadgeIds(badgeIds);
      const balanceOfAvaxBadges = await badgeContract.balanceOf(address)
      // const myAvaxBadgeIds = avaxBadgeIds.map((id) => id.toString());
      setNumOfBadges(balanceOfAvaxBadges.toString())
      console.log('badge counts:\n', numOfBadgeIds.toString(), balanceOfAvaxBadges.toString())
      // const id = await badgeContract.tokenOfOwnerByIndex(account, 0);
      // console.log("badge id:", id.toString());

      // Get Badge Ids in Harmony
      const inputGetBadgeIds = [...Array(+numOfBadgeIds.toString())].map((_, index) => ({
        target: harmonyBadgeContract.address,
        callData: harmonyBadgeContract.interface.encodeFunctionData('tokenOfOwnerByIndex', [address, index]),
      }))
      const txGetBadgeIds = await harmonyMultiCallContract.aggregate(inputGetBadgeIds)
      const dataBadgeIds = txGetBadgeIds.returnData.map(
        (returnData, index) => harmonyBadgeContract.interface.decodeFunctionResult('tokenOfOwnerByIndex', returnData)[0]
      )
      const badgeIds = dataBadgeIds.map((id) => id.toString())
      console.log('badgeids in Harmony', badgeIds)
      setHarmonyBadgeIds(badgeIds)

      // For History Refresh
      const historyLength = await harmonyBridgeContract.personalHistoryLength(address)
      // console.error(historyLength);
      const history = historyLength.toString()
      // console.log(history);

      const inputGetHistoryIds = [...Array(+history)].map((_, index) => ({
        target: harmonyBridgeContract.address,
        callData: harmonyBridgeContract.interface.encodeFunctionData('personalHistory', [address, index]),
      }))
      const txGetHistoryIds = await harmonyMultiCallContract.aggregate(inputGetHistoryIds)
      const dataHistoryIds = txGetHistoryIds.returnData.map(
        (returnData, index) => harmonyBridgeContract.interface.decodeFunctionResult('personalHistory', returnData)[0]
      )
      // console.log(dataHistoryIds);

      const inputGetCompletions = dataHistoryIds.map((id) => ({
        target: bridgeContract.address,
        callData: bridgeContract.interface.encodeFunctionData('externalCompletions', [id]),
      }))
      const txGetCompletions = await multiCallContract.aggregate(inputGetCompletions)
      const dataCompletions = txGetCompletions.returnData.map(
        (returnData, index) => bridgeContract.interface.decodeFunctionResult('externalCompletions', returnData)[0]
      )
      console.log(dataCompletions)
      const failedHistoryIds = dataCompletions
        .map((each, index) => (each === false ? dataHistoryIds[index] : null))
        .filter((each) => each !== null)

      if (failedHistoryIds.length > 0) {
        console.log('Failed lambo bridging ids:\n', failedHistoryIds)
        setIdsForRetransfer(failedHistoryIds)
      } else {
        console.log('Nothing to bridge again')
      }

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error('Something went wrong! Please refresh your browser and try again.')
      console.log(error)
    }
  }

  const handleRefresh = useCallback(async () => {
    try {
      if (idsForRetransfer.length === 0) {
        toast.info('No Lambos to transfer again!')
        return
      }
      if (isRefreshing) {
        toast.info('Your have already sent request. Please try again 1 min later!')
        return
      }
      setIsRefreshing(true)
      all(
        idsForRetransfer.map((id) =>
          axios.post(`https://bridgeserver.mcverse.app/queueRequest`, {
            sourceChain: 'harmony',
            id,
          })
        )
      ).then(
        setTimeout(() => {
          getWenlamboAssets(
            harmonyLamboContract,
            superCarContract,
            bridgeContract,
            harmonyBridgeContract,
            multiCallContract,
            harmonyMultiCallContract,
            badgeContract,
            harmonyBadgeContract
          )
          toast.success('Request sent successfully!')
        }, 5000)
      )
      setTimeout(() => {
        setIsRefreshing(false)
      }, 60000)
    } catch (error) {}
  }, [
    badgeContract,
    bridgeContract,
    harmonyBadgeContract,
    harmonyBridgeContract,
    harmonyLamboContract,
    harmonyMultiCallContract,
    idsForRetransfer,
    isRefreshing,
    multiCallContract,
    superCarContract,
  ])

  const handleBridge = useCallback(async () => {
    try {
      if (isBridging) return
      if (lamboIds.length + harmonyBadgeIds.length === 0) {
        toast.info('No NFTs to bridge')
        return
      }
      setIsBridging(true)
      const isApproved = await harmonyLamboContract.isApprovedForAll(address, harmonyBridgeAddress)
      // console.log(isApproved);
      if (!isApproved) {
        const txApproval = await harmonyLamboContract.setApprovalForAll(harmonyBridgeAddress, true)
        await txApproval.wait()
      }

      console.log(idsToBridge)
      const lamboIdsToBridge = [...new Set(idsToBridge)]
      console.log(lamboIdsToBridge)
      if (lamboIdsToBridge.length > 50) {
        const queue = lamboIdsToBridge.slice(0, 50).map((id) => [
          [harmonyLamboAddress, id],
          ['avax', account],
        ])
        const tx = await harmonyBridgeContract.queue(queue)
        // console.log(tx);
        await tx.wait()
        // console.log(result);
      } else {
        const queue = lamboIdsToBridge.map((id) => [
          [harmonyLamboAddress, id],
          ['avax', account],
        ])
        const tx = await harmonyBridgeContract.queue(queue)
        // console.log(tx);
        await tx.wait()
        // console.log(result);
      }
      // Badge bridge
      const isBadgeApproved = await harmonyBadgeContract.isApprovedForAll(address, harmonyBridgeAddress)
      // console.log(isApproved);
      if (!isBadgeApproved) {
        const txApproval = await harmonyBadgeContract.setApprovalForAll(harmonyBridgeAddress, true)
        await txApproval.wait()
      }
      const queue = harmonyBadgeIds.map((id) => [
        [harmonyBadgeAddress, id],
        ['avax', account],
      ])
      const tx = await harmonyBridgeContract.queue(queue)
      // console.log(tx);
      await tx.wait()

      getWenlamboAssets(
        harmonyLamboContract,
        superCarContract,
        bridgeContract,
        harmonyBridgeContract,
        multiCallContract,
        harmonyMultiCallContract,
        badgeContract,
        harmonyBadgeContract
      )
      setIsBridging(false)
    } catch (error) {
      setIsBridging(false)
      toast.error('Execution reverted')
    }
  }, [
    address,
    badgeContract,
    bridgeContract,
    harmonyBadgeContract,
    harmonyBadgeIds,
    harmonyBridgeContract,
    harmonyLamboContract,
    harmonyMultiCallContract,
    idsToBridge,
    isBridging,
    lamboIds,
    multiCallContract,
    superCarContract,
  ])

  useEffect(() => {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const avaxProvider = new ethers.providers.JsonRpcProvider('https://api.avax.network/ext/bc/C/rpc')
    const bridgeContract = new ethers.Contract(bridgeAddress, bridgeABI, avaxProvider)
    const superCarContract = new ethers.Contract(superCarAddress, lamboABI, avaxProvider)
    const multiCallContract = new ethers.Contract(multiCallAddress, multiCallABI, avaxProvider)
    const badgeContract = new ethers.Contract(badgeAddress, badgeABI, avaxProvider)

    const harmonyProvider = new ethers.providers.JsonRpcProvider('https://api.harmony.one')
    const harmonyBridgeContract = new ethers.Contract(harmonyBridgeAddress, bridgeABI, signer)
    const harmonyLamboContract = new ethers.Contract(harmonyLamboAddress, lamboABI, signer)
    const harmonyMultiCallContract = new ethers.Contract(harmonyMultiCallAddress, multiCallABI, signer)
    const harmonyBadgeContract = new ethers.Contract(harmonyBadgeAddress, badgeABI, signer)

    setBridgeContract(bridgeContract)
    setSuperCarContract(superCarContract)
    setMultiCallContract(multiCallContract)
    setBadgeContract(badgeContract)
    setHarmonyBadgeContract(harmonyBadgeContract)
    setHarmonyBridgeContract(harmonyBridgeContract)
    setHarmonyLamboContract(harmonyLamboContract)
    setHarmonyMultiCallContract(harmonyMultiCallContract)

    getHarmonyAssets(
      harmonyLamboContract,
      superCarContract,
      bridgeContract,
      harmonyBridgeContract,
      multiCallContract,
      harmonyMultiCallContract,
      badgeContract,
      harmonyBadgeContract
    )
  }, [])

  return (
    <PageMainWrapper>
      <div className="relative pb-4 mb-10 md:pb-40 md:mb-24 2xl:pb-20 2xl:mb-12 callout-bg">
        <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-black border border-cyan-650 shadow-[0_0_9px_rgba(77,201,255,0.9)] hidden md:flex items-center justify-center">
          <BridgeIcon width={40} height={40} />
        </div>
        <div className="hidden ml-1 sm:ml-6 md:ml-20 md:flex md:items-center md:justify-between md:mr-[14vw] h-16">
          <div className="md:flex md:items-center">
            <div
              className="font-bold text-xl text-cyan-100 leading-4 tracking-[2.4px] uppercase"
              style={{ textShadow: '0px 0px 5px rgba(50, 171, 252, 0.98)' }}
            >
              BRIDGE YOUR ASSETS
            </div>
            <div className="w-px border border-r border-dashed border-amber-400 h-6 rotate-[30deg] mx-1 sm:mx-4"></div>
            <div className="text-white text-[10px] font-medium tracking-[2px] text-shadow-blue">
              Send your NFTs from one chain to another
            </div>
          </div>
        </div>
        <div className="grid gap-2 mt-2 xl:pr-4 xl:pl-6 md:grid-cols-2">
          <div>
            <div className="py-2 text-lg font-medium leading-5 text-cyan-50">Bridge from:</div>
            <div className="border bg-gradient-blue border-cyan-50 rounded-2xl p-7">
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center border rounded-full border-cyan-250 py-2.5 px-3 gap-2 w-48">
                  <img src={harmonyLogo} alt="" />
                  <div className="text-xs leading-[120%] text-shadow-blue">Harmony</div>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-[10px] leading-3 tracking-[1px] text-cyan text-shadow-blue uppercase">supported</div>
                    <div className="font-medium text-2xl leading-3 tracking-[1px] text-shadow-blue mt-2">{harmonyBadgeIds.length}</div>
                  </div>
                  <div>
                    <div className="font-medium text-[10px] leading-3 tracking-[1px] text-shadow-blue uppercase">unsupported</div>
                    <div className="font-medium text-2xl leading-3 tracking-[1px] text-shadow-blue mt-2">0</div>
                  </div>
                </div>
              </div>
              <div className="my-4 border-t border-dashed border-cyan-150"></div>
              <div className="overflow-y-auto h-96">
                {lamboIds.length ? (
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-7 md:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-7">
                    {lamboIds.map((id, index) => (
                      <BridgeItem key={index} id={id} isSupported handleSelectNft={handleSelectNft} />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">No NFTs to bridge</div>
                )}
              </div>
              <div className="my-4 border-t border-dashed border-cyan-150"></div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-[10px] leading-3 tracking-[1px] text-cyan text-shadow-blue uppercase">nfts selected</div>
                  <div className="font-medium text-2xl leading-3 tracking-[1px] text-shadow-blue mt-2">{numOfSelected}</div>
                </div>
                {numOfSelected > 0 ? (
                  <div
                    className={`cursor-pointer border-2 border-[#00C6FB] rounded-tr-xl rounded-bl-xl p-5 text-center font-bold text-lg leading-3 tracking-[1px] text-cyan-250 uppercase`}
                    onClick={() => handleBridge()}
                  >
                    bridge selected nfts
                  </div>
                ) : (
                  <div
                    className={`opacity-50 cursor-not-allowed border-2 border-[#00C6FB] rounded-tr-xl rounded-bl-xl p-5 text-center font-bold text-lg leading-3 tracking-[1px] text-cyan-250 uppercase`}
                  >
                    select nfts to bridge
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="py-2 text-lg font-medium leading-5 text-amber-600">Bridge to:</div>
            <div className="border bg-gradient-blue border-amber-600 rounded-2xl p-7">
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center border rounded-full border-amber-600 py-2.5 px-3 gap-2 w-48">
                  <img src={logoAvaxWhite} alt="" className="w-4 h-4" />
                  <div className="text-xs leading-[120%]" style={{ textShadow: '0px 0px 3px #FFCC0D' }}>
                    Avalanche
                  </div>
                </div>
                <div>
                  <div className="font-medium text-[10px] leading-3 tracking-[1px] text-amber-600 text-shadow-blue uppercase">
                    ready to bridge
                  </div>
                  <div className="font-medium text-2xl leading-3 tracking-[1px] text-shadow-blue mt-2">{numOfSelected}</div>
                </div>
              </div>
              <div className="my-4 border-t border-dashed border-cyan-150"></div>
              <div className="overflow-y-auto h-96">
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-7 md:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-7">
                  {superCarIds.map((id, index) => (
                    <div className="border-2 rounded border-cyan-250" key={index}>
                      <img src={`${imgSuperCarUrl}${id}`} alt="" className="w-full rounded" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="my-4 border-t border-dashed border-cyan-150"></div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-amber-600">
                    Not seeing your bridged assets here? <span className="font-black">Click refresh.</span>{' '}
                  </div>
                </div>
                <button
                  className="border-2 border-amber-600 rounded-tr-xl rounded-bl-xl p-5 text-center font-bold text-lg leading-3 tracking-[1px] text-amber-600 uppercase"
                  onClick={() => handleRefresh()}
                >
                  refresh
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs leading-5 md:w-1/2 text-amber-600 xl:pl-6">
          If you have assets that are not supported on our bridge, please reach out to our team on Discord for consideration of the
          unsupported project.
        </div>
      </div>
    </PageMainWrapper>
  )
}

export default Bridge
