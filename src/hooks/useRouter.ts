import { useCallback, useMemo } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

export const useGetCurrentURLPath = () => {
  const location = useLocation()
  return useMemo(() => location.pathname.replace('/', ''), [location.pathname])
}

export const useAppNavigate = () => {
  const navigate = useNavigate()

  const handleNavigate = useCallback(
    (route: string) => {
      navigate(route)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [navigate]
  )

  return { handleNavigate }
}
