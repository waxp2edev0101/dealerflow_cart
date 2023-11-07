/* eslint-disable sort-keys-fix/sort-keys-fix */
import { useEffect, useState } from 'react'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { IoMdAdd, IoMdClose } from 'react-icons/io'
import { useSelector, connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import type { AnyAction, Dispatch } from 'redux'
import { bindActionCreators } from 'redux'


import SpeedMeter from '@/assets/speedmeter.png'
import Transmission from '@/assets/transmission.png'
import { VehicleContext } from '@/common/contexts'
import type { RootState } from '@/common/models'
import { getEstimatedPayment } from '@/common/services/apiService'
// import ProductMap from '@/components/ProductMap'
import { GetProductAction } from '@/common/state/product/productActions'
import Slider from '@/components/Slider'
import DefaultLayout from '@/layout/DefaultLayout'
// import type { ICoordinate } from '@/utils/common'

import BuildPayment from './BuildPayment'
import OverviewAndFeatures from './OverviewAndFeatures'
import type { BuildPaymentParam, EstimatedPayment } from './type'

interface EstimatedPaymentResponse {
  status_code?: number
  data?: EstimatedPayment
  message?: string
}

interface VehicleProps {
  getProduct: (id: string) => void
}
const Vehicles = (props: VehicleProps) => {
  // const params = new URLSearchParams(document.location.search)
  // const productId = params.get('id')
  const { id } = useParams()

  const [buildParam, setBuildParam] = useState<BuildPaymentParam>({
    loanTermMin: 12,
    loanTermMax: 72,
    downpayment: 1000,
    listPrice: 0,
    vehicleVin: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleTrim: '',
    monthlyPayment: 1000,
    income: 36000,
    postCode: '',
    creditScore: 300,
    tradeinValue: 1000,
    country: 'US',
  })

  const [, setEstimating] = useState(false)
  const [estimatedPayment, setEstimatedPayment] = useState<EstimatedPayment>({
    TotalCostofOwnership: 0,
    MonthlyPayment: 0,
    Term: 0,
    InterestRate: 0,
    CostofInterest: 0,
  })

  const generatePayment = async () => {
    console.log('generate payment function')
    const params = {
      LoanTermMin: buildParam.loanTermMin,
      LoanTermMax: buildParam.loanTermMax,
      Downpayment: buildParam.downpayment,
      ListPrice: product?.price,
      VehicleVin: product?.details.vin,
      VehicleMake: product?.details.vehicle_make,
      VehicleModel: product?.details.vehicle_model,
      VehicleTrim: product?.details.vehicle_trim,
      Income: buildParam.income,
      PostCode: product?.details.va_seller_zip,
      CreditScore: buildParam.creditScore,
      TradeinValue: buildParam.tradeinValue,
      Country: product?.details.va_seller_country,
    }

    setEstimating(true)
    getEstimatedPayment(params)
      .then((res: any) => {
        console.log('response: ', res)
        if (res.status === 200) {
          const resData: EstimatedPaymentResponse =
            res.data as EstimatedPaymentResponse
          if (resData.status_code === 200) {
            setEstimatedPayment(resData.data!)
          }
        }
      })
      .catch(() => {
        setEstimating(false)
      })
  }

  const product = useSelector((state: RootState) => state.app.product.product)
  const location = useSelector((state: RootState) => state.app.location)
  const [showEstimatedPayment, setShowEstimatedPayment] = useState(true)

  // const [coordiante, setCoordinate] = useState<ICoordinate>({
  //   latitude: 0,
  //   longitude: 0,
  // })
  useEffect(() => {
    console.log('product: ', product)
    if (!product || String(product.id) !== id) return
    generatePayment()
  }, [product])

  useEffect(() => {
    console.log('product id is', id)
    if (id) {
      props.getProduct(id)
    }
  }, [id])

  if (!product) return <h3>Loading...</h3>

  return (
    <DefaultLayout logo={false}>
      <VehicleContext.Provider value={{ buildParam, setBuildParam }}>
        <div className="flex justify-between gap-[36.5px] px-[48px] w-full">
          <div className="flex flex-col gap-[32px] w-4/5 overflow-hidden pb-[0rem]">
            <div className="bg-white rounded-[8px] px-[24px] pt-[24px] pb-[36px] flex flex-col gap-[24px]">
              <Link to={'/'} className="flex items-center text-accent gap-1">
                <HiOutlineArrowNarrowLeft />{' '}
                <span className="font-[450] tracking-[0.025rem]">
                  Back to results
                </span>
              </Link>
              <div className="flex justify-between w-full font-[500] leading-[120%] tracking-[0.4px]">
                <h2 className="text-[#0F172A] text-[2rem]">
                  {product.details?.vehicle_make}{' '}
                  {product.details?.vehicle_model}{' '}
                  {product.details?.vehicle_year}
                </h2>
                <p className="text-[60px] text-[#89C664]">{product?.price}</p>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-[4px]">
                  <span>
                    <img
                      width={14}
                      height={14}
                      src={Transmission}
                      alt="speedometor"
                    />
                  </span>
                  <span className="text-sm font-normal">
                    {product.details.vehicle_transmission_type || 'Automatic'}
                  </span>
                </span>
                <span className="flex items-center gap-[4px]">
                  <span>
                    <img
                      width={14}
                      height={14}
                      src={SpeedMeter}
                      alt="speedometor"
                    />
                  </span>
                  <span className="text-sm font-normal text-[#676973]">
                    {product?.speed}{' '}
                    {location.country_code?.toLowerCase() === 'us'
                      ? `km`
                      : `mile`}
                  </span>
                </span>
              </div>
              <Slider product={product!} />
            </div>
            <div className="bg-white rounded-lg pt-[24px] px-[48px] pb-[36px]">
              <OverviewAndFeatures product={product} />
            </div>
          </div>
          <div className="flex flex-col gap-[20px] w-1/5 min-w-[328px]">
            <div
              className={`bg-[#EAEDFF] border border-[#5E78FF] pt-[16px] px-[20px] ${
                showEstimatedPayment ? 'pb-[20px]' : 'pb-[16px]'
              } rounded-lg flex flex-col gap-[20px]`}
            >
              <p
                onClick={() => setShowEstimatedPayment((value) => !value)}
                className="flex justify-between items-center w-full cursor-pointer"
              >
                <span className="font-semibold text-[#2D2332]">
                  Estimated Payment
                </span>{' '}
                {showEstimatedPayment ? (
                  <span>
                    <IoMdClose className="text-accent" />
                  </span>
                ) : (
                  <span>
                    <IoMdAdd className="text-accent" />
                  </span>
                )}
              </p>
              {showEstimatedPayment && (
                <>
                  <p className="text-[#4357BE] text-center pb-[20px] font-semibold text-[28px] border-b border-[#D7D7D9]">
                    ${estimatedPayment.MonthlyPayment}
                    <span className="text-[12px]">
                      {product?.details.va_seller_country === 'USA'
                        ? 'USD'
                        : 'CAD'}
                      /Month
                    </span>
                  </p>
                  <div className="border-b border-[#D7D7D9] pb-[20px]">
                    <p className="text-black font-circular text-xs leading-5">
                      Interest Rate
                    </p>
                    <p className="text-[#4357BE] text-center font-semibold text-[24px]">
                      {estimatedPayment.InterestRate}
                      {'% '}
                      <span className="text-[12px]">APR 48 months</span>
                    </p>
                  </div>

                  <div className="border-b border-[#D7D7D9] pb-[20px]">
                    <p className="text-black font-circular text-xs leading-5">
                      Total Cost of Ownership (Vehicle + Interest) *
                    </p>
                    <p className="text-[#4357BE] text-center font-semibold text-[24px]">
                      ${estimatedPayment.TotalCostofOwnership}
                      {product?.details.va_seller_country === 'USA'
                        ? ' USD'
                        : ' CAD'}
                    </p>
                  </div>

                  <div className="border-b border-[#D7D7D9] pb-[20px]">
                    <p className="text-black font-circular text-xs leading-5">
                      Cost of Interest
                    </p>
                    <p className="text-[#4357BE] text-center font-semibold text-[24px]">
                      ${estimatedPayment.CostofInterest}
                      {product?.details.va_seller_country === 'USA'
                        ? ' USD'
                        : ' CAD'}
                    </p>
                  </div>

                  <div className="flex gap-[8px] border-b border-[#D7D7D9] pb-[20px]">
                    {/* <img src={Map} alt="" /> */}
                    {/* <div className="w-[144px] h-[144px] border-2 rounded-lg border-[#4357BE] [&_.mapboxgl-ctrl]:hidden overflow-hidden">
                      <ProductMap coordinate={coordiante} />
                    </div> */}

                    <div className="flex-1 text-[16px]">
                      <p className="font-semibold">
                        {product.details.va_seller_name}
                      </p>
                      <p className="font-[450]">
                        {product.details.va_seller_address}
                      </p>
                      <p className="font-[450]">
                        {product.details.va_seller_city},{' '}
                        {product.details.va_seller_country}
                      </p>
                      <p className="font-[450]">
                        {product.details.va_seller_phones}
                      </p>
                    </div>
                  </div>
                  <p className="text-[12px] font-[450] text-[20px] leading-normal">
                    <span className="font-semibold">* Disclaimer:</span>{' '}
                    Additional Taxes and Fees may apply
                  </p>
                  <div>
                    <button className="btn bg-[#5E78FF] font-[450] w-full py-4 rounded-lg text-white">
                      <a
                        href={`${product.details.listing_vdp_url}`}
                        target="_blank"
                      >
                        Contact Dealer
                      </a>
                    </button>
                  </div>
                </>
              )}
            </div>

            <BuildPayment generatePayment={generatePayment} />
          </div>
        </div>
      </VehicleContext.Provider>
    </DefaultLayout>
  )
}

export default connect(null, (dispatch: Dispatch<AnyAction>) => ({
  getProduct: bindActionCreators(GetProductAction, dispatch),
}))(Vehicles)
