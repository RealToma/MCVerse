import { useCallback, useState } from 'react'

export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      setIsCopied(false)
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 1000)
    } catch (error) {
      console.warn('Copy failed', error)
      setIsCopied(false)
    }
  }, [])

  return { isCopied, handleCopy }
}
