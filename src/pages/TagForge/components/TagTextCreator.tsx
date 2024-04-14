import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'

import { useSetPlateToStore } from '../hooks'

const TagTextCreator = () => {
  const { handleLicensePlate } = useSetPlateToStore()
  const licensePlate = useGetLicensePlateReducerValues('licensePlate')

  return (
    <div className="flex flex-col items-center gap-12">
      <span className="">{'What would you like the tag to say?'}</span>
      <input
        className="w-fit-content min-w-[186px] outline-none p-2 pb-4 bg-transparent border-b border-solid border-white font-bold text-2xl text-center leading-[60%] tracking-[1px]"
        placeholder="Add tag here"
        onChange={(e) => handleLicensePlate('tagText', e.target.value)}
        maxLength={9}
        value={licensePlate.tagText}
      />
    </div>
  )
}

export default TagTextCreator
