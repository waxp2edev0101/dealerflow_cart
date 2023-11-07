import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactSlider from 'react-slider'
import Switch from 'react-switch'

import type { RootState } from '@/common/models'
import { SetCriteriaAction } from '@/common/state/criteria/criteriaActions'
import type { TCriteria } from '@/common/state/criteria/criteriaState'

import type { Option } from '../Dropdown/index'
import Dropdown from '../Dropdown/index'
import { ArrowLeftIcon, ArrowRightIcon, Close, PlusIcon } from '../Elements'

const YearAndMileage = () => {
  const dispatch = useDispatch()
  const criteria: TCriteria = useSelector(
    (state: RootState) => state.app.criteria.criteria,
  )
  const range: number[] = useSelector(
    (state: RootState) => state.app.product.range.mileage,
  ) || [0, 0]
  const [yearOptions, setYearOptions] = useState<Option[]>([])

  const [show, setShow] = useState(true)

  const [unit, setUnit] = useState(true)

  const handleUnit = (value: any) => {
    setUnit(value)
  }

  useEffect(() => {
    const optionsArray = []
    for (let index = 0; index <= new Date().getFullYear() + 1 - 1970; index++) {
      const constructOption: Option = {
        label: String(1970 + index),
        value: parseInt(String(1970 + index), 10),
      }
      optionsArray.push(constructOption)
    }
    setYearOptions(optionsArray)
  }, [])

  const setYear = (year: number[]) => [
    dispatch(
      SetCriteriaAction({
        key: 'vehicle_year',
        value: year,
      }),
    ),
  ]
  const setMileage = (mileage: number[]) => {
    dispatch(
      SetCriteriaAction({
        key: 'listing_mileage',
        value: mileage,
      }),
    )
  }
  return (
    <div className="mb-6">
      <div
        className="text-base text-accent font-medium relative cursor-pointer pb-3 border-b-2 border-[#C8D1FF] mb-6"
        onClick={() => setShow((value) => !value)}
      >
        Year & Mileage{' '}
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
        <>
          <div className="mb-6">
            <p className="mb-3 text-[12px]">Year</p>
            <div className="flex justify-between text-[12px] text-[#0F172A]">
              <p>From</p>
              <p className="mr-6">To</p>
            </div>
            <div className="mb-2">
              <ReactSlider
                value={[
                  criteria.vehicle_year[0] || 0,
                  criteria.vehicle_year[1] || 0,
                ]}
                max={new Date().getFullYear() + 1}
                min={1970}
                onChange={(value) => {
                  setYear(value)
                }}
                className="slider-year"
                thumbClassName="slider-year-thumb"
                trackClassName="slider-year-track"
                renderThumb={(props) => {
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
            <div className="flex justify-between text-[12px] text-[#94A3B8] font-bold mb-2">
              <p>Year from</p>
              <p>Year to</p>
            </div>
            <div className="flex justify-between gap-4">
              <Dropdown
                value={{
                  label: String(criteria.vehicle_year[0]),
                  value: criteria.vehicle_year[0] || 0,
                }}
                options={yearOptions}
                onChange={(value) => {
                  setYear([Number(value.label), criteria.vehicle_year[1] || 0])
                }}
              />
              <Dropdown
                value={{
                  label: String(criteria.vehicle_year[1]),
                  value: criteria.vehicle_year[1] || 0,
                }}
                options={yearOptions}
                onChange={(value) => {
                  setYear([criteria.vehicle_year[0] || 0, Number(value.label)])
                }}
              />
            </div>
          </div>

          <div>
            <p className="mb-3">Mileage</p>
            <div className="mb-4">
              <label
                htmlFor="material-switch"
                className="flex items-center gap-3"
              >
                <span className="text-[12px]">Miles</span>
                <Switch
                  checked={unit}
                  onChange={handleUnit}
                  onColor="#EEF2F6"
                  offColor="#5E78FF"
                  onHandleColor="#5E78FF"
                  offHandleColor="#5E78FF"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  handleDiameter={21}
                  height={20}
                  width={44}
                  className="switch-miles"
                  id="material-switch"
                />
                <span className="text-[12px]">Kilometers</span>
              </label>
            </div>
            <div className="flex justify-between text-[12px] text-[#0F172A]">
              <p>From</p>
              <p className="mr-6">To</p>
            </div>
            <div className="mb-2">
              <ReactSlider
                value={[
                  criteria.listing_mileage[0] || 0,
                  criteria.listing_mileage[1] || 0,
                ]}
                max={range[1]}
                min={range[0]}
                onChange={(value: number[]) => {
                  setMileage(value)
                }}
                className="slider-year"
                thumbClassName="slider-year-thumb"
                trackClassName="slider-year-track"
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
            <div className="flex justify-between text-[12px] text-[#0F172A] font-bold mb-2">
              <p>0</p>
              {/* <p>400,000</p> */}
              <p>{range[1]}</p>
            </div>
            <div className="flex justify-between gap-4">
              <div className="max-w-[145px]">
                <input
                  type="number"
                  className="text-base font-medium border w-full rounded-lg border-[#D9D9D9] px-2 py-[5px]"
                  value={criteria.listing_mileage[0]}
                  onChange={(e) => {
                    setMileage([
                      Number(e.target.value),
                      criteria.listing_mileage[1] || 0,
                    ])
                  }}
                />
              </div>
              <div className="max-w-[145px]">
                <input
                  className="text-base font-medium border w-full rounded-lg border-[#D9D9D9] px-2 py-[5px]"
                  value={criteria.listing_mileage[1]}
                  onChange={(e) => {
                    setMileage([
                      criteria.listing_mileage[0] || 0,
                      Number(e.target.value),
                    ])
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default YearAndMileage
