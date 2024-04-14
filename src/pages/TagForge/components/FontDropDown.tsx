import { useCallback, useEffect, useRef, useState } from 'react'

import { ArrowIcon } from 'components/SVGIcons'
import { useAppDispatch } from 'state/hooks'
import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'
import { setLicensePlate } from 'state/tagForge/reducer'

import { PLATE_FONT_LIST } from '../utils'

const FontDropDown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropDownRef = useRef<HTMLDivElement>(null)
  const { fontStyleId } = useGetLicensePlateReducerValues('licensePlate')

  const dispatch = useAppDispatch()

  const handleSetFont = useCallback(
    (id: number) => {
      if (fontStyleId === id) return

      dispatch(setLicensePlate({ fontStyleId: id }))
    },
    [dispatch, fontStyleId]
  )

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
        className="relative flex justify-between items-center bg-cyan-600/[38%] hover:bg-cyan-700/40 ml-[9px] px-[34px] min-w-[300px] h-[50px] rounded-[25px] font-extrabold text-[25px] leading-[58%] uppercase cursor-pointer"
      >
        <span className="font-plate-custom" style={{ ['--plate-font' as any]: PLATE_FONT_LIST[fontStyleId - 1].font }}>
          {PLATE_FONT_LIST[fontStyleId - 1].font}
        </span>
        <ArrowIcon className={`fill-white w-3 h-3 ml-4 transition duration-300 ease-in-out ${isOpen && 'rotate-180'}`} />

        <div
          className={`absolute left-0 top-14 flex-col items-start w-full z-30 overflow-hidden bg-cyan-700/40 rounded-2xl shadow-lg transition-[max_height] duration-200 ease-in-out transform h-auto ${
            isOpen ? 'max-h-60 p-1 mt-1' : 'max-h-0'
          } `}
        >
          {PLATE_FONT_LIST.map((item) => (
            <div
              key={item.id}
              className={`w-full p-2 transition-all duration-300 ease-in-out cursor-pointer hover:bg-cyan-400/30 hover:rounded-md leading-[144%] tracking-[0.5px] text-[14px] text-start ${
                fontStyleId === item.id ? 'font-bold [text-shadow:0px_0px_3px_#ffcc0d]' : 'font-normal'
              }`}
              onClick={() => handleSetFont(item.id)}
            >
              {item.font}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FontDropDown
