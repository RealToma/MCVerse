import SearchInput from './SearchInput'
import SortDropDown from './SortDropDown'
import StakedToggle from './StakedToggle'
import ViewOption from './ViewOption'

const OptionContainer = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12 gap-4 mr-4">
      <div className="col-start-1 col-span-1 md:col-span-3 lg:col-span-2">
        <StakedToggle />
      </div>
      <div className="col-start-2 md:col-start-4 lg:col-start-3 col-span-1 md:col-span-2">
        <SearchInput />
      </div>
      <div className="col-start-1 md:col-start-8 lg:col-start-6 xl:col-start-5 col-span-1 md:col-span-3 lg:col-span-2">
        <SortDropDown />
      </div>

      <div className="col-start-2 md:col-start-11 col-span-1 md:col-span-2">
        <ViewOption />
      </div>
    </div>
  )
}

export default OptionContainer
