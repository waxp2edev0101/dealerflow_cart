import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'

import type { ICoordinate } from '@/utils/common'

interface ProductMapProps {
  coordinate: ICoordinate
}
const ProductMap = (props: ProductMapProps) => {
  const mapContainer = useRef(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (map.current) return
    const lng = props.coordinate.longitude || 0
    const lat = props.coordinate.latitude || 0

    if (lng === 0 && lat === 0) return

    const initialMap = new mapboxgl.Map({
      center: [lng, lat],
      container: mapContainer.current!,
      scrollZoom: true,
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 5,
    })
    initialMap.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    )
  }, [props.coordinate])
  return <div ref={mapContainer}></div>
}

export default ProductMap
