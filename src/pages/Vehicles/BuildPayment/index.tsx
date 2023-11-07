import { useState, useContext } from 'react'
import { IoMdAdd, IoMdClose } from 'react-icons/io'

import { VehicleContext } from '@/common/contexts'
import InputWithSingleValue from '@/components/InputWithSingleValue'

import type { BuildPaymentParam } from '../type'

import DownPayment from './DownPayment'
import LoanTerm from './LoanTerm'

interface BuildPaymentProps {
  generatePayment: () => void
}

const BuildPayment = ({ generatePayment }: BuildPaymentProps) => {
  const [show, setShow] = useState(true)
  const { buildParam, setBuildParam } = useContext(VehicleContext)

  const setMonthlyPayment = (value: number) => {
    const param: BuildPaymentParam = { ...buildParam, monthlyPayment: value }
    setBuildParam(param)
    console.log(param)
  }

  const setAnualIncome = (value: number) => {
    const param: BuildPaymentParam = { ...buildParam, income: value }
    setBuildParam(param)
    console.log(param)
  }

  const setCreditScore = (value: number) => {
    const param: BuildPaymentParam = { ...buildParam, creditScore: value }
    setBuildParam(param)
    console.log(param)
  }

  const setTradeinValue = (value: number) => {
    const param: BuildPaymentParam = { ...buildParam, tradeinValue: value }
    setBuildParam(param)
    console.log(param)
  }
  return (
    <div
      className={`bg-white rounded-lg pt-[18px] px-[24px] cursor-pointer ${
        show ? 'pb-[36px]' : 'pb-[18px]'
      }`}
    >
      <p
        onClick={() => setShow((value) => !value)}
        className={`flex justify-between items-center w-full text-accent ${
          show ? 'mb-[24px]' : ''
        } cursor-pointer`}
      >
        <span className="leading-[170%]">Build Payment</span>{' '}
        {show ? (
          <span>
            <IoMdClose />
          </span>
        ) : (
          <span>
            <IoMdAdd />
          </span>
        )}
      </p>
      {show && (
        <div className="flex flex-col gap-[24px]">
          <LoanTerm />
          <DownPayment />
          <InputWithSingleValue
            defaultInputValue={buildParam.monthlyPayment}
            sliderRange={[1000, 12000]}
            slider={true}
            label="Monthly Payment"
            showCurrencySymbol={true}
            setValue={setMonthlyPayment}
          />
          <div className="mb-5">
            <InputWithSingleValue
              defaultInputValue={buildParam.income}
              slider={false}
              label="Anual Income"
              showCurrencySymbol={true}
              setValue={setAnualIncome}
            />
          </div>
          <InputWithSingleValue
            defaultInputValue={buildParam.creditScore}
            slider={true}
            label="Credit Score"
            showCurrencySymbol={false}
            sliderRange={[300, 1400]}
            gradTrack={true}
            toolTip={true}
            setValue={setCreditScore}
          />
          <InputWithSingleValue
            defaultInputValue={buildParam.tradeinValue}
            slider={true}
            label="Estimated Trade-In Value"
            showCurrencySymbol={true}
            sliderRange={[1000, 12000]}
            setValue={setTradeinValue}
          />
          <button
            onClick={generatePayment}
            className="bg-[#FFD750] border border-purple-400 text-[#826441] w-full rounded-lg text-xl border border-[#826441]/[.18] drop-shadow-[0_3px_4px_rgba(0,0,0,0.18)] py-[13px]"
          >
            Generate Payment
          </button>
        </div>
      )}
    </div>
  )
}

export default BuildPayment
