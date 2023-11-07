// import CashDown from './CashDown'
import Drivetrain from './Drivetrain'
import Location from './Location'
// import MonthlyPayment from './MonthlyPayment'
import Powertrain from './Powertrain'
import PriceRange from './PriceRange'
import Search from './Search'
import YearAndMileage from './YearAndMileage'

const Sidebar = () => {
  return (
    <div className="sidebar mx-6 max-w-[352px]">
      <div className="filter bg-white rounded-lg px-6 py-5 mb-5">
        <h2 className="text-xl text-primary font-bold pb-5 border-b-2 border-accent mb-6">
          Vehicle Information
        </h2>
        <Search />
        <YearAndMileage />
        <Powertrain />
        <Drivetrain />
      </div>
      <Location />
      <div className="filter bg-white rounded-lg px-6 py-5 mb-5">
        <h2 className="text-xl text-[#49762D] font-bold pb-6 mb-6 relative border-b-2 border-[#89C664]">
          Financial Information
        </h2>
        <PriceRange />
        {/* <CashDown />
        <MonthlyPayment /> */}
      </div>
      {/* <div className="filter bg-white rounded-lg px-6 py-5">
        <h2 className="text-xl text-orange font-bold relative ">
          Additional Filters{' '}
          <span className="absolute right-0 top-[5px] text-[#64748B]">
            <IoMdAdd className="w-3 h-3" />
          </span>
        </h2>
      </div> */}
    </div>
  )
}

export default Sidebar
