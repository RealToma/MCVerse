import { useCallback, useRef } from 'react'

import { toPng, toBlob } from 'html-to-image'

import { useAppDispatch } from 'state/hooks'
import { setScreenShot } from 'state/tagForge/reducer'

export const usePlateScreenshot = () => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const handleScreenShot = useCallback(async () => {
    if (ref.current === null) return

    console.log('aaa', ref.current)
    const imgBlob = await toBlob(ref.current, { cacheBust: true })

    dispatch(setScreenShot(imgBlob))
  }, [dispatch])
  return { ref, handleScreenShot }
}
