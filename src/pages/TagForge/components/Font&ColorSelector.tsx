import ColorPalette from './ColorPalette'
import FontDropDown from './FontDropDown'

const FontColorSelector = () => {
  return (
    <div className="flex items-center justify-center gap-20">
      <div className="flex flex-col gap-4">
        <span>{'Choose the font you would like to use:'}</span>
        <FontDropDown />
      </div>
      <div className="flex flex-col gap-4">
        <span>{'Choose the color of your text:'}</span>
        <ColorPalette />
      </div>
    </div>
  )
}

export default FontColorSelector
