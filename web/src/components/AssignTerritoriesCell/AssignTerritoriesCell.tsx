import type { AssignTerritoriesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query AssignTerritoriesQuery($firstName: String, $lastName: String) {
    searchTerritories(firstName: $firstName, lastName: $lastName) {
      id
      name
      spreadsheetURL
      isCompleted
      User {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  searchTerritories,
}: CellSuccessProps<AssignTerritoriesQuery>) => {
  return (
    <ul>
      {searchTerritories.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
