import { useEffect, useState } from 'react'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { LuChevronLast, LuChevronFirst } from 'react-icons/lu'
import './index.css'
import { Link } from 'react-router-dom'

import type { IProduct } from '@/common/state/product/productState'

import ProductCard from '../ProductCard'
// Example items, to simulate fetching from another resources.

const PaginatedItems = ({ items, itemsPerPage }: any) => {
  const [itemOffset, setItemOffset] = useState(0)
  const [selectedPage, setSelectedPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [currentItems, setCurrentItems] = useState([])

  useEffect(() => {
    if (items.length > 0 && itemsPerPage) {
      setPageCount(Math.ceil(items.length / itemsPerPage))
      setCurrentItems(items.slice(itemOffset, itemOffset + itemsPerPage))
    }
  }, [items])

  useEffect(() => {
    setCurrentItems(items.slice(itemOffset, itemOffset + itemsPerPage))
  }, [currentPage, itemOffset])

  // Invoke when user click to request another page.
  const handlePageClick = (e: any, action: any) => {
    e.preventDefault()
    let newOffset = 0
    let current = currentPage
    if (action === 'first') {
      newOffset = 0
      current = 0
    } else if (action === 'prev') {
      if (currentPage > 0) {
        current -= 1
        newOffset = (current * itemsPerPage) % items.length
      }
    } else if (action === 'next') {
      if (currentPage < pageCount - 1) {
        current += 1
        newOffset = (current * itemsPerPage) % items.length
      }
    } else {
      current = pageCount - 1
      newOffset = (current * itemsPerPage) % items.length
    }
    setSelectedPage(current)
    setCurrentPage(current)
    setItemOffset(newOffset)
  }

  return (
    <>
      <div
        className="grid grid-cols-4 gap-5 auto-rows-max py-5"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(313px, 1fr))',
        }}
      >
        {currentItems.map((product: IProduct, index) => (
          <Link to={`/cart/${product.id}`} key={`${product?.id}${index}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      {pageCount > 1 && (
        <div className="flex justify-end items-center gap-8 mt-5">
          <span className="text-[#3B2F66] text-base">
            1-{pageCount} of {currentPage + 1}
          </span>
          <select
            className="text-[#3B2F66] w-[80px] text-base py-2 px-4 border border-[#3B2F66] rounded"
            value={selectedPage}
            onChange={(e) => {
              setSelectedPage(parseInt(e.target.value, 10))
              setCurrentPage(parseInt(e.target.value, 10))
              const newOffset =
                (parseInt(e.target.value, 10) * itemsPerPage) % items.length
              setItemOffset(newOffset)
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

export default PaginatedItems
