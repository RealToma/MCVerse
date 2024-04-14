import imgFlag from 'assets/image/flag-blend-mode-color-dodge.png'
import imgSoldOut from 'assets/image/sold-out-muscle.png'

const SoldOut = () => {
  return (
    <div className="relative flex items-center justify-center mx-2 mt-12 lg:mx-20">
      <img src={imgFlag} alt="flag" className="absolute top-0 w-4/5 -translate-x-1/2 left-1/2 mix-blend-color-dodge" />
      <img src={imgSoldOut} alt="sold_out_image" className="" />
    </div>
  )
}

export default SoldOut
