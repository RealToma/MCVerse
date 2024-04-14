import { useState, useEffect } from 'react'

function useCountdownTimer(endTime) {
  const calculateTimeRemaining = () => {
    const totalSeconds = Math.floor((endTime - Date.now()) / 1000)

    if (totalSeconds <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' }
    }

    const days = Math.floor(totalSeconds / (24 * 60 * 60))
      .toString()
      .padStart(2, '0')
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
      .toString()
      .padStart(2, '0')
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
      .toString()
      .padStart(2, '0')
    const seconds = Math.floor(totalSeconds % 60)
      .toString()
      .padStart(2, '0')

    return { days, hours, minutes, seconds }
  }

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining())
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return timeRemaining
}

export default useCountdownTimer
