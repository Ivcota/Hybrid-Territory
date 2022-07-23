import { useForm } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useMemo } from 'react'
import ReactSelect from 'react-select'
import RecordsCell from 'src/components/RecordsCell/'
import { useAllTerritoryNamesQuery } from 'src/generated/graphql'

interface IForm {
  territoryName: string
}

const RecordsPage = () => {
  /**
   * TODO
   * Build a form connection and create a filter on the Cell.
   */

  const { register, watch } = useForm<IForm>()
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

  return (
    <>
      <MetaTags title="Records" description="Records page" />
      <h1 className="text-2xl font-extrabold">Records Page</h1>

      {loading ? (
        <div className="text-center"> Loading... </div>
      ) : (
        <ReactSelect options={generateOptions} />
      )}

      <RecordsCell />
    </>
  )
}

export default RecordsPage
