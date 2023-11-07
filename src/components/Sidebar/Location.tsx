import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSlider from 'react-slider'
import Switch from 'react-switch'

import type { RootState } from '@/common/models'
import { SetCriteriaAction } from '@/common/state/criteria/criteriaActions'
import { SetLocationAction } from '@/common/state/location/locationActions'

import AutoComplete from '../AutoComplete'
import { ArrowLeftIcon, ArrowRightIcon, Close, PlusIcon } from '../Elements'

const Location = () => {
  const distance =
    useSelector((state: RootState) => state.app.criteria.criteria.distance) || 0
  const [milesCheck, setMilesCheck] = useState(true)
  const [show, setShow] = useState(true)

  const dispatch = useDispatch()
  const handleMilesCheck = (value: any) => {
    setMilesCheck(value)
    console.log('set miles check', value)
  }
  useEffect(() => {
    let distanceUnit = 'N'
    if (milesCheck) {
      distanceUnit = 'K'
    }
    dispatch(
      SetCriteriaAction({
        key: 'distance_unit',
        value: distanceUnit,
      }),
    )
  }, [milesCheck])

  const onChangeLocation = (location: any) => {
    const lengthContext = location?.context?.length || 0
    dispatch(
      SetLocationAction({
        city: location['place_name_en-US'],
        country_code: location?.context[lengthContext - 1]['short_code'],
        latitude: location?.geometry?.coordinates[1],
        longitude: location?.geometry?.coordinates[0],
      }),
    )
  }
  return (
    <div className="filter bg-white rounded-lg px-6 py-5 mb-5">
      <h2
        onClick={() => setShow((value) => !value)}
        className={`text-xl text-orange font-bold ${
          show ? 'mb-6' : ''
        } relative cursor-pointer`}
      >
        Location{' '}
        {show ? (
          <span className="absolute right-0 top-[5px] text-[#64748B]">
            <Close />
          </span>
        ) : (
          <span className="absolute right-0 top-[5px] text-[#64748B]">
            <PlusIcon />
          </span>
        )}
      </h2>
      {show && (
        <div className="mb-5">
          <div className="relative mb-8">
            <p className="mb-2 text-sm text-[#0F172A]">Postal Code</p>
            {/* <input className="text-base font-medium border w-full rounded-lg border-[#D9D9D9] px-2 py-[5px] uppercase" /> */}
            <AutoComplete onChange={onChangeLocation} />
          </div>
          <div className="mb-4">
            <p className="text-sm text-orange mb-4">Distance</p>
            <div className="mb-4">
              <ReactSlider
                value={distance}
                min={0}
                max={1000}
                onChange={(value) =>
                  dispatch(
                    SetCriteriaAction({
                      key: 'distance',
                      value: value,
                    }),
                  )
                }
                className="slider-distance"
                thumbClassName="slider-distance-thumb"
                trackClassName="slider-distance-track"
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
            <div className="relative">
              <input
                className="text-base font-medium border w-full rounded-lg border-[#D9D9D9] px-2 py-[5px]"
                onChange={(e) =>
                  dispatch(
                    SetCriteriaAction({
                      key: 'distance',
                      value: Number(e.target.value),
                    }),
                  )
                }
                value={`${distance}`}
              />
              <span className="absolute top-[5px] left-14">
                {milesCheck ? 'Kilometers' : 'Miles'}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="unit-switch" className="flex items-center gap-3">
              <span className="text-sm">Miles</span>
              <Switch
                checked={milesCheck}
                onChange={handleMilesCheck}
                onColor="#FF7350"
                offColor="#FFE8E2"
                onHandleColor="#FF7350"
                offHandleColor="#FF7350"
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={21}
                height={20}
                width={44}
                className="switch-miles"
                id="unit-switch"
              />
              <span className="text-sm">Kilometers</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}

export default Location
