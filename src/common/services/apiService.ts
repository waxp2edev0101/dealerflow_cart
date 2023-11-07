import { apiGetRequest, apiPostRequest } from '@/utils/apiRequests'

const API_URL = import.meta.env.VITE_API_URL

export const getVehicles = (params: any) => {
  return apiPostRequest(`${API_URL}/vehicles`, params)
}

export const getVehicle = (id: string) => {
  return apiGetRequest(`${API_URL}/vehicle?id=${id}`)
}

export const getPriceRange = () => {
  return apiGetRequest(`${API_URL}/price-range`)
}

export const getYearRange = () => {
  return apiGetRequest(`${API_URL}/year-range`)
}

export const getMileageRange = () => {
  return apiGetRequest(`${API_URL}/mileage-range`)
}

export const getMakeList = (params = []) => {
  return apiPostRequest(`${API_URL}/make-list`, params)
}

export const getModelList = (params: any) => {
  return apiPostRequest(`${API_URL}/models`, params)
}

export const getTrimList = (params: any) => {
  return apiPostRequest(`${API_URL}/trims`, params)
}

export const sendEmail = (params: any) => {
  return apiPostRequest(`https://api.sendgrid.com/v3/mail/send`, params, {
    'Authorization': `Bearer ${import.meta.env.VITE_SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  })
}

export const getEstimatedPayment = (params: any) => {
  return apiPostRequest(`${API_URL}/estimated-payment`, params)
}