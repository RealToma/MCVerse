import { useEffect, useState } from 'react'

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime()

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getHoursLeft(countDown)
}

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

  return [days, hours, minutes, seconds]
}

const getHoursLeft = (countDown) => {
  if (countDown < 0) return ['00', '00']
  const hours = Math.floor(countDown / (1000 * 60 * 60)) + ''
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)) + ''

  const hh = ('0' + hours).slice(-2)
  const mm = ('0' + minutes).slice(-2)
  return [hh, mm]
}

export { useCountdown }
