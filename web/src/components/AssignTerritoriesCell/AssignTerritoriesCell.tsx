import { CellFailureProps, CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import DataTable, { TableColumn } from 'react-data-table-component'
import { useUserSelect } from 'src/hooks/useUserSelect'
import type {
  AssignTerritoriesQuery,
  AssignTerritory,
  AssignTerritoryVariables,
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

export const MUTATION = gql`
  mutation AssignTerritory($id: String!, $input: UpdateTerritoryInput!) {
    updateTerritory(id: $id, input: $input) {
      id
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

interface IForm {
  selectedUserId: {
    value: any
    label: any
  }
}

export const Success = ({
  searchTerritories,
}: CellSuccessProps<AssignTerritoriesQuery>) => {
  const { userId } = useUserSelect()
  const [assignTerritory] = useMutation<AssignTerritory>(MUTATION, {
    refetchQueries: ['AssignTerritoriesQuery'],
  })

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
        return <div>{User ? User?.firstName : 'None'}</div>
      },

      sortable: true,
    },
    {
      name: 'Action',
      width: '20rem',
      cell: ({ id, User, name }) => {
        return (
          <div className="flex gap-3">
            <button
              onClick={async () => {
                toast.promise(
                  assignTerritory({
                    variables: {
                      id,
                      input: {
                        userId,
                      },
                    } as AssignTerritoryVariables,
                  }),
                  {
                    error: 'Error',
                    loading: 'Loading...',
                    success: `${name} has been updated.`,
                  }
                )
              }}
              className="px-3 py-2 text-white bg-green-500 rounded active:bg-green-700 hover:bg-green-400"
            >
              Assign
            </button>
            {User && (
              <button
                onClick={async () => {
                  toast.promise(
                    assignTerritory({
                      variables: {
                        id,
                        input: {
                          userId: null,
                        },
                      } as AssignTerritoryVariables,
                    }),
                    {
                      error: 'Error',
                      loading: 'Loading...',
                      success: `${name} has been updated.`,
                    }
                  )
                }}
                className="px-3 py-2 text-white bg-red-500 rounded active:bg-red-700 hover:bg-red-400"
              >
                Unassign
              </button>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <>
      <DataTable pagination columns={columns} data={searchTerritories} />
      <Toaster />
    </>
  )
}
