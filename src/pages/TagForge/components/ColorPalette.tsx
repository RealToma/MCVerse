import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'

import { useSetPlateToStore } from '../hooks'
import { COLOR_PALETTE_LIST } from '../utils'

const ColorPaletteItem = ({ textColor, borderColor }: { textColor: string; borderColor: string }) => {
  const { color } = useGetLicensePlateReducerValues('licensePlate')
  const { handleLicensePlate } = useSetPlateToStore()
  return (
    <div
      className={`rounded-full w-[60px] h-[60px] -rotate-45 overflow-hidden drop-shadow-[0px_0px_15px_rgba(255,255,255,0.25)] hover:scale-105 cursor-pointer ${
        color.textColor === textColor && color.borderColor === borderColor ? 'p-[2px] border-[3px] border-solid border-cyan-200' : ''
      }`}
      onClick={() => handleLicensePlate('color', { textColor, borderColor })}
    >
      <div className={'w-full h-1/2 rounded-t-full'} style={{ backgroundColor: textColor }} />
      <div className={'w-full h-1/2 rounded-b-full'} style={{ backgroundColor: borderColor }} />
    </div>
  )
}

const ColorPalette = () => {
  return (
    <div className="flex items-center gap-5">
      {COLOR_PALETTE_LIST.map((item) => (
        <ColorPaletteItem key={item.id} textColor={item.textColor} borderColor={item.borderColor} />
      ))}
    </div>
  )
}

export default ColorPalette
