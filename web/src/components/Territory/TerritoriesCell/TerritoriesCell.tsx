import type { FindTerritories } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Territories from 'src/components/Territory/Territories'

export const QUERY = gql`
  query FindTerritories {
    territories {
      id
      name
      spreadsheetURL
      isCompleted
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No territories yet. '}
      <Link
        to={routes.newTerritory()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ territories }: CellSuccessProps<FindTerritories>) => {
  return <Territories territories={territories} />
}
