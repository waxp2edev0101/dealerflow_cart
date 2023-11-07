export interface IProduct {
  features: string
  featureType: number
  id: any
  image: string
  interestRate: number
  level: string
  model: string
  monthly: string
  price: string
  speed: string
  mileage?: string
  stockNumber: string
  term: number
  thumbs: string[]
  details?: any
}

export interface IProperty {
  label: string
  id?: number
}
export interface ProductState {
  product?: IProduct
  products?: IProduct[]
  count?: number
  makes?: IProperty[]
  models?: IProperty[]
  trims?: IProperty[]
  range: {
    price?: number[]
    mileage?: number[]
  }
}

const productInitialState: ProductState = {
  count: 0,
  makes: undefined,
  models: undefined,
  product: undefined,
  products: undefined,
  range: {
    mileage: [0, 0],
    price: [0, 0],
  },
  trims: undefined,
}

export default productInitialState
