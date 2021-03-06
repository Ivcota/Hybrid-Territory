import { CellFailureProps, CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import DataTable, { TableColumn } from 'react-data-table-component'
import _ from 'lodash'
import { useUserSelect } from 'src/hooks/useUserSelect'
import type {
  AssignTerritoriesQuery,
  AssignTerritory,
  AssignTerritoryVariables,
  Territory,
} from 'types/graphql'
import {
  useCreateRecordMutation,
  useUpdateRecordByIdsMutation,
} from 'src/generated/graphql'
import dayjs from 'dayjs'

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

export const Loading = () => (
  <div className="mt-5 text-center animate-pulse">Loading...</div>
)

export const Empty = () => (
  <div className="text-center mt-7 animate-pulse">Territory not found</div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  searchTerritories,
}: CellSuccessProps<AssignTerritoriesQuery>) => {
  const { userId } = useUserSelect()
  const [assignTerritory] = useMutation<AssignTerritory>(MUTATION, {
    refetchQueries: ['AssignTerritoriesQuery'],
  })

  const [createRecord] = useCreateRecordMutation({
    refetchQueries: ['RecordsQuery'],
  })
  const [updateRecordByIds] = useUpdateRecordByIdsMutation({
    refetchQueries: ['RecordsQuery'],
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
                await toast.promise(
                  assignTerritory({
                    variables: {
                      id: id,
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

                await createRecord({
                  variables: {
                    input: {
                      territoryId: id,
                      userId: userId,

                      checkoutDate: dayjs(),
                    },
                  },
                })
              }}
              className="px-3 py-2 text-white bg-green-500 rounded active:bg-green-700 hover:bg-green-400"
            >
              Assign
            </button>
            {User && (
              <button
                onClick={async () => {
                  await toast.promise(
                    assignTerritory({
                      variables: {
                        id,
                        input: {
                          isCompleted: false,
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

                  await updateRecordByIds({
                    variables: {
                      userId: User.id,
                      territoryId: id,
                      input: {
                        checkinDate: dayjs(),
                      },
                    },
                  })
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
      <DataTable
        pagination
        columns={columns}
        data={searchTerritories
          .slice()
          .sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { numeric: true })
          )}
      />
      <Toaster />
    </>
  )
}
