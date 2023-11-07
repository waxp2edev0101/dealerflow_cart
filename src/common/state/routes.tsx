import { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import type { Dispatch, AnyAction } from 'redux'

import { ServicesContext } from '@/common/contexts'
import type { RootState } from '@/common/models'
import type { IServices } from '@/common/services/initiate'
import { SetCriteriaListAction } from '@/common/state/criteria/criteriaActions'
import type { CriteriaActionProps } from '@/common/state/criteria/criteriaActions'
import type { CriteriaState } from '@/common/state/criteria/criteriaState'
import { SetPageAction } from '@/common/state/general/generalActions'
import {
  SetCoordinateAction,
  SetLocationAction,
} from '@/common/state/location/locationActions'
import type { LocationState } from '@/common/state/location/locationState'
import {
  CountProductsAction,
  ListMakesAction,
  ListModelsAction,
  ListProductsAction,
  ListTrimsAction,
  SetRangeMileageAction,
  SetRangePriceAction,
} from '@/common/state/product/productActions'
import type { IProduct } from '@/common/state/product/productState'
import Landing from '@/pages/Landing'
import Vehicles from '@/pages/Vehicles'
import type { ICoordinate } from '@/utils/common'
import { getGeoInfo, isEmpty } from '@/utils/common'

interface RootProps {
  criteria?: CriteriaState
  location?: LocationState
  page?: number
  // geoInfo: any
  listProducts: (param: any) => Promise<IProduct[]>
  countProducts: (param: any) => Promise<any>
  setCurrentPage: (page: number) => void
  setLocation: (location: LocationState) => void
  setCoordinate: (c: ICoordinate) => void
  setCriteriaList: (c: CriteriaActionProps[]) => void
  listMakes: (params: any) => void
  listModels: (params: any) => void
  listTrims: (params: any) => void
  setRangeMileage: () => void
  setRangePrice: () => void
  setPage: (p: number) => void
}
const Root = (props: RootProps) => {
  const services: IServices | undefined = useContext(ServicesContext)
  const { criteria } = props.criteria as CriteriaState

  useEffect(() => {
    initiate()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (
        !props.location ||
        !props.location.country_code ||
        isEmpty([props.location.longitude, props.location.latitude])
      ) {
        return
      }
      try {
        services?.loading.actions.start()
        if (props.page !== 0) {
          props.setPage(0)
        } else {
          await getProducts(0)
        }
      } catch (error) {
        // handle error
      } finally {
        services?.loading.actions.stop()
      }
    }
    fetchData()
  }, [criteria, props.location])

  useEffect(() => {
    const fetchData = async () => {
      if (
        !props.location ||
        !props.location.latitude ||
        !props.location.longitude
      ) {
        return
      }
      try {
        services?.loading.actions.start()
        await getProducts(props.page || 0)
      } catch (error) {
        // handle error
      } finally {
        services?.loading.actions.stop()
      }
    }
    fetchData()
  }, [props.page])

  useEffect(() => {
    if (criteria?.vehicle_makes && criteria.vehicle_makes.length > 0) {
      props.listModels({
        makes: criteria?.vehicle_makes,
      })
    } else {
      props.setCriteriaList([{ key: 'vehicle_models', value: [] }])
    }
    props.setCriteriaList([{ key: 'vehicle_trims', value: [] }])
  }, [criteria?.vehicle_makes])

  useEffect(() => {
    if (criteria?.vehicle_models && criteria?.vehicle_models.length > 0) {
      props.listTrims({
        vehicle_makes: criteria?.vehicle_makes,
        vehicle_models: criteria?.vehicle_models,
      })
    } else {
      props.setCriteriaList([{ key: 'vehicle_trims', value: [] }])
    }
  }, [criteria?.vehicle_models])

  const getProducts = async (page: number) => {
    let _criteria: any = Object.assign({}, criteria) as any
    _criteria = {
      ..._criteria,
      listing_mileage_max: _criteria.listing_mileage[1],
      listing_mileage_min: _criteria.listing_mileage[0],
      listing_price_max: _criteria.listing_price[1],
      listing_price_min: _criteria.listing_price[0],
      vehicle_year_max: _criteria.vehicle_year[1],
      vehicle_year_min: _criteria.vehicle_year[0],
    }
    if (
      _criteria?.vehicle_engine_cylinders &&
      _criteria?.vehicle_engine_cylinders?.indexOf('All') > -1
    ) {
      _criteria = {
        ..._criteria,
        vehicle_engine_cylinders: [],
      }
    }
    if (
      _criteria?.vehicle_fuel_types &&
      _criteria?.vehicle_fuel_types?.indexOf('All types') > -1
    ) {
      _criteria = {
        ..._criteria,
        vehicle_fuel_types: [],
      }
    }
    await props.listProducts({
      ..._criteria,
      location: [props.location?.longitude, props.location?.latitude],
      page: page,
    })
  }
  const initiate = async () => {
    const info = await getGeoInfo()
    // setGeoInfo(info)
    await props.setLocation(info)
    // get make list
    await props.listMakes([])
    // get mileage range
    await props.setRangeMileage()
    // // get price range
    await props.setRangePrice()
    // get products
    // get products count
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/vehicles/:id" element={<Vehicles />} />
        <Route path="/vehicles/" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps = (state: RootState) => ({
  criteria: state.app.criteria,
  location: state.app.location,
  page: state.view.general.page,
})
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  countProducts: bindActionCreators(CountProductsAction, dispatch),
  listMakes: bindActionCreators(ListMakesAction, dispatch),
  listModels: bindActionCreators(ListModelsAction, dispatch),
  listProducts: bindActionCreators(ListProductsAction, dispatch),
  listTrims: bindActionCreators(ListTrimsAction, dispatch),
  setCoordinate: bindActionCreators(SetCoordinateAction, dispatch),
  setCriteriaList: bindActionCreators(SetCriteriaListAction, dispatch),
  setCurrentPage: bindActionCreators(SetPageAction, dispatch),
  setLocation: bindActionCreators(SetLocationAction, dispatch),
  setPage: bindActionCreators(SetPageAction, dispatch),
  setRangeMileage: bindActionCreators(SetRangeMileageAction, dispatch),
  setRangePrice: bindActionCreators(SetRangePriceAction, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(Root)
