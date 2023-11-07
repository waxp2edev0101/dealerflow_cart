import { useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import type { Dispatch, AnyAction } from 'redux'

import type { RootState } from '@/common/models'
import type {
  CriteriaActionProps,
  CriteriaKey,
} from '@/common/state/criteria/criteriaActions'
import {
  SetCriteriaAction,
  SetCriteriaListAction,
} from '@/common/state/criteria/criteriaActions'
import type { CriteriaState } from '@/common/state/criteria/criteriaState'

import Chip from './Chip'
export interface ChipBarProps {
  criteria: CriteriaState
  setCriteria: (c: CriteriaActionProps) => void
}
const arrayKey = [
  'vehicle_makes',
  'vehicle_models',
  'vehicle_trims',
  'vehicle_engine_cylinders',
  'vehicle_fuel_types',
  'vehicle_drivetrains',
  'vehicle_transmission_types',
]

const rangeKey = ['listing_mileage', 'listing_price', 'vehicle_year']
const ChipBar = (props: ChipBarProps) => {
  const { criteria, enable } = props.criteria
  const getDistanceUnit = useCallback(
    () => (criteria.distance_unit.toLowerCase() === 'k' ? 'km' : 'mile'),
    [criteria],
  )
  const handleChangeFilters = (e: any, key: CriteriaKey, value = '') => {
    e.stopPropagation()
    if (arrayKey.includes(key)) {
      const index = criteria[key].indexOf(value)
      props.setCriteria({
        key: key,
        value: [
          ...criteria[key].slice(0, index),
          ...criteria[key].slice(index + 1, criteria[key].length),
        ],
      })
    } else if (rangeKey.includes(key)) {
      props.setCriteria({ key, value: [0, 0] })
    }
  }
  return (
    <>
      {enable?.vehicle_makes &&
        criteria.vehicle_makes.map((item: any, key: number) => (
          <Chip
            key={key}
            label={item}
            bgColor={'bg-primary'}
            onClick={(e) => handleChangeFilters(e, 'vehicle_makes', item)}
          />
        ))}
      {enable?.vehicle_models &&
        criteria.vehicle_models.map((item: any, key: number) => (
          <Chip
            key={key}
            label={item}
            bgColor={'bg-accent'}
            onClick={(e) => handleChangeFilters(e, 'vehicle_models', item)}
          />
        ))}
      {enable?.vehicle_trims &&
        criteria.vehicle_trims.map((item: any, key: number) => (
          <Chip
            key={key}
            label={item}
            bgColor={'bg-accent'}
            onClick={(e) => handleChangeFilters(e, 'vehicle_trims', item)}
          />
        ))}
      {enable?.vehicle_year && (
        <Chip
          label={`${criteria.vehicle_year[0]} - ${criteria.vehicle_year[1]}`}
          bgColor={'bg-primary'}
          onClick={(e) => handleChangeFilters(e, 'vehicle_year')}
        />
      )}
      {enable?.listing_price && (
        <Chip
          label={`$ ${new Intl.NumberFormat('en-IN', {
            maximumSignificantDigits: 3,
          }).format(criteria.listing_price[0] || 0)}
            -
            $ ${new Intl.NumberFormat('en-IN', {
              maximumSignificantDigits: 3,
            }).format(criteria.listing_price[1] || 0)}`}
          bgColor="bg-[#89C664]"
          onClick={(e) => handleChangeFilters(e, 'listing_price')}
        />
      )}
      {enable?.listing_mileage && (
        <Chip
          label={`${criteria.listing_mileage[0]} ${getDistanceUnit()} - ${
            criteria.listing_mileage[1]
          } ${getDistanceUnit()}`}
          bgColor={'bg-primary'}
          onClick={(e) => handleChangeFilters(e, 'listing_mileage')}
        />
      )}
      {enable?.vehicle_fuel_types &&
        criteria.vehicle_fuel_types.map((item: any, key: number) => (
          <Chip
            key={key}
            label={item}
            bgColor={'bg-primary'}
            onClick={(e) => handleChangeFilters(e, 'vehicle_fuel_types', item)}
          />
        ))}
      {enable?.vehicle_engine_cylinders &&
        criteria.vehicle_engine_cylinders.map((item: any, key: number) => (
          <Chip
            key={key}
            label={item}
            bgColor={'bg-primary'}
            onClick={(e) =>
              handleChangeFilters(e, 'vehicle_engine_cylinders', item)
            }
          />
        ))}
      {enable?.vehicle_drivetrains &&
        criteria.vehicle_drivetrains.map((item: any, key: number) => (
          <Chip
            key={key}
            label={item}
            bgColor={'bg-primary'}
            onClick={(e) => handleChangeFilters(e, 'vehicle_drivetrains', item)}
          />
        ))}
      {enable?.vehicle_transmission_types &&
        criteria.vehicle_transmission_types.map((item: any, key: number) => (
          <Chip
            key={key}
            label={item}
            bgColor={'bg-primary'}
            onClick={(e) =>
              handleChangeFilters(e, 'vehicle_transmission_types', item)
            }
          />
        ))}
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  criteria: state.app.criteria,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setCriteria: bindActionCreators(SetCriteriaAction, dispatch),
  setCriteriaList: bindActionCreators(SetCriteriaListAction, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(ChipBar)
