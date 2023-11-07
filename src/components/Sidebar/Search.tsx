import debounce from 'lodash/debounce'
import React, { useState, Suspense } from 'react'
import { CiSearch } from 'react-icons/ci'
import { connect } from 'react-redux'
import type { Dispatch, AnyAction } from 'redux'

import type { RootState } from '@/common/models'
import type { CriteriaActionProps } from '@/common/state/criteria/criteriaActions'
import {
  SetCriteriaAction,
  SetCriteriaListAction,
} from '@/common/state/criteria/criteriaActions'
import type { TCriteria } from '@/common/state/criteria/criteriaState'
import type { ProductState } from '@/common/state/product/productState'

import { Close, PlusIcon } from '../Elements'
import Tooltip from '../Tooltip'

// const maxStringLength = 10

interface SearchComponentProps {
  product: ProductState
  criteria: TCriteria
  setCriteria: (criteria: CriteriaActionProps) => void
  setCriteriaList: (list: CriteriaActionProps[]) => void
}

const Search = (props: SearchComponentProps) => {
  const { criteria } = props
  const { makes, models, trims } = props.product

  const [isShowSearch, setIsShowSearch] = useState(true)
  const [isShowMake, setIsShowMake] = useState(true)
  const [isShowModel, setIsShowModel] = useState(false)
  const [isShowTrim, setIsShowTrim] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [isFocusSearch, setIsFocusSearch] = useState(true)

  const [isShowMakeAll, setIsShowMakeAll] = useState(false)

  const [shouldLoadModel] = useState(false)

  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleInputChange = debounce((query: string) => {
    setSearchQuery(query)
    setIsFocusSearch(true)

    // Replace with search logic

    setSearchResults(
      makes?.filter(
        (item: any) =>
          item.label.toLowerCase().indexOf(query.toLowerCase()) > -1,
      ) || [],
    )
  }, 10)

  const handleSearchFocus = debounce((focus: boolean) => {
    setIsFocusSearch(focus)
  }, 100)

  const handleChangeMake = (label: string) => {
    // setShouldLoadModel(true)
    const index = criteria.vehicle_makes?.indexOf(label)
    console.log('index of label', index)
    let value
    if (index !== undefined && index > -1) {
      if (criteria.vehicle_makes && criteria.vehicle_makes.length > 0) {
        const makes = criteria?.vehicle_makes.slice()
        value = [
          ...makes.slice(0, index),
          ...makes.slice(index + 1, makes.length),
        ]
      }
    } else {
      value =
        criteria.vehicle_makes && criteria.vehicle_makes.length > 0
          ? [...criteria.vehicle_makes, label]
          : [label]
    }
    props.setCriteriaList([
      {
        key: 'vehicle_makes',
        value: value || [],
      },
      {
        key: 'vehicle_models',
        value: [],
      },
      {
        key: 'vehicle_trims',
        value: [],
      },
    ])
  }

  const handleChangeModel = (label: string) => {
    const index = criteria.vehicle_models?.indexOf(label)

    // return
    let value
    if (index !== undefined && index > -1) {
      const models = criteria.vehicle_models || []
      value = [
        ...models.slice(0, index),
        ...models.slice(index + 1, models.length),
      ]
    } else {
      value = criteria.vehicle_models
        ? [...criteria.vehicle_models, label]
        : [label]
    }
    props.setCriteriaList([
      {
        key: 'vehicle_models',
        value,
      },
      {
        key: 'vehicle_trims',
        value: [],
      },
    ])
  }

  const handleChangeTrim = (label: string) => {
    const index = criteria.vehicle_trims?.indexOf(label)

    let value
    if (index !== undefined && index > -1) {
      const trims = criteria?.vehicle_trims?.slice() || []
      value = [
        ...trims.slice(0, index),
        ...trims.slice(index + 1, trims.length),
      ]
    } else {
      value = criteria.vehicle_trims
        ? [...criteria.vehicle_trims, label]
        : [label]
    }
    props.setCriteria({
      key: 'vehicle_trims',
      value,
    })
  }

  const Model = React.lazy(
    () =>
      new Promise<{ default: React.ComponentType }>((resolve) => {
        setTimeout(
          () => {
            const Component: React.FC = () =>
              models?.map((model, index) => (
                <div key={index} className="mb-5">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 border-[#B8B8B8] mr-4"
                      checked={
                        criteria.vehicle_models &&
                        criteria.vehicle_models.indexOf(model.label) > -1
                      }
                      onChange={() => handleChangeModel(model.label)}
                    />
                    <span className="text-base font-medium">{model.label}</span>
                  </label>
                </div>
              ))
            resolve({ default: Component })
          },
          // Math.random() * 500 + 500,
          100,
        )
      }),
  )

  return (
    <>
      <div className="mb-5">
        <div
          className="text-base text-accent font-medium relative cursor-pointer pb-3 border-b-2 border-[#C8D1FF] mb-6"
          onClick={() => setIsShowSearch((value) => !value)}
        >
          Vehicle Search{' '}
          {isShowSearch ? (
            <span className="absolute right-0 top-[5px] text-[#64748B]">
              <Close />
            </span>
          ) : (
            <span className="absolute right-0 top-[5px] text-[#64748B]">
              <PlusIcon />
            </span>
          )}
        </div>
        {isShowSearch && (
          <>
            <h3 className="text-[12px] text-[#8A839F] text-center font-[450]  mb-4 leading-normal">
              Use the search field below to search for vehicles by Make, Model
              and Trim
            </h3>
            <div className="relative mb-8 text-[#644C70] ">
              <input
                className={`${
                  searchQuery === '' ? 'rounded-lg' : 'rounded-t-lg'
                } text-base font-medium border w-full border-[#D9D9D9] pl-2 pr-8 py-[5px]`}
                onChange={(e) => handleInputChange(e.target.value)}
                onBlur={() => handleSearchFocus(false)}
                onFocus={() => handleSearchFocus(true)}
              />
              <span className="absolute right-2 top-[6px]">
                <CiSearch className="w-6 h-6" />
              </span>
              {searchQuery !== '' && isFocusSearch && (
                <div className="flex flex-col h-[180px] p-4 gap-4 rounded-b-lg border border-solid border-[#D9D9D9] bg-white shadow-md overflow-auto">
                  {searchResults.map((result, index) => (
                    <div key={index}>
                      {result.label.length > 27 ? (
                        <Tooltip
                          onClick={() => handleChangeMake(result.label)}
                          showText={result.label.substring(0, 27)}
                          fullText={result.label}
                        />
                      ) : (
                        <p
                          onClick={() => handleChangeMake(result.label)}
                          className="cursor-pointer"
                        >
                          {result.label}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="mb-5">
        <div
          className="text-base text-accent font-medium relative cursor-pointer pb-3 border-b-2 border-[#C8D1FF] mb-6"
          onClick={() => setIsShowMake((value) => !value)}
        >
          Make{' '}
          {isShowMake ? (
            <span className="absolute right-0 top-[5px] text-[#64748B]">
              <Close />
            </span>
          ) : (
            <span className="absolute right-0 top-[5px] text-[#64748B]">
              <PlusIcon />
            </span>
          )}
        </div>
        {isShowMake && (
          <>
            <div className="grid grid-cols-2 gap-1 max-h-[500px] overflow-y-scroll overflow-x-hidden">
              {isShowMakeAll
                ? makes?.map(
                    (make, index) =>
                      make.label && (
                        <div key={index} className="mb-5">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 border-[#B8B8B8] mr-4"
                              checked={
                                criteria.vehicle_makes &&
                                criteria.vehicle_makes?.indexOf(make.label) > -1
                              }
                              onChange={() => handleChangeMake(make.label)}
                            />
                            <span className="text-base font-medium">
                              {/* {_.truncate(make.label, {
                                length: maxStringLength,
                              })} */}
                              {make.label}
                            </span>
                          </label>
                        </div>
                      ),
                  )
                : makes?.slice(0, 10).map(
                    (make, index) =>
                      make.label && (
                        <div key={index} className="mb-5">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 border-[#B8B8B8] mr-4"
                              checked={
                                criteria.vehicle_makes &&
                                criteria.vehicle_makes?.indexOf(make.label) > -1
                              }
                              onChange={() => handleChangeMake(make.label)}
                            />
                            <span className="text-base font-medium">
                              {/* {_.truncate(make.label, {
                                length: maxStringLength,
                              })} */}
                              {make.label}
                            </span>
                          </label>
                        </div>
                      ),
                  )}
            </div>
            <button
              className="text-[#5E78FF]"
              onClick={() => setIsShowMakeAll((value) => !value)}
            >
              {isShowMakeAll ? 'See fewer makes' : 'See all makes'}
            </button>
          </>
        )}
      </div>
      <div className="mb-5">
        <div
          className={`text-base ${
            criteria.vehicle_makes && criteria.vehicle_makes.length > -1
              ? 'text-accent'
              : 'text-[#D9D9D9]'
          } font-medium relative cursor-pointer pb-3 border-b-2 border-[#C8D1FF] mb-6`}
          onClick={() => setIsShowModel((value) => !value)}
        >
          Model{' '}
          {isShowModel ? (
            <span className="absolute right-0 top-[5px] text-[#64748B]">
              <Close />
            </span>
          ) : (
            <span className="absolute right-0 top-[5px] text-[#64748B]">
              <PlusIcon />
            </span>
          )}
        </div>
        {isShowModel && (
          <div className="grid grid-cols-1 gap-1 max-h-[300px] overflow-y-scroll overflow-x-hidden">
            {criteria.vehicle_makes && criteria.vehicle_makes.length > 0 ? (
              shouldLoadModel ? (
                <Suspense
                  fallback={
                    <p className="w-[70%] m-auto text-[#5E78FF] text-center font-medium text-base">
                      Loading available models for your location ...
                    </p>
                  }
                >
                  <Model />
                </Suspense>
              ) : (
                models?.map(
                  (model, index) =>
                    model.label && (
                      <div key={index} className="mb-5">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 border-[#B8B8B8] mr-4"
                            checked={
                              criteria.vehicle_models &&
                              criteria.vehicle_models?.indexOf(model.label) > -1
                            }
                            onChange={() => handleChangeModel(model.label)}
                          />
                          <span className="text-base font-medium">
                            {model.label}
                          </span>
                        </label>
                      </div>
                    ),
                )
              )
            ) : (
              <p className="w-[200px] text-center mx-auto text-[#B8B8B8]">
                Please select at least one vehicle make/manufacturer from the
                above list to view available models
              </p>
            )}
          </div>
        )}
      </div>
      <div className="mb-5">
        <div
          className={`text-base ${
            criteria.vehicle_models && criteria.vehicle_models.length > 0
              ? 'text-accent'
              : 'text-[#D9D9D9]'
          } font-medium relative cursor-pointer pb-3 border-b-2 border-[#C8D1FF] mb-6`}
          onClick={() => setIsShowTrim((value) => !value)}
        >
          Trim{' '}
          {isShowTrim ? (
            <span className="absolute right-0 top-[5px] text-[#64748B]">
              <Close />
            </span>
          ) : (
            <span className="absolute right-0 top-[5px] text-[#64748B]">
              <PlusIcon />
            </span>
          )}
        </div>
        {isShowTrim && (
          <div className="grid grid-cols-1 gap-1 max-h-[300px] overflow-y-scroll overflow-x-hidden">
            {criteria.vehicle_models && criteria.vehicle_models.length > -1 ? (
              trims?.map(
                (trim, index) =>
                  trim.label && (
                    <div key={index} className="mb-5">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 border-[#B8B8B8] mr-4"
                          checked={
                            criteria.vehicle_trims &&
                            criteria.vehicle_trims.indexOf(trim.label) > -1
                          }
                          onChange={() => handleChangeTrim(trim.label)}
                        />
                        <span className="text-base font-medium">
                          {/* {_.truncate(trim.label, { length: maxStringLength })} */}
                          {trim.label}
                        </span>
                      </label>
                    </div>
                  ),
              )
            ) : (
              <p className="w-[200px] text-center mx-auto text-[#B8B8B8]">
                Please select at least one model from the list above to view
                available trim levels
              </p>
            )}
          </div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  criteria: state.app.criteria.criteria,
  product: state.app.product,
})
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  setCriteria: (criteria: CriteriaActionProps) =>
    dispatch(SetCriteriaAction(criteria)),
  setCriteriaList: (list: CriteriaActionProps[]) =>
    dispatch(SetCriteriaListAction(list)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
