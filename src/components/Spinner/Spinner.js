import { PulseLoader } from 'react-spinners'

import { useGetWeb3ReducerValues } from 'state/web3/hooks'

const Spinner = () => {
  const isLoading = useGetWeb3ReducerValues('isLoading')

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-[101]" style={{ background: 'rgba(0,0,0,0.9)' }}>
          <div className="flex items-center justify-center min-h-screen">
            <div>
              <PulseLoader color="#00E0FF" size={20} />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default Spinner
