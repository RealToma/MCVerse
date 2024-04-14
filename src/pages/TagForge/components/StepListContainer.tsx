import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'

import { useForgeStep } from '../hooks'
import { IForgeStep } from '../types'

const StepItem = ({ item }: { item: IForgeStep }) => {
  const currentStepId = useGetLicensePlateReducerValues('currentStepId')
  const { handleForgeStep } = useForgeStep()

  const handleClick = () => {
    if (!item.status) return
    handleForgeStep(item.id)
  }

  return (
    <div className="flex items-center cursor-pointer" onClick={handleClick}>
      {currentStepId !== item.id && item.status === true && (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.59647 7.87087C2.30308 7.8717 2.01591 7.95557 1.76819 8.11279C1.52047 8.27001 1.32233 8.49415 1.19669 8.75929C1.07104 9.02442 1.02303 9.31971 1.05821 9.61099C1.09338 9.90228 1.21031 10.1776 1.39546 10.4052L5.3424 15.2402C5.48313 15.415 5.66352 15.5536 5.86859 15.6447C6.07366 15.7357 6.29749 15.7765 6.52148 15.7636C7.00055 15.7379 7.43307 15.4816 7.70883 15.0602L15.9076 1.85608C15.909 1.85389 15.9104 1.8517 15.9118 1.84954C15.9887 1.73142 15.9638 1.49734 15.805 1.35029C15.7614 1.30991 15.71 1.27889 15.6539 1.25913C15.5978 1.23938 15.5383 1.23131 15.479 1.23542C15.4197 1.23953 15.3619 1.25574 15.3091 1.28305C15.2563 1.31036 15.2097 1.34818 15.172 1.3942C15.1691 1.39782 15.1661 1.40138 15.1629 1.40489L6.89434 10.7472C6.86287 10.7827 6.82466 10.8117 6.78192 10.8323C6.73917 10.853 6.69275 10.8649 6.64535 10.8675C6.59794 10.8701 6.5505 10.8632 6.50578 10.8473C6.46105 10.8313 6.41994 10.8067 6.38483 10.7747L3.64063 8.2775C3.35563 8.01624 2.98311 7.87117 2.59647 7.87087Z"
            fill="#23D0FF"
          />
        </svg>
      )}
      <span
        className={`font-medium text-xs leading-[162%] uppercase ${
          currentStepId === item.id ? 'text-white' : item.status ? 'text-cyan-200' : 'text-white/30'
        }`}
      >
        {item.name}
      </span>
    </div>
  )
}

const StepListContainer = () => {
  const forgeStepList = useGetLicensePlateReducerValues('forgeStepList')
  return (
    <div className="flex items-center justify-center gap-20">
      {forgeStepList.map((item) => (
        <StepItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export default StepListContainer
