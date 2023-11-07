import { useContext } from 'react'
import ReactSlider from 'react-slider'
import { VehicleContext } from '@/common/contexts'
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/Elements'

const LoanTerm = () => {
  const { buildParam, setBuildParam } = useContext(VehicleContext)

  const setLoanTerm = (value: any) => {
    const param = {
      ...buildParam,
      loanTermMax: value[1],
      loanTermMin: value[0],
    }
    setBuildParam(param)
  }

  return (
    <div>
      <p className="mb-3 text-[12px] font-[500] leading-[120%] tracking-[0.4px]">
        Loan Term
      </p>
      <div className="">
        <div className="flex justify-between text-[12px] text-[#94A3B8]">
          <p>From</p>
          <p>To</p>
        </div>
        <div className="mb-2">
          <ReactSlider
            value={[buildParam.loanTermMin, buildParam.loanTermMax]}
            min={12}
            max={72}
            onChange={(value: any) => {
              console.log('value: ', value)
              setLoanTerm(value)
            }}
            className="slider-price-range"
            thumbClassName="slider-price-range-thumb"
            trackClassName="slider-price-range-track"
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
        <div className="flex justify-between text-[#0F172A] text-sm">
          <p>{buildParam.loanTermMin}</p>
          <p>{buildParam.loanTermMax}</p>
        </div>
      </div>
    </div>
  )
}

export default LoanTerm
