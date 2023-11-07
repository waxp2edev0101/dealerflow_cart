import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactSlider from 'react-slider'

import type { RootState } from '@/common/models'
import { SetCriteriaAction } from '@/common/state/criteria/criteriaActions'
import ButtonGroup from '@/components/ButtonGroup'
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/Elements'
import type { MapContainerRef } from '@/components/MapContainer'
import MapContainer from '@/components/MapContainer'

interface ChangeLocationFormProps {
  toggleModal: () => void
}

export default function ChangeLocationForm({
  toggleModal,
}: ChangeLocationFormProps) {
  const dispatch = useDispatch()
  const [location, setLocation] = useState('')
  const mapContainer = useRef<MapContainerRef>(null)
  const distance =
    useSelector((state: RootState) => state.app.criteria.criteria.distance) || 0

  const handleApply = () => {
    if (mapContainer.current && location) {
      toggleModal?.()
      mapContainer.current?.confirm()
    }
  }
  const onChangeLocation = () => setLocation('location')
  return (
    <form onClick={(e) => e.preventDefault()}>
      <div className="my-10 h-[400px] bg-slate-500 relative">
        <MapContainer ref={mapContainer} onChange={onChangeLocation} />
      </div>
      <p className="text-sm text-orange mb-4">Distance: {distance}</p>
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
      <ButtonGroup className="gap-6">
        <button
          onClick={() => {
            setLocation('')
            toggleModal?.()
          }}
          className="rounded-lg border border-[#E2DEDD] bg-[#EFEBE9] w-[125px] h-[60px] text-[#84736F] text-xl font-medium"
        >
          Cancel
        </button>
        <button
          disabled={!location}
          className="rounded-lg border border-[rgba(130, 100, 65, 0.10)] bg-[#FFD750] w-[125px] h-[60px] text-[#826441] text-xl font-medium disabled:text-[#BAABA7] disabled:bg-[#EFEBE9]"
          onClick={handleApply}
        >
          Apply
        </button>
      </ButtonGroup>
    </form>
  )
}
