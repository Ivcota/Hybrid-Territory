import { Controller, useForm } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useEffect, useMemo } from 'react'
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
  const { watch, control, reset } = useForm<IForm>()
  const { data, loading } = useAllTerritoryNamesQuery()

  const generateOptions = useMemo(() => {
    if (!loading && data) {
      const sortedArray = data.territories.slice().sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          numeric: true,
        })
      )

      const newArray = sortedArray.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      })

      return newArray
    }
  }, [data, loading])

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
              value={field.value}
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
          className="px-3 py-1 mt-3 text-white transition-all duration-200 bg-red-500 rounded-sm  hover:bg-red-600 active:bg-red-700"
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
