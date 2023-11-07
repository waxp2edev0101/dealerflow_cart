import { useState, useRef } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import SlickSlider from 'react-slick'

import CarImage from '@/assets/images/car-image.png'
import type { IProduct } from '@/common/state/product/productState'
const Slider = ({ product }: { product: IProduct }) => {
  const [imageIndex, setImageIndex] = useState<number>(0)
  const slickSliderRef = useRef(null)

  const handlePrev = () => {
    ;(slickSliderRef?.current as unknown as SlickSlider)?.slickPrev()
  }

  const handleNext = () => {
    ;(slickSliderRef?.current as unknown as SlickSlider)?.slickNext()
  }
  const handleSlideClick = (index: number) => {
    console.log('goto', index)
    ;(slickSliderRef?.current as unknown as SlickSlider)?.slickGoTo(index)
  }

  var settings = {
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setImageIndex(next),
    // centerMode: true,
    dots: false,
    infinite: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          dots: false,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          infinite: true,
          slidesToScroll: 1,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: false,
          initialSlide: 2,
          slidesToScroll: 1,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: false,
          slidesToScroll: 1,
          slidesToShow: 1,
        },
      },
    ],
    slidesToScroll: 1,
    slidesToShow: 4,
    speed: 500,
  }

  return (
    <>
      <div
        className="w-full h-[948px]"
        style={{
          backgroundImage: `url(${product?.thumbs[imageIndex]})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        {(!product.thumbs || product.thumbs.length === 0) && (
          <img className="w-full h-full" src={CarImage} alt="" />
        )}
      </div>
      <div className="flex justify-center items-center w-full">
        <div
          onClick={handlePrev}
          className="relative w-10 h-10 border rounded drop-shadow-lg p-4 cursor-pointer shadow-md"
        >
          <BsChevronLeft className="absolute left-[12px] top-[14px] text-[12px]" />
        </div>
        <div
          className="flex justify-evenly max-h-[90px] px-4"
          style={{ width: 'calc(100% - 68px)' }}
        >
          <SlickSlider {...settings} className="w-full" ref={slickSliderRef}>
            {product.thumbs.map((slide: string, index: number) => (
              <div key={index} className={`h-[90px]`}>
                <div
                  className={`w-[120px] h-[90px] overflow-hidden ${
                    index === imageIndex ? 'border-4 border-blue-400' : ''
                  }`}
                  onClick={() => handleSlideClick(index)}
                >
                  <img width={`100%`} height={`100%`} src={slide} />
                </div>
              </div>
            ))}
          </SlickSlider>
        </div>
        <div
          onClick={handleNext}
          className="relative w-10 h-10 border rounded drop-shadow-lg p-4 cursor-pointer shadow-md"
        >
          <BsChevronRight className="absolute right-[11px] top-[14px] text-[12px]" />
        </div>
      </div>
    </>
  )
}

export default Slider
