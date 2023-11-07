import type { IProduct } from '@/common/state/product/productState'

export interface OverviewAndFeaturesProps {
  product: IProduct
}
const OverviewAndFeatures = (props: OverviewAndFeaturesProps) => {
  const { product } = props
  return (
    <div className="leading-[120%] tracking-[0.4px] font-[500]">
      <p className="text-[32px] my-[17px] pb-[16px] border-b-[1px] border-[#D9D9D9] pb-1">
        Overview & Features
      </p>
      <p className="text-[28px] my-[46px]">Overview</p>
      <section className="grid grid-cols-4 gap-[8px]">
        <div>
          <p className="text-accent text-[20px] font-medium mb-[24px]">
            Engine & Performance
          </p>
          <ul className="font-[450]">
            <p className="font-normal leading-8">
              {props.product.details.vehicle_engine}
            </p>
            <p className="font-normal leading-8">
              {props.product.details.vehicle_transmission}
            </p>
            <p className="font-normal leading-8">
              {props.product.details.drivetrain}
            </p>
            <p className="font-normal leading-8">
              {props.product.details.vehicle_fuel_efficiency}
            </p>
          </ul>
        </div>
        <div>
          <p className="text-accent text-[20px] font-medium mb-[24px]">
            Colors
          </p>
          <ul className="font-[450]">
            <p className="font-normal leading-8">
              Exterior: {props.product.details.vehicle_color_exterior}
            </p>
            <p className="font-normal leading-8">
              Interior: {props.product.details.vehicle_color_interior}
            </p>
          </ul>
        </div>
        <div>
          <p className="text-accent text-[20px] font-medium mb-[24px]">Body</p>
          <ul className="font-[450]">
            <p className="font-normal leading-8">
              {props.product.details.vehicle_type}
            </p>
            <p className="font-normal leading-8">
              {props.product.details.vehicle_doors}
            </p>
          </ul>
        </div>
      </section>
      <hr className="my-[46px] border-[#D9D9D9]" />
      <section className="grid grid-cols-4 gap-[8px]">
        <div>
          <p className="text-accent text-[20px] font-medium w-full mb-[24px]">
            Comfort & Convenience
          </p>
          <ul>
            <p className="font-normal leading-8">
              Bed Style: {props.product.details.vehicle_truck_bed_style}
            </p>
            <p className="font-normal leading-8">
              Truck Style: {props.product.details.vehicle_truck_cab_style}
            </p>
          </ul>
        </div>
        <div>
          <p className="text-accent text-[20px] font-medium w-full mb-[24px]">
            Engine
          </p>
          <ul>
            <p className="font-normal leading-8">
              Fuel: {props.product.details.vehicle_fuel_type}
            </p>
            <p className="font-normal leading-8">
              Cylinder: {props.product.details.vehicle_engine_cylinders}
            </p>
            <p className="font-normal leading-8">
              Size: {props.product.details.vehicle_engine_size}
            </p>
          </ul>
        </div>
        <div>
          <p className="text-accent text-[20px] font-medium w-full mb-[24px]">
            Exterior
          </p>
          <ul>
            <p className="font-normal leading-8">Fog Lights</p>
            <p className="font-normal leading-8">Heated Door Mirrors</p>
            <p className="font-normal leading-8">Premium Wheels</p>
          </ul>
        </div>
        <div>
          <p className="text-accent text-[20px] font-medium w-full mb-[24px]">
            Infotainment
          </p>
          <ul>
            {product.details.listing_features &&
              product.details?.listing_features
                .split(',')
                .map((item: string, key: number) => (
                  <p className="font-normal leading-8" key={key}>
                    {item}
                  </p>
                ))}
            <p className="font-normal leading-8">
              {props.product.details.vehicle_transmission_speed}
            </p>
          </ul>
        </div>
      </section>
      <hr className="my-[46px] border-[#D9D9D9]" />
      <section className="grid grid-cols-4 gap-[8px]">
        <div>
          <p className="text-accent text-[20px] font-medium w-full mb-[24px]">
            Interior
          </p>
          <ul>
            <p className="font-normal leading-8">Coming Home Device</p>
            <p className="font-normal leading-8">Keyless Entry/Locking</p>
            <p className="font-normal leading-8">
              Keyless Start/Remote Engine Start
            </p>
            <p className="font-normal leading-8">Power Closing Doors</p>
            <p className="font-normal leading-8">Power Closing Liftgate</p>
          </ul>
        </div>
        <div>
          <p className="text-accent text-[20px] font-medium w-full mb-[24px]">
            Saftey & Driver Assist
          </p>
          <ul>
            <p className="font-normal leading-8">Eletric</p>
          </ul>
        </div>
        <div>
          <p className="text-accent text-[20px] font-medium w-full mb-[24px]">
            Transmission
          </p>
          <ul>
            <p className="font-normal leading-8">
              {props.product.details.vehicle_transmission_type}
            </p>
            <p className="font-normal leading-8">
              {props.product.details.vehicle_transmission_speed}
            </p>
          </ul>
        </div>
      </section>
      <hr className="my-[46px] border-[#D9D9D9]" />
      <p className="text-[28px] mb-[23px]">Seller Details</p>
      <section className="grid grid-cols-4 gap-[8px]">
        <div>
          <p className="text-accent text-[20px] font-medium mb-[24px]">
            {props.product.details.va_seller_name}
          </p>
          <ul className="font-[450]">
            <p className="font-normal leading-8">
              {props.product.details.va_seller_address}
            </p>
            <p className="font-normal leading-8">
              {`${props.product.details.va_seller_city}, ${props.product.details.va_seller_state}`}
            </p>
            {props.product.details.va_seller_phones &&
              props.product.details.va_seller_phones
                .split(',')
                .map((item: any, key: number) => (
                  <p className="font-normal leading-8" key={key}>
                    {item}
                  </p>
                ))}
            <p className="font-normal leading-8 text-[#5E78FF]">
              <a href={`${product.details.listing_vdp_url}`} target="_blank">
                Contact Dealer
              </a>
            </p>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default OverviewAndFeatures
