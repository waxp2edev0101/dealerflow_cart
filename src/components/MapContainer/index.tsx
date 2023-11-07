import mapboxgl from 'mapbox-gl'
import type { Ref } from 'react'
import { useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5'
import type { MapRef } from 'react-map-gl'
// eslint-disable-next-line import/no-named-as-default
import Map from 'react-map-gl'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/common/models'
import { SetLocationAction } from '@/common/state/location/locationActions'

import GeocoderControl from './geocoder-control'

export interface MapContainerRef {
  confirm: () => void
}
interface MapContainerProps {
  onChange: () => void
}

const MapContainer = forwardRef<MapContainerRef, MapContainerProps>(
  (props, ref: Ref<any>) => {
    const location = useSelector((state: RootState) => state.app.location)
    const dispatch = useDispatch()
    const map = useRef<MapRef | null>(null)
    const mapContainer = useRef(null)
    const TOKEN = mapboxgl.accessToken

    const lng = location?.longitude || 0
    const lat = location?.latitude || 0

    const [zoom, setZoom] = useState(9)
    const [viewState, setViewState] = useState({
      city: '',
      countryCode: '',
      latitude: lat,
      longitude: lng,
      zoom: zoom,
    })

    const handleChangeLocation = (evt: any) => {
      // evt.result.geometry.coordinates [lng, lat]
      // evt.result.place_name
      // evt.result.context[length].short_code
      // console.log('', evt)
      const lengthContext = evt.result.context.length
      props.onChange()
      setViewState((prevState) => ({
        ...prevState,
        city: evt.result.place_name,
        countryCode: evt.result.context[lengthContext - 1]['short_code'],
        latitude: evt.result.geometry.coordinates[1],
        longitude: evt.result.geometry.coordinates[0],
      }))
    }
    useImperativeHandle(ref, () => ({
      confirm() {
        dispatch(
          SetLocationAction({
            city: viewState.city,
            country_code: viewState.countryCode,
            latitude: viewState.latitude,
            longitude: viewState.longitude,
            region_code: '',
          }),
        )
      },
    }))

    return (
      <div className="h-full relative map-container">
        <div
          ref={mapContainer}
          className="h-full [&_.mapboxgl-ctrl] h-[400px] overflow-hidden"
        >
          <Map
            initialViewState={viewState}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={TOKEN}
            ref={map}
          >
            <GeocoderControl
              mapboxAccessToken={TOKEN}
              position="top-left"
              onResult={handleChangeLocation}
            />
          </Map>
        </div>
        <div className="absolute bottom-5 right-5 rounded-t-full rounded-b-full overflow-hidden">
          <button
            className="w-8 h-8 flex items-center justify-center bg-[#FF7350] cursor-pointer"
            onClick={() =>
              setZoom((value) => {
                const newVal = value + 1
                map.current!.setZoom(newVal)
                return newVal
              })
            }
          >
            <IoAddOutline className="w-5 h-5 [&_path]:stroke-[#fff]" />
          </button>
          <span className="flex h-[1px]" />
          <button
            className="w-8 h-8 flex items-center justify-center bg-[#FF7350] cursor-pointer"
            onClick={() =>
              setZoom((value) => {
                const newVal = value - 1
                map.current!.setZoom(newVal)
                return newVal
              })
            }
          >
            <IoRemoveOutline className="w-5 h-5 [&_path]:stroke-[#fff]" />
          </button>
        </div>
      </div>
    )
  },
)

export default MapContainer
