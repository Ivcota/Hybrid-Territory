import { Controller, useForm } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { createContext, useEffect, useMemo } from 'react'
import ReactSelect from 'react-select'
import RecordsCell from 'src/components/RecordsCell/'
import { useAllTerritoryNamesQuery } from 'src/generated/graphql'
import { RecordsPageFilterContext } from './RPC'

interface IForm {
  territoryName: {
    value?: string
    label?: string
  }
}

const RecordsPage = () => {
  /**
   * TODO
   * Build a form connection and create a filter on the Cell.
   */

  const { register, watch, control, reset } = useForm<IForm>()
  const { data, loading } = useAllTerritoryNamesQuery()

  const generateOptions = useMemo(() => {
    if (!loading && data) {
      const newArray = data.territories.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      })

      return newArray
    }
  }, [data, loading])

  useEffect(() => {
    console.log(watch('territoryName')?.value)
  }, [watch('territoryName')])

  return (
    <>
      <MetaTags title="Records" description="Records page" />
      <h1 className="text-2xl font-extrabold">Records Page</h1>

      {loading ? (
        <div className="text-center"> Loading... </div>
      ) : (
        <Controller
          name="territoryName"
          control={control}
          render={({ field }) => (
            <ReactSelect
              onChange={field.onChange}
              options={generateOptions}
              isSearchable
              className="mt-3"
            />
          )}
        />
      )}
      {watch('territoryName') && (
        <button
          onClick={() => {
            reset()
          }}
          className="px-3 py-1 mt-3 text-white bg-red-500 rounded-sm hover:bg-red-600 active:bg-red-700 "
        >
          Clear
        </button>
      )}

      <RecordsPageFilterContext.Provider
        value={{
          territoryName: watch('territoryName')?.label,
        }}
      >
        <RecordsCell />
      </RecordsPageFilterContext.Provider>
    </>
  )
}

export default RecordsPage
