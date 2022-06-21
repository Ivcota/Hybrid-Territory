import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import _ from 'lodash'
import type { AvailableTerritoriesQuery } from 'types/graphql'

export const QUERY = gql`
  query AvailableTerritoriesQuery {
    availableTerritories {
      id
      name
      isCompleted
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  availableTerritories,
}: CellSuccessProps<AvailableTerritoriesQuery>) => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-4 md:flex-row">
      {_.sortBy(availableTerritories, ['name']).map((item) => {
        return (
          <div
            className="flex flex-col items-center gap-3 px-10 py-4 mt-3 transition-all duration-300 rounded-lg shadow-lg hover:-translate-y-1"
            key={item.id}
          >
            <h2 className="text-2xl text-center"> {item.name} </h2>
            <button className="px-3 py-2 text-white transition-all duration-200 rounded-sm shadow-md bg-gradient-to-br from-green-500 to-green-600 hover:from-indigo-500 hover:to-indigo-600 active:from-indigo-600 active:to-indigo-670 ">
              Checkout
            </button>
          </div>
        )
      })}
    </div>
  )
}
