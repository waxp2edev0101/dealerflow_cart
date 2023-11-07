import { FaMapMarkerAlt } from 'react-icons/fa'
import { connect, useDispatch, useSelector } from 'react-redux'
import type { AnyAction, Dispatch } from 'redux'
import { bindActionCreators } from 'redux'

import type { RootState } from '@/common/models'
import {
  ClearCriteriaAction,
  SetCriteriaAction,
  SetCriteriaListAction,
} from '@/common/state/criteria/criteriaActions'
import type {
  CriteriaActionProps,
  CriteriaKey,
} from '@/common/state/criteria/criteriaActions'
import type { LocationState } from '@/common/state/location/locationState'
import { ListProductsAction } from '@/common/state/product/productActions'
import type { IProduct } from '@/common/state/product/productState'
import ChangeLocationForm from '@/pages/Landing/ChangeLocationForm'

import ChipBar from '../ChipBar'
import type { Option } from '../Dropdown'
import Dropdown from '../Dropdown'
import Modal from '../Modal'
import Pagination from '../Pagination'
// import PaginationUnlimited from '../PaginationUnlimited'

const options = [
  { label: 'Lowest price', value: 1 },
  { label: 'Highest price', value: -1 },
]

export interface IFilter {
  label?: string
  category?: CriteriaKey
  show?: boolean
  bgColor?: string
}
const ProductList = (props: {
  count?: number
  loading?: boolean
  location?: LocationState
  products?: IProduct[]
  listProducts: (params: any) => Promise<IProduct[]>
  setCriteriaList: (c: CriteriaActionProps[]) => void
}) => {
  const criteria = useSelector((state: RootState) => state.app.criteria)
  const dispatch = useDispatch()

  const setCriteria = (key: CriteriaKey, value: any) =>
    dispatch(SetCriteriaAction({ key, value }))

  const handleClearAllFilter = () => {
    dispatch(ClearCriteriaAction())
  }

  const handleChangeOrder = (opt: Option) => {
    setCriteria('listing_price_order', opt.value)
  }

  return (
    <div className="w-full pr-5">
      <div className="flex justify-between py-5 border-b border-t w-full px-5">
        <div className="flex gap-5 flex-wrap">
          <ChipBar />
          {Object.values(criteria?.enable || []).includes(true) && (
            <button
              onClick={handleClearAllFilter}
              className="text-sm text-primary"
            >
              Clear All
            </button>
          )}
        </div>
        <div>
          <Dropdown options={options} onChange={handleChangeOrder} />
        </div>
      </div>
      <div className="flex justify-between py-5 border-b w-full px-5 items-center">
        <p className="text-base flex items-center gap-5">
          <span>
            <FaMapMarkerAlt className="text-accent w-4 h-5" />
          </span>
          {props.location?.city}, {props.location?.region_code}
          <Modal
            title={'Change Location'}
            body={({ toggleModal }) => (
              <ChangeLocationForm toggleModal={toggleModal} />
            )}
          >
            <span className="text-[#4038FF] cursor-pointer">
              Change Location
            </span>
          </Modal>
        </p>

        <p className="text-accent text-base">{props.count} Vehicles</p>
      </div>
      {!props.loading && props.products && (
        // <PaginatedItems items={props.products} itemsPerPage={20} />
        <Pagination items={props.products} />
        // <PaginationUnlimited />
      )}
      {props.loading && <>Loading...</>}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  count: state.app.product.count,
  loading: state.view.general.loading,
  location: state.app.location,
  products: state.app.product.products,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  listProducts: bindActionCreators(ListProductsAction, dispatch),
  setCriteriaList: bindActionCreators(SetCriteriaListAction, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
