import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSlider from 'react-slider'

import type { RootState } from '@/common/models'
import { SetCriteriaAction } from '@/common/state/criteria/criteriaActions'
import type { TCriteria } from '@/common/state/criteria/criteriaState'

import { ArrowLeftIcon, ArrowRightIcon, Close, PlusIcon } from '../Elements'

const PriceRange = () => {
  const [show, setShow] = useState(true)
  const dispatch = useDispatch()
  const criteria: TCriteria = useSelector(
    (state: RootState) => state.app.criteria.criteria,
  )
  const range =
    useSelector((state: RootState) => state.app.product.range.price) || []

  const setPriceRange = (priceRange: number[]) => {
    dispatch(SetCriteriaAction({ key: 'listing_price', value: priceRange }))
  }
  return (
    <div className="mb-6">
      <div
        className="text-base text-[#699E49] font-medium relative cursor-pointer pb-3 border-b-2 border-[#ADE28D] mb-6"
        onClick={() => setShow((value) => !value)}
      >
        Price Range{' '}
        {show ? (
          <span className="absolute right-0 top-[5px] text-[#64748B]">
            <Close />
          </span>
        ) : (
          <span className="absolute right-0 top-[5px] text-[#64748B]">
            <PlusIcon />
          </span>
        )}
      </div>
      {show && (
        <div className="mb-6">
          <div className="flex justify-between text-[12px] text-[#94A3B8]">
            <p>From</p>
            <p className="mr-6">To</p>
          </div>
          <div className="mb-2">
            <ReactSlider
              value={[
                criteria.listing_price[0] || 0,
                criteria.listing_price[1] || 0,
              ]}
              min={range[0] || 0}
              max={range[1] || 0}
              onChange={(value: number[]) => {
                setPriceRange(value)
                console.log('change price range', value)
              }}
              className="slider-price-range"
              thumbClassName="slider-price-range-thumb"
              trackClassName="slider-price-range-track"
              renderThumb={(props: any) => {
                return (
                  <div
                    {...props}
                    className={`${props.className} flex justify-center items-center`}
                  >
                    <span className="flex items-center relative h-full w-full">
                      <ArrowLeftIcon />
                      <ArrowRightIcon />
                    </span>
                  </div>
                )
              }}
            />
          </div>
          <div className="flex justify-between text-[#0F172A] text-[12px] mb-2">
            <p>${criteria.listing_price[0]?.toFixed(2)}</p>
            <p>
              $
              {new Intl.NumberFormat('en-IN', {
                maximumSignificantDigits: 3,
              }).format(criteria.listing_price[1] || 0)}
            </p>
          </div>
          <div className="flex justify-between gap-4">
            <div className="relative max-w-[145px]">
              <input
                type="number"
                className="text-sm font-medium border w-full rounded-lg border-[#D9D9D9] pl-[35px] pr-4 py-2"
                value={criteria.listing_price[0] || 0}
                onChange={(e) =>
                  setPriceRange([
                    Number(e.target.value),
                    criteria.listing_price[1] || 0,
                  ])
                }
              />
              <span className="absolute left-[27px] top-1/4 text-[12px]">
                $
              </span>
            </div>
            <div className="relative max-w-[145px]">
              <input
                type="number"
                className="text-sm font-medium border w-full rounded-lg border-[#D9D9D9] pl-[35px] pr-4 py-2"
                value={criteria.listing_price[1]}
                onChange={(e) =>
                  setPriceRange([
                    criteria.listing_price[0] || 0,
                    Number(e.target.value),
                  ])
                }
              />
              <span className="absolute left-[27px] top-1/4 text-[12px]">
                $
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PriceRange
