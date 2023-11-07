import { useState } from 'react'
import ReactSlider from 'react-slider'

import { Close, PlusIcon } from '../Elements'

const MonthlyPayment = () => {
  const [monthly, setMonthly] = useState(1200)
  const [show, setShow] = useState(true)

  return (
    <div className="mb-6">
      <div
        className="text-base text-[#699E49] font-medium relative cursor-pointer pb-3 border-b-2 border-[#ADE28D] mb-6"
        onClick={() => setShow((value) => !value)}
      >
        Monthly Payment{' '}
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
          <div className="mb-2">
            <ReactSlider
              value={monthly}
              min={1}
              max={12000}
              onChange={(value: number) => {
                setMonthly(value)
              }}
              className="slider-cash-down"
              thumbClassName="slider-cash-down-thumb"
              trackClassName="slider-cash-down-track"
              renderThumb={(props: any) => {
                return (
                  <div
                    {...props}
                    className={`${props.className} flex justify-center items-center`}
                  >
                    <span className="flex items-center relative h-full w-full">
                      <svg
                        className="absolute"
                        style={{
                          left: '-.5px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={12}
                        viewBox="0 0 9 8"
                        fill="none"
                      >
                        <path
                          d="M3.2594 3.49676L3.97491 2.8401L5.14079 1.7701C5.38777 1.54676 5.80908 1.70676 5.80908 2.02676V4.10343V5.97343C5.80908 6.29343 5.38777 6.45343 5.14079 6.22676L3.2594 4.5001C2.95795 4.22676 2.95795 3.77343 3.2594 3.49676Z"
                          fill="white"
                        />
                      </svg>
                      <svg
                        className="absolute"
                        style={{
                          right: '-.5px',
                          top: '50%',
                          transform: 'translateY(-50%) rotate(180deg)',
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width={12}
                        height={12}
                        viewBox="0 0 9 8"
                        fill="none"
                      >
                        <path
                          d="M3.2594 3.49676L3.97491 2.8401L5.14079 1.7701C5.38777 1.54676 5.80908 1.70676 5.80908 2.02676V4.10343V5.97343C5.80908 6.29343 5.38777 6.45343 5.14079 6.22676L3.2594 4.5001C2.95795 4.22676 2.95795 3.77343 3.2594 3.49676Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>
                )
              }}
            />
          </div>
          <div className="relative">
            <input
              type="number"
              className="text-sm font-medium border w-full rounded-lg border-[#D9D9D9] pl-[30px] px-4 py-2"
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
            />
            <span className="absolute left-[23px] top-1/4 text-[12px]">$</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MonthlyPayment
