import * as _ from 'lodash'
import { useCallback, useState } from 'react'
import { RxCopy } from 'react-icons/rx'
import { useSelector } from 'react-redux'

import Contact from '@/assets/contact.svg'
import CarImage from '@/assets/images/car-image.png'
import SpeedMeter from '@/assets/speedmeter.png'
import type { RootState } from '@/common/models'
import type { IProduct } from '@/common/state/product/productState'
import SaveVehicleInfoForm from '@/pages/Landing/SaveVehicleInfoForm'

interface ProductProps {
  product: IProduct
}

const ProductCard = ({ product }: ProductProps) => {
  const [contacted, setContacted] = useState(false)
  const location = useSelector((state: RootState) => state.app.location)

  const handleContacted = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault()
      e.stopPropagation()
      setContacted((value) => !value)
    },
    [],
  )
  const onClose = () => {
    setContacted(false)
  }

  const handleCopyToClipBoard = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    text: string,
  ) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(text)

    // alert('Copied')
  }
  return (
    <div className="card p-5 rounded-2 min-w-[313px] h-full" key={product.id}>
      <div className="card-header">
        <h2 className="text-base font-[700]">
          {_.truncate(product.details?.vehicle_make, { length: 10 })}{' '}
          {_.truncate(product.model, { length: 15 })}{' '}
          {_.truncate(product.details?.vehicle_year, { length: 15 })}
        </h2>
        <p className="text-sm leading-[2] font-[450] h-[28px]">
          {product.level}
        </p>
        <div className="flex justify-between border-t border-b py-2 ">
          <button onClick={(e) => handleContacted(e)}>
            <img
              src={Contact}
              className="w-5 h-5 text-[#5E78FF]"
              alt="contact"
            />
            {contacted && (
              <SaveVehicleInfoForm onClose={onClose} product={product} />
            )}
          </button>
          <button
            className={`${
              product.featureType === 0
                ? 'hidden'
                : product.featureType === 1
                ? 'bg-[#89C664]'
                : ''
            } px-3 py-1 text-sm text-white rounded-full`}
          >
            {product.features}
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="image border-b py-2 flex justify-center h-[258px]">
          <img src={product.image || CarImage} alt="" className="w-full" />
        </div>
        <p className="text-[#676973] text-base flex items-center gap-2 leading-[2]">
          <span>
            <img src={SpeedMeter} alt="speedometor" />
          </span>{' '}
          {product.details?.listing_mileage || 0}{' '}
          {location.country_code?.toLowerCase() === 'us' ? `km` : `mile`}
        </p>
        <div className="flex justify-between pt-1 pb-2 border-b">
          <p className="text-[#676973] text-sm">
            Stock Number: {product.stockNumber}
          </p>
          <button
            onClick={(e) => handleCopyToClipBoard(e, product?.stockNumber)}
            className="text-accent text-sm flex items-center gap-2"
          >
            <RxCopy /> Copy
          </button>
        </div>
        {/* <p className="text-[#49762D] text-[28px] py-2 border-b font-[500]"> */}
        <p className="text-[#49762D] text-[28px] py-2 font-[500]">
          $ {product.price || 0}
        </p>
        {/* <div className="flex justify-between py-2 border-b">
          <div className="w-1/3 flex flex-col justify-center">
            <p className="text-base text-[#256300]">{product.interestRate}%</p>
            <span className="text-[10px] text-[#676973]">Interest rate</span>
          </div>
          <div className="w-1/3 flex flex-col justify-center items-center border-l border-r">
            <p className="text-base text-[#256300]">{product.term} mth</p>
            <span className="text-[10px] text-[#676973]">Term</span>
          </div>
          <div className="w-1/3 flex flex-col justify-center">
            <p className="text-base text-[#256300] pb-0 mb-0 text-right">
              {product.monthly}
            </p>
            <span className="text-[10px] text-[#676973] w-full text-right">
              est. monthly
            </span>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default ProductCard
