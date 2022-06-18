import type { AssignTerritoriesQuery, Territory } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import DataTable, { TableColumn, TableRow } from 'react-data-table-component'

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
  const columns: TableColumn<Territory>[] = [
    {
      name: 'Name',
      selector: (row) => row.name,
      width: '8rem',
    },
    {
      name: 'Spreadsheet Link',
      selector: (row) => row.spreadsheetURL,
      width: '10rem',
    },
  ]

  return <DataTable columns={columns} data={searchTerritories} />
}
