import type { AvailableTerritoriesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

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
    <ul>
      {availableTerritories.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
