import { CellFailureProps, CellSuccessProps, useQuery } from '@redwoodjs/web'
import { useMemo } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import ReactSelect from 'react-select'
import type {
  AllUsersQuery,
  AssignTerritoriesQuery,
  Territory,
} from 'types/graphql'

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

export const USER_QUERY = gql`
  query AllUsers {
    users {
      id
      firstName
      lastName
      __typename
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
  const { data, loading } = useQuery<AllUsersQuery>(USER_QUERY)

  console.log(searchTerritories)

  const generateOptions = useMemo(() => {
    if (!loading && data) {
      const newArray = data.users.map((item) => {
        return {
          label: `${item.firstName} ${item.lastName ? item.lastName : ''}`,
          value: item.id,
        }
      })

      return newArray
    }
  }, [data, loading])

  const columns: TableColumn<Territory>[] = [
    {
      name: 'Name',
      selector: (row) => row.name,
      width: '8rem',
    },
    {
      name: 'Spreadsheet Link',
      cell: (row) => (
        <a className="text-blue-500 underline" href={row.spreadsheetURL}>
          View Territory
        </a>
      ),
      width: '8rem',
      sortable: true,
    },
    {
      name: 'Publisher',
      width: '8rem',
      cell: ({ User }) => {
        return (
          <div>{User ? User?.firstName + ' ' + User?.lastName : 'None'}</div>
        )
      },
      sortable: true,
    },
    {
      name: 'Assign to Publisher',
      cell: ({ User }) => {
        return <ReactSelect options={generateOptions} />
      },
    },
  ]

  return <DataTable pagination columns={columns} data={searchTerritories} />
}
