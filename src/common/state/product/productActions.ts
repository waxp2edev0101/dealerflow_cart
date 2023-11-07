import {
  getMakeList,
  getModelList,
  getVehicles,
  getTrimList,
  getMileageRange,
  getPriceRange,
  getVehicle,
  getEstimatedPayment,
} from '@/common/services/apiService'
// import httpService from '@/common/services/httpService'
import createAsyncAction from '@/utils/createAsyncAction'

export enum ProductActionTypes {
  LIST_PRODUCTS = 'LIST_PRODUCTS',
  LIST_MAKES = 'LIST_MAKES',
  LIST_MODELS = 'LIST_MODELS',
  LIST_TRIMS = 'LIST_TRIMS',
  SET_RANGE_MILEAGE = 'SET_RANGE_MILEAGE',
  SET_RANGE_PRICE = 'SET_RANGE_PRICE',
  COUNT_PRODUCTS = 'COUNT_PRODUCTS',
  GET_PRODUCT = 'GET_PRODUCT',
  GET_ESTIMATED_PAYMENT = 'GET_ESTIMATED_PAYMENT',
}

export const GetProductAction: (id: string) => Promise<any> = createAsyncAction(
  ProductActionTypes.GET_PRODUCT,
  (id) => {
    return getVehicle(id)
  },
)
export const ListProductsAction: (params: any[]) => Promise<any[]> =
  createAsyncAction(ProductActionTypes.LIST_PRODUCTS, (params) => {
    return getVehicles(params)
  })

export const CountProductsAction: (params: any[]) => Promise<any[]> =
  createAsyncAction(ProductActionTypes.COUNT_PRODUCTS, (params) => {
    return getVehicles(params)
  })

export const ListMakesAction: (params: any) => Promise<any[]> =
  createAsyncAction(ProductActionTypes.LIST_MAKES, (params) => {
    return getMakeList(params)
  })

export const ListModelsAction: (params: any) => Promise<any[]> =
  createAsyncAction(ProductActionTypes.LIST_MODELS, (params) => {
    return getModelList(params)
  })

export const ListTrimsAction: (params: any) => Promise<any[]> =
  createAsyncAction(ProductActionTypes.LIST_TRIMS, (params) => {
    return getTrimList(params)
  })

export const SetRangeMileageAction: () => Promise<any[]> = createAsyncAction(
  ProductActionTypes.SET_RANGE_MILEAGE,
  () => {
    return getMileageRange()
  },
)
export const SetRangePriceAction: () => Promise<any[]> = createAsyncAction(
  ProductActionTypes.SET_RANGE_PRICE,
  () => {
    return getPriceRange()
  },
)

export const GetEstimatedPaymentAction: (params: any[]) => Promise<any[]> =
  createAsyncAction(ProductActionTypes.GET_ESTIMATED_PAYMENT, (params) => {
    return getEstimatedPayment(params)
  })
