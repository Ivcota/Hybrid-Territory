import { Button, Table } from '@mantine/core'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import dayjs from 'dayjs'
import _ from 'lodash'
import type {
  AssignTerritoriesQuery,
  AssignTerritory,
  AssignTerritoryVariables,
  Territory,
} from 'types/graphql'

import { CellFailureProps, CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

import {
  useCreateRecordMutation,
  useUpdateRecordByIdsMutation,
} from 'src/generated/graphql'
import { useUserSelect } from 'src/hooks/useUserSelect'

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

const columnHelper = createColumnHelper<Territory>()

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

  // TODO: Make this a global helper func
  const assignTerritoryToUser = async (options: { territoryId: string }) => {
    await toast.promise(
      Promise.all([
        assignTerritory({
          variables: {
            id: options.territoryId,
            input: {
              userId,
            },
          } as AssignTerritoryVariables,
        }),
        createRecord({
          variables: {
            input: {
              userId,
              territoryId: options.territoryId,
              checkoutDate: dayjs(),
            },
          },
        }),
      ]),
      {
        loading: 'Loading...',
        error: 'Error...',
        success: 'Updated',
      }
    )
  }

  // TODO: Make this a global helper func
  const unassignTerritory = async (options: {
    territoryId: string
    userId: string
  }) => {
    await toast.promise(
      Promise.all([
        assignTerritory({
          variables: {
            id: options.territoryId,
            input: {
              isCompleted: false,
              userId: null,
            },
          } as AssignTerritoryVariables,
        }),

        updateRecordByIds({
          variables: {
            territoryId: options.territoryId,
            userId: options.userId,
            input: {
              checkinDate: dayjs(),
              isResolved: false,
            },
          },
        }),
      ]),
      {
        loading: 'Loading...',
        error: 'Error...',
        success: 'Updated',
      }
    )
  }

  const columns = [
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('User', {
      header: () => 'Publisher',
      cell: (info) =>
        info.getValue()?.firstName
          ? `${info.getValue()?.firstName} ${info.getValue()?.lastName}`
          : '',
    }),
    columnHelper.accessor('id', {
      header: () => 'Actions',
      cell: (info) => {
        return (
          <>
            <Button
              onClick={() =>
                assignTerritoryToUser({ territoryId: info.getValue() })
              }
              className="mr-3 bg-green-600"
            >
              Assign Territory
            </Button>
            <Button
              onClick={() =>
                unassignTerritory({
                  territoryId: info.getValue(),
                  userId: info.row.original.User.id,
                })
              }
              className="bg-red-500"
            >
              Unassign Territory
            </Button>
          </>
        )
      },
    }),
  ]

  const table = useReactTable({
    columns: columns,
    data: _.sortBy(searchTerritories, (territory) => {
      const name = territory.name
      const number = name.replace('T', '')
      return parseInt(number)
    }),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-black dark:text-white">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-black dark:text-white">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Toaster />
    </>
  )
}
