import type { FindTerritoryById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Territory from 'src/components/Territory/Territory'

export const QUERY = gql`
  query FindTerritoryById($id: String!) {
    territory: territory(id: $id) {
      id
      name
      spreadsheetURL
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Territory not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ territory }: CellSuccessProps<FindTerritoryById>) => {
  return <Territory territory={territory} />
}
