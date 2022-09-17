import { useContext, useMemo } from 'react'

import dayjs from 'dayjs'
import type { RecordsQuery } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import { RecordsPageFilterContext } from 'src/pages/RecordsPage/RPC'

export const QUERY = gql`
  query RecordsQuery {
    records {
      id
      territory {
        name
      }
      user {
        firstName
        lastName
      }
      checkinDate
      checkoutDate
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-red-500">Error: {error.message}</div>
)

export const Success = ({ records }: CellSuccessProps<RecordsQuery>) => {
  const { territoryName } = useContext(RecordsPageFilterContext)

  const filteredRecords = useMemo(() => {
    if (territoryName !== undefined && territoryName !== '') {
      console.log(territoryName)
      return records.filter(({ territory: { name } }) => {
        return name === territoryName
      })
    }

    return records
  }, [records, territoryName])

  return (
    <div className="flex flex-col items-center justify-center mt-4 ">
      {filteredRecords
        .slice()
        .sort((a, b) =>
          a.territory.name.localeCompare(b.territory.name, undefined, {
            numeric: true,
          })
        )
        .map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col items-center w-56 py-5 mt-3 border-0 rounded shadow-md"
            >
              <h2 className="text-center">
                {item.territory.name} | {item.user.firstName}{' '}
                {item.user.lastName}
              </h2>
              <div className="flex flex-1 gap-2 mt-1 ">
                <div className="basis-1/2">
                  {dayjs(item.checkoutDate).format('MM/DD/YYYY')}
                </div>
                <div className="basis-1/2">
                  {item.checkinDate
                    ? dayjs(item.checkinDate).format('MM/DD/YYYY')
                    : ''}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
