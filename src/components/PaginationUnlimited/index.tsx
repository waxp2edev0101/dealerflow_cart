import * as _ from 'lodash'
import { useEffect, useState } from 'react'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import type { RootState } from '@/common/models'
import { SetPageAction } from '@/common/state/general/generalActions'
import type { IProduct } from '@/common/state/product/productState'

import ProductCard from '../ProductCard'

const siblingCount = 5
const limit = 20
const PaginationUnlimited = () => {
  const products = useSelector((state: RootState) => state.app.product.products)
  const page = useSelector((state: RootState) => state.view.general.page) || 0
  const [paginationItems, setPaginationItems] = useState<any[]>([])
  const count = useSelector((state: RootState) => state.app.product.count) || 0
  const lastPage =
    count > siblingCount * limit
      ? page + siblingCount
      : Math.ceil(count / limit)

  const dispatch = useDispatch()
  useEffect(() => {
    setPaginationItems([
      page - siblingCount > 0 ? '...' : '',
      ..._.range(Math.max(page - siblingCount, 0), page),
      ..._.range(page, Math.min(lastPage, page + siblingCount)),
      count > siblingCount * limit + siblingCount ? '...' : '',
    ])
  }, [page])
  const handlePageClick = (value: any) => {
    console.log('change page', value)

    const _page = parseInt(value, 10)
    if (!Number.isNaN(_page)) {
      dispatch(SetPageAction(_page))
    }
  }
  if (!products || products.length === 0)
    return <div className="p-5">No Product</div>
  return (
    <>
      <div
        className="grid grid-cols-4 gap-5 auto-rows-max py-5"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(313px, 1fr))',
        }}
      >
        {products &&
          products.length &&
          products.slice(0, limit).map((product: IProduct, index: number) => (
            <Link to={`/vehicles/${product.id}`} key={`${product?.id}${index}`}>
              <ProductCard product={product} />
            </Link>
          ))}
      </div>
      <div className="flex justify-end items-center gap-8 mt-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (page > 0) dispatch(SetPageAction(page - 1))
            }}
          >
            <GrFormPrevious className="w-6 h-6" />
          </button>
          {paginationItems.map((item, key) => (
            <button
              key={key}
              onClick={() => handlePageClick(item)}
              className={`p-1 ${
                parseInt(item, 10) === page ? 'text-[#4038FF]' : ''
              }`}
            >
              {Number.isNaN(parseInt(item, 10)) ? item : item + 1}
            </button>
          ))}
          <button
            onClick={() => {
              if (page < lastPage) dispatch(SetPageAction(page + 1))
            }}
          >
            <GrFormNext className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  )
}

export default PaginationUnlimited
