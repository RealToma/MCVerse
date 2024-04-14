const TitleContainer = () => {
  return (
    <div className="w-full flex justify-center items-center gap-3">
      <div className="font-medium text-lg leading-[108%] text-right text-amber-600 whitespace-pre-wrap uppercase">
        {'Rev up your NFT collection\nwith Tag Forge!'}
      </div>
      <div className="w-[2px] bg-cyan-200 self-stretch" />
      <div className="font-light text-sm text-left leading-[103%] whitespace-pre-wrap">
        {
          'Customize exclusive license plates for your muscle car NFTs,\ncombining stunning backgrounds and personalized\nalphanumeric text to create limited-edition racing gems.'
        }
      </div>
    </div>
  )
}

export default TitleContainer
