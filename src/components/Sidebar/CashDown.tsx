import { useState } from 'react'
import ReactSlider from 'react-slider'

const CashDown = () => {
  const [cashDown, setCashDown] = useState(2000)
  const [show, setShow] = useState(true)

  return (
    <div className="mb-6">
      <div
        className="text-base text-[#699E49] font-medium relative cursor-pointer pb-3 border-b-2 border-[#ADE28D] mb-6"
        onClick={() => setShow((value) => !value)}
      >
        Cash Down{' '}
        {show ? (
          <span className="absolute right-0 top-[5px] text-[#64748B]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={8}
              height={9}
              viewBox="0 0 8 9"
              fill="none"
            >
              <path
                d="M1 7.5L4 4.5L1 1.5"
                stroke="#64748B"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 1.5L4 4.5L7 7.5"
                stroke="#64748B"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <span className="absolute right-0 top-[5px] text-[#64748B]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={11}
              height={12}
              viewBox="0 0 11 12"
              fill="none"
            >
              <path
                d="M1.51465 6.00024L5.75729 6.00024L5.75729 1.7576"
                stroke="#64748B"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 6.00024L5.75736 6.00024L5.75736 10.2429"
                stroke="#64748B"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
      {show && (
        <div className="mb-6">
          <div className="mb-2">
            <ReactSlider
              value={cashDown}
              min={2000}
              max={12000}
              onChange={(value: number) => {
                setCashDown(value)
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
              value={cashDown}
              onChange={(e) => setCashDown(Number(e.target.value))}
            />
            <span className="absolute left-[23px] top-1/4 text-[12px]">$</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CashDown
