import type {
  FindViewTerritoryQuery,
  FindTerritoryByIdVariables,
  FindViewTerritoryQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindViewTerritoryQuery($id: String!) {
    territory(id: $id) {
      id
      name
      spreadsheetURL
      isCompleted
      __typename
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindViewTerritoryQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  territory,
}: CellSuccessProps<FindViewTerritoryQuery, FindTerritoryByIdVariables>) => {
  return <div>{JSON.stringify(territory)}</div>
}
