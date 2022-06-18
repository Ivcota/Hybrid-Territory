import type { AssignTerritoriesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query AssignTerritoriesQuery(
    $cardName: String
    $firstName: String
    $lastName: String
  ) {
    searchTerritories(
      cardName: $cardName
      firstName: $firstName
      lastName: $lastName
    ) {
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

export const Empty = () => (
  <div className="text-center mt-7 animate-pulse">Territory not found</div>
)

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
