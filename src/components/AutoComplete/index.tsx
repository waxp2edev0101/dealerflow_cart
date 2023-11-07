import * as _ from 'lodash'
import mapboxgl from 'mapbox-gl'
import { useCallback, useEffect, useRef, useState } from 'react'

import { apiGetRequest } from '@/utils/apiRequests'

import { SearchIcon } from '../Elements'

interface AutoCompleteProps {
  onChange: (value: string) => void
}

const MAPBOX_API_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

export default function AutoComplete({ onChange }: AutoCompleteProps) {
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const autocompleteRef = useRef<HTMLDivElement>(null)
  const [searchValue, setSearchValue] = useState('')
  const [searchLocations, setSearchLocations] = useState<any[]>([])
  const [showDropdown, setShowDropdown] = useState(true)

  const fetchLocations = useCallback(async () => {
    if (!searchValue) {
      setSearchLocations([])
      return
    }
    const res = await apiGetRequest(
      `${MAPBOX_API_URL}/${searchValue}.json?limit=10&language=en-US&access_token=${mapboxgl.accessToken}`,
    )
    if (res.status === 200 && res.data) {
      setSearchLocations(res.data.features)
    }
  }, [searchValue])

  useEffect(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(fetchLocations, 500)
  }, [searchValue])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className="bg-white w-full rounded-lg border border-[#5E78FF] relative"
      ref={autocompleteRef}
    >
      <div className="px-5 h-[60px] flex items-center gap-4">
        <SearchIcon />
        <input
          type="text"
          className="w-full placeholder:text-[#B8B8B8] text-base"
          placeholder="ZIP/Postal Code"
          value={searchValue}
          onChange={({ target }) => {
            setSearchValue(target.value)
            setShowDropdown(true)
          }}
        />
      </div>

      {showDropdown && (
        <ul className="p-6 pt-4 flex flex-col gap-3 border-t border-[#5E78FF] empty:hidden absolute bg-white z-10 border border-[#5E78FF]">
          {searchLocations.map((location, key) => (
            <li key={key} className="text-[#644C70] ml-4 cursor-pointer">
              <span className="hover:bg-[#EFF1FD] h-14 px-4 flex items-center rounded-lg justify-between">
                {_.truncate(location['place_name_en-US'], { length: 32 })}

                <button
                  type="button"
                  onClick={() => {
                    setSearchValue(location['place_name_en-US'])
                    onChange?.(location)
                    setShowDropdown(false)
                  }}
                  className="border border-[#4B76C2] bg-[#5E78FF] py-1 px-2 rounded flex items-center text-sm font-medium text-white"
                >
                  Select
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
