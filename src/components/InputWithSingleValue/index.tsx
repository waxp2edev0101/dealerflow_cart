import { useState } from 'react'
import ReactSlider from 'react-slider'
import { Tooltip } from 'react-tooltip'

import { ArrowLeftIcon, ArrowRightIcon } from '../Elements'

interface InputWithSingleValueProps {
  defaultInputValue: number
  label: string
  slider: boolean
  showCurrencySymbol: boolean
  sliderRange?: number[]
  gradTrack?: boolean
  toolTip?: boolean
  showRange?: boolean
  setValue?: (val: number) => void
}

const InputWithSingleValue = ({
  defaultInputValue,
  label,
  slider = false,
  showCurrencySymbol,
  sliderRange,
  gradTrack = false,
  toolTip = false,
  showRange = false,
  setValue = undefined,
}: InputWithSingleValueProps) => {
  const [inputValue, setInputValue] = useState<number>(defaultInputValue)
  return (
    <div>
      <p className="mb-3 text-[12px] font-[500] leading-[120%] tracking-[0.4px]">
        {label}
      </p>
      <div className="">
        {slider && (
          <div className="mb-2">
            <ReactSlider
              value={inputValue}
              min={sliderRange![0]}
              max={sliderRange![1]}
              onChange={(value: any) => {
                console.log('value: ', value)
                setInputValue(value)
                setValue?.(value)
              }}
              className="slider-cash-down"
              thumbClassName="slider-cash-down-thumb"
              trackClassName={
                gradTrack
                  ? 'slider-credit-score-track'
                  : 'slider-cash-down-track'
              }
              // @ts-ignore
              renderThumb={(props: any) => {
                return (
                  <div
                    {...props}
                    className={`${props.className} flex justify-center items-center`}
                    data-tooltip-id="credit-score"
                    data-tooltip-content={`${inputValue}-Fair`}
                  >
                    <span className="flex items-center relative h-full w-full">
                      <ArrowLeftIcon />
                      <ArrowRightIcon />
                    </span>
                    {toolTip && (
                      <Tooltip
                        id="credit-score"
                        variant="light"
                        className="border drop-shadow-sm"
                      />
                    )}
                  </div>
                )
              }}
            />
            {showRange && (
              <div className="flex justify-between items-center">
                <span className="text-[#0F172A] text-sm">
                  ${sliderRange![0]}
                </span>
                <span className="text-[#0F172A] text-sm">
                  ${sliderRange![1]}
                </span>
              </div>
            )}
          </div>
        )}
        <div className="relative">
          <input
            className="text-sm font-medium border w-full rounded-lg border-[#D9D9D9] px-6 py-2"
            value={inputValue}
            onChange={(e) => {
              setInputValue(Number(e.target.value))
              setValue?.(Number(e.target.value))
            }}
          />
          <span className="absolute top-[6px] left-4">
            {showCurrencySymbol ? '$' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InputWithSingleValue
