import { useGetLicensePlateReducerValues } from 'state/tagForge/hooks'

import { PLATE_BACKGROUND_LIST, PLATE_FONT_LIST } from '../utils'

import GradientDivider from './GradientDivider'
import MCVerseLogo from './MCVerseLogo'
import ReviewContainer from './ReviewContainer'
import SelectCountryDropDown from './SelectCountryDropDown'

const ScrewHole = () => {
  return <div className="w-4 h-4 bg-gradient-screw-hole border border-solid border-gray-100 rounded-full" />
}

const LicensePlateContainer = ({ blobRef, region, setRegion, sortRegionOptions }: any) => {
  const licensePlate = useGetLicensePlateReducerValues('licensePlate')
  const currentStepId = useGetLicensePlateReducerValues('currentStepId')

  return (
    <div className="w-full flex flex-col items-center justify-center pt-20">
      {currentStepId < 4 ? (
        <>
          <div className="w-full flex flex-col items-center justify-center">
            <div
              ref={blobRef}
              className="px-10 py-6 drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] shadow-inner-[0px_0px_132px_rgb(0,0,0)]"
              style={{
                width: PLATE_BACKGROUND_LIST[licensePlate.backgroundImgId].imageSizeW,
                height: PLATE_BACKGROUND_LIST[licensePlate.backgroundImgId].imageSizeH,
              }}
            >
              <img
                src={PLATE_BACKGROUND_LIST[licensePlate.backgroundImgId].image}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[full] rounded-[20px]"
              />
              {/* <img
                src={PLATE_BACKGROUND_LIST[0]}
                className="absolute top-[2px] left-1/2 -translate-x-1/2 h-[calc(100%-10px)] rounded-[36px] w-auto"
              /> */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-plate-custom font-[600] text-[134px] leading-[104%]`}
                style={{
                  ['--plate-font' as any]: PLATE_FONT_LIST[licensePlate.fontStyleId - 1].font,
                  color: licensePlate.color.textColor,
                  WebkitTextStroke: `5px ${licensePlate.color.borderColor}`,
                }}
              >
                {licensePlate.tagText}
              </div>
              {/* <div className="relative flex flex-col w-full h-full items-center justify-between z-20">
                <div className="flex justify-between w-full">
                  <ScrewHole />
                  <MCVerseLogo />
                  <ScrewHole />
                </div>
               
                <div className="flex justify-between w-full">
                  <ScrewHole />
                  <ScrewHole />
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex w-full justify-between items-center pt-2 mt-[50px]">
            <div className="flex">
              <SelectCountryDropDown region={region} setRegion={setRegion} sortRegionOptions={sortRegionOptions} />
            </div>
            <span className="font-medium uppercase">{'cost: 100'}</span>
          </div>
        </>
      ) : (
        <ReviewContainer />
      )}

      <GradientDivider />
    </div>
  )
}

export default LicensePlateContainer
