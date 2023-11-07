import type { AnyAction, Reducer } from 'redux'

import { SUCCESS_SUFFIX } from '@/common/constants'

import { ProductActionTypes } from './productActions'
import type { ProductState } from './productState'
import productInitialState from './productState'

const productReducer: Reducer<ProductState> = (
  state: ProductState = productInitialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case `${ProductActionTypes.LIST_PRODUCTS}${SUCCESS_SUFFIX}`:
      const { products, count } = action.payload.data
      console.log(products, count)
      return {
        ...state,
        // count: products?.length || 0,
        count: count ? count : 0,
        products:
          products && products.length > 0
            ? products.map((item: any) => ({
                details: item,
                featureType: item?.vehicle_type,
                features: item?.listing_feature,
                id: item?._id,
                image: item?.photo_urls ? item?.photo_urls.split('|')[0] : '',
                interestRate: 5.99,
                level: item?.vehicle_trim,
                model: item?.vehicle_model,
                monthly: '$1436.99',
                price: item?.listing_price,
                speed: item?.listing_mileage,
                stockNumber: item?.listing_stock,
                term: 60,
                thumbs: item?.photo_urls ? item?.photo_urls.split('|') : [],
              }))
            : [],
      }
    case `${ProductActionTypes.GET_PRODUCT}${SUCCESS_SUFFIX}`:
      const item = action.payload.data
      return {
        ...state,
        product: {
          details: item,
          featureType: item?.vehicle_type,
          features: item?.listing_feature,
          id: item?._id,
          image: item?.photo_urls ? item?.photo_urls.split('|')[0] : '',
          interestRate: 5.99,
          level: item?.vehicle_trim,
          model: item?.vehicle_model,
          monthly: '$1436.99',
          price: item?.listing_price,
          speed: item?.listing_mileage,
          stockNumber: item?.listing_stock,
          term: 60,
          thumbs: item?.photo_urls ? item?.photo_urls.split('|') : [],
        },
      }
    case `${ProductActionTypes.COUNT_PRODUCTS}${SUCCESS_SUFFIX}`:
      if (action.payload.data && action.payload.data.length === 1) {
        const { count } = action.payload.data[0]

        return {
          ...state,
          count,
        }
      } else {
        return {
          ...state,
          count: 0,
        }
      }
    // return state
    case `${ProductActionTypes.LIST_MAKES}${SUCCESS_SUFFIX}`:
      return {
        ...state,
        makes: action.payload.data.map((item: any) => ({
          id: item._id,
          label: item.make,
        })),
        models: [],
        trims: [],
      }

    case `${ProductActionTypes.LIST_MODELS}${SUCCESS_SUFFIX}`:
      const models = action.payload.data
      return {
        ...state,
        models:
          models && models.length > 0
            ? models.map((item: string, index: number) => ({
                id: index,
                label: item,
              }))
            : [],
        trims: [],
      }

    case `${ProductActionTypes.LIST_TRIMS}${SUCCESS_SUFFIX}`:
      const trims = action.payload.data
      return {
        ...state,
        trims:
          trims && trims.length > 0
            ? trims.map((item: any, index: number) => ({
                id: index,
                label: item._id,
              }))
            : [],
      }
    case `${ProductActionTypes.SET_RANGE_MILEAGE}${SUCCESS_SUFFIX}`:
      const { min_listing_mileage, max_listing_mileage } = action.payload.data
      return {
        ...state,
        range: {
          ...state.range,
          mileage: [Number(min_listing_mileage), Number(max_listing_mileage)],
        },
      }
    case `${ProductActionTypes.SET_RANGE_PRICE}${SUCCESS_SUFFIX}`:
      const { min, max } = action.payload.data
      return {
        ...state,
        range: {
          ...state.range,
          price: [Number(min), Number(max)],
        },
      }

    default:
      return state
  }
}

export default productReducer
