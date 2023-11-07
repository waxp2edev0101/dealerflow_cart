import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '@/common/models'
import { SetCriteriaAction } from '@/common/state/criteria/criteriaActions'
import type { TCriteria } from '@/common/state/criteria/criteriaState'

import { Close, PlusIcon } from '../Elements'

const fuelList = [
  { label: 'All types', value: 1 },
  { label: 'Gasoline', value: 2 },
  { label: 'Hybrid', value: 3 },
  { label: 'Diesel', value: 4 },
  { label: 'Electric', value: 5 },
]

const cylindersList = [
  { label: 'All', value: 0 },
  { label: '4', value: 4 },
  { label: '6', value: 6 },
  { label: '8', value: 8 },
  { label: '8+', value: -1 },
]

const Powertrain = () => {
  const [show, setShow] = useState(true)

  const criteria: TCriteria = useSelector(
    (state: RootState) => state.app.criteria.criteria,
  )
  const dispatch = useDispatch()

  const handleSelectFuel = (value: number) => {
    console.log('handle select fuel', value)
    if (value === 1) {
      if (
        criteria.vehicle_fuel_types &&
        criteria.vehicle_fuel_types.length === fuelList.length - 1
      ) {
        dispatch(
          SetCriteriaAction({
            key: 'vehicle_fuel_types',
            value: [],
          }),
        )
      } else {
        dispatch(
          SetCriteriaAction({
            key: 'vehicle_fuel_types',
            value: ['Gasoline', 'Hybrid', 'Diesel', 'Electric'],
          }),
        )
      }

      return
    }
    const fuel = fuelList.filter((item) => item.value === value)[0].label
    const idx = (criteria.vehicle_fuel_types || [])?.indexOf(fuel)

    if (idx === -1)
      dispatch(
        SetCriteriaAction({
          key: 'vehicle_fuel_types',
          value: criteria.vehicle_fuel_types
            ? [...criteria.vehicle_fuel_types, fuel]
            : [fuel],
        }),
      )
    else
      dispatch(
        SetCriteriaAction({
          key: 'vehicle_fuel_types',
          value: criteria.vehicle_fuel_types
            ? [
                ...criteria.vehicle_fuel_types.slice(0, idx),
                ...criteria.vehicle_fuel_types.slice(
                  idx + 1,
                  criteria.vehicle_fuel_types.length,
                ),
              ]
            : [],
        }),
      )
  }
  const handleSelectCylinder = (value: number) => {
    const cylinders = cylindersList.find((e) => e.value === value)?.value
    const idx = (criteria.vehicle_engine_cylinders || [])?.indexOf(cylinders)

    if (value === 0) {
      if (
        criteria.vehicle_engine_cylinders &&
        criteria.vehicle_engine_cylinders.length === cylindersList.length - 1
      ) {
        dispatch(
          SetCriteriaAction({
            key: 'vehicle_engine_cylinders',
            value: [],
          }),
        )
      } else {
        dispatch(
          SetCriteriaAction({
            key: 'vehicle_engine_cylinders',
            value: [4, 6, 8, -1],
          }),
        )
      }
      return
    }
    if (idx === -1)
      dispatch(
        SetCriteriaAction({
          key: 'vehicle_engine_cylinders',
          value: criteria.vehicle_engine_cylinders
            ? [...criteria.vehicle_engine_cylinders, cylinders]
            : [cylinders],
        }),
      )
    else
      dispatch(
        SetCriteriaAction({
          key: 'vehicle_engine_cylinders',
          value: criteria.vehicle_engine_cylinders
            ? [
                ...criteria.vehicle_engine_cylinders.slice(0, idx),
                ...criteria.vehicle_engine_cylinders.slice(
                  idx + 1,
                  criteria.vehicle_engine_cylinders.length,
                ),
              ]
            : [],
        }),
      )
  }
  return (
    <div className="mb-6">
      <div
        className="text-base text-accent font-medium relative cursor-pointer pb-3 border-b-2 border-[#C8D1FF] mb-6"
        onClick={() => setShow((value) => !value)}
      >
        Powertrain{' '}
        {show ? (
          <span className="absolute right-0 top-[5px] text-[#64748B]">
            {/* <CloseIcon /> */}
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
          <div className="mb-5 text-[#0F172A] text-sm">
            <p>Fuel</p>
          </div>
          <div className="grid grid-cols-2 gap-1 mb-6">
            {fuelList.map((fuelType, index) => (
              <div key={index} className="mb-5">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={
                      (criteria?.vehicle_fuel_types &&
                        criteria?.vehicle_fuel_types.indexOf(fuelType.label) >
                          -1) ||
                      (fuelType.value === 1 &&
                        criteria?.vehicle_fuel_types.length === 4)
                    }
                    className="h-4 w-4 border-[#B8B8B8] mr-4"
                    onChange={() => handleSelectFuel(fuelType.value)}
                  />
                  <span className="font-base font-medium">
                    {fuelType.label}
                  </span>
                </label>
              </div>
            ))}
          </div>
          <div className="mb-5 text-[#0F172A] text-sm">
            <p>Cylinders</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {cylindersList.map((item, index) => (
              <div key={index} className="mb-5">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={
                      (criteria?.vehicle_engine_cylinders &&
                        criteria?.vehicle_engine_cylinders.indexOf(item.value) >
                          -1) ||
                      (item.value === 0 &&
                        criteria?.vehicle_engine_cylinders?.length === 4)
                    }
                    className="h-4 w-4 border-[#B8B8B8] mr-4"
                    onChange={() => handleSelectCylinder(item.value)}
                  />
                  <span className="font-base font-medium">{item.label}</span>
                </label>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Powertrain
