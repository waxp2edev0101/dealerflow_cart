import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import type { RootState } from '@/common/models'
import { SetCriteriaAction } from '@/common/state/criteria/criteriaActions'

import { Close, PlusIcon } from '../Elements'

const transmissionType = [
  { label: 'Automatic', value: 1 },
  { label: 'Manual', value: 2 },
]

const transType = [
  { label: 'All', value: 1 },
  { label: 'AWD', value: 2 },
  { label: 'FWD', value: 3 },
  { label: 'RWD', value: 4 },
]

const Drivetrain = () => {
  const [show, setShow] = useState(true)

  const criteria = useSelector(
    (state: RootState) => state.app.criteria.criteria,
  )
  const dispatch = useDispatch()

  const handleSelect = (index: number) => {
    const type = transmissionType[index].label
    const idx = (criteria.vehicle_transmission_types || [])?.indexOf(type)

    if (idx === -1)
      dispatch(
        SetCriteriaAction({
          key: 'vehicle_transmission_types',
          value: criteria.vehicle_transmission_types
            ? [...criteria.vehicle_transmission_types, type]
            : [type],
        }),
      )
    else
      dispatch(
        SetCriteriaAction({
          key: 'vehicle_transmission_types',
          value: criteria.vehicle_transmission_types
            ? [
                ...criteria.vehicle_transmission_types.slice(0, idx),
                ...criteria.vehicle_transmission_types.slice(
                  idx + 1,
                  criteria.vehicle_transmission_types.length,
                ),
              ]
            : [],
        }),
      )
  }
  return (
    <div>
      <div
        className="text-base text-accent font-medium relative cursor-pointer pb-3 border-b-2 border-[#C8D1FF] mb-6"
        onClick={() => setShow((value) => !value)}
      >
        Drivetrain{' '}
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
          <div className="mb-5 text-[#0F172A] text-sm">
            <p>Transmission type</p>
          </div>
          <div className="grid grid-cols-2 gap-1 mb-6">
            {transmissionType.map((t, index) => (
              <div key={index} className="mb-5">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-[#B8B8B8] mr-4"
                    checked={
                      criteria?.vehicle_transmission_types &&
                      criteria?.vehicle_transmission_types?.indexOf(t.label) >
                        -1
                    }
                    onChange={() => handleSelect(index)}
                  />
                  <span className="font-base font-medium">{t.label}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="mb-5 text-[#0F172A] text-sm">
            <p>Drivetrain type</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {transType.map((t, index) => (
              <div key={index} className="mb-5">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-[#B8B8B8] mr-4"
                  />
                  <span className="font-base font-medium">{t.label}</span>
                </label>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Drivetrain
