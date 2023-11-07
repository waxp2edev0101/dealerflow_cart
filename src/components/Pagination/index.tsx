import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { LuChevronLast, LuChevronFirst } from 'react-icons/lu'
import { useSelector, useDispatch } from 'react-redux'
import './index.css'
import { Link } from 'react-router-dom'

import type { RootState } from '@/common/models'
import { SetPageAction } from '@/common/state/general/generalActions'
import type { IProduct } from '@/common/state/product/productState'

import ProductCard from '../ProductCard'
// Example items, to simulate fetching from another resources.

const Pagination = ({ items }: any) => {
  const count = useSelector((state: RootState) => state.app.product.count) || 0
  const page = useSelector((state: RootState) => state.view.general.page) || 0

  const pageCount = Math.ceil(count / 20)

  const dispatch = useDispatch()

  const setCurrentPage = (page: number) => {
    dispatch(SetPageAction(page))
  }
  const handlePageClick = (e: any, action: any) => {
    e.preventDefault()

    if (action === 'first') {
      setCurrentPage(0)
    } else if (action === 'prev') {
      if (page > 1) setCurrentPage(page - 1)
    } else if (action === 'next') {
      if (page < pageCount - 1) setCurrentPage(page + 1)
    } else {
      setCurrentPage(pageCount - 1)
    }
  }
  return (
    <>
      <div
        className="grid grid-cols-4 gap-5 auto-rows-max py-5"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(313px, 1fr))',
        }}
      >
        {items.map((product: IProduct, index: number) => (
          <Link to={`/vehicles/${product.id}`} key={`${product?.id}${index}`}>
            <ProductCard product={product} />
          </Link>
        ))}
        {items.length === 0 && <>No Product</>}
      </div>
      {pageCount > 0 && (
        <div className="flex justify-end items-center gap-8 mt-5">
          <span className="text-[#3B2F66] text-base">
            {page * 20 + 1}-{(page + 1) * 20} of {count}
          </span>
          <select
            className="text-[#3B2F66] w-[80px] text-base py-2 px-4 border border-[#3B2F66] rounded"
            value={page}
            onChange={(e) => {
              setCurrentPage(parseInt(e.target.value, 10))
            }}
          >
            {Array.from({ length: pageCount }, (_, i) => (
              <option key={i} value={i}>
                {i + 1}
              </option>
            ))}
          </select>
          <span className="text-[#3B2F66] text-base">Rows per page</span>
          <div className="flex items-center gap-3">
            <button onClick={(e) => handlePageClick(e, 'first')}>
              <LuChevronFirst className="w-6 h-6" />
            </button>
            <button onClick={(e) => handlePageClick(e, 'prev')}>
              <GrFormPrevious className="w-6 h-6" />
            </button>
            <button onClick={(e) => handlePageClick(e, 'next')}>
              <GrFormNext className="w-6 h-6" />
            </button>
            <button onClick={(e) => handlePageClick(e, 'last')}>
              <LuChevronLast className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Pagination
