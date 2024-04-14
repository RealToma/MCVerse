import { useState, useRef, useEffect, useCallback } from 'react'

import { ArrowIcon } from 'components/SVGIcons'
import { useAppDispatch } from 'state/hooks'

const SelectCountryDropDown = ({ region, setRegion, sortRegionOptions }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropDownRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const dropDownEl = dropDownRef.current
      if (!dropDownEl || dropDownEl.contains(event.target as Node)) {
        return
      }
      if (isOpen) {
        setIsOpen(false)
      }
    },
    [isOpen]
  )

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div className="flex items-center" ref={dropDownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex justify-between items-center border-[1px] border-[#21D0FF] bg-[#030f21] ml-[9px] px-[15px] min-w-[160px] h-[30px] rounded-[12px] font-extrabold text-[10px] text-white tracking-[0.5px] uppercase cursor-pointer"
      >
        {region.nameRegion}
        <ArrowIcon className={`fill-white transition duration-300 ease-in-out ${isOpen && 'rotate-180'}`} />

        <div
          className={`absolute left-0 top-8 flex-col items-start w-full overflow-hidden rounded-[12px]  z-10000 border-[#21D0FF] bg-[#030f21]  shadow-lg transition-[max_height] duration-200 ease-in-out transform h-auto ${
            isOpen ? 'max-h-60 p-1 mt-1 border-[1px]  z-10000' : 'max-h-0 z-10000'
          } `}
        >
          {sortRegionOptions.map((each: any, index: any) => (
            <div
              key={index}
              className={`w-full p-2 transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#21D0FF] hover:rounded-md leading-[144%] tracking-[0.5px] text-white text-[10px] text-start ${
                region.nameRegion === each.nameRegion ? ' font-bold [text-shadow:0px_0px_3px_#ffcc0d]' : 'font-normal'
              }`}
              onClick={() => {
                setRegion(each)
              }}
            >
              {each.nameRegion}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SelectCountryDropDown
