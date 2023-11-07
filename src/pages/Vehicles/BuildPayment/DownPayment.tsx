import { useContext } from 'react'
import { VehicleContext } from '@/common/contexts'
import InputWithSingleValue from '@/components/InputWithSingleValue'

const DownPayment = () => {
  const { buildParam, setBuildParam } = useContext(VehicleContext)
  const setDownpayment = (value: number) => {
    const param = {...buildParam, downpayment: value}
    setBuildParam(param)
  }
  return (
    <div>
      <p className="mb-3 text-[12px] font-[500] leading-[120%] tracking-[0.4px]">
        Down Payment
      </p>
      <div className="">
        <div className="flex justify-between text-[12px] text-[#94A3B8]">
          <p>From</p>
          <p>To</p>
        </div>
        <InputWithSingleValue
          defaultInputValue={buildParam.downpayment}
          sliderRange={[1000, 12000]}
          slider={true}
          label=""
          showRange={true}
          showCurrencySymbol={true}
          setValue={setDownpayment}
        />
      </div>
    </div>
  )
}

export default DownPayment
