import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import dayjs from 'dayjs'
import type { RecordsQuery } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

import { useUpdateRecordByIdMutation } from 'src/generated/graphql'

import Button from '../Button/Button'

interface ITableRecord {
  __typename?: 'Record'
  id: string
  checkinDate?: string
  checkoutDate: string
  isResolved: boolean
  territory: {
    __typename?: 'Territory'
    name: string
  }
  user: {
    __typename?: 'User'
    firstName?: string
    lastName?: string
  }
}

export const QUERY = gql`
  query RecordsQuery {
    records {
      id
      territory {
        name
      }
      user {
        firstName
        lastName
      }
      checkinDate
      checkoutDate
      isResolved
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-red-500">Error: {error.message}</div>
)

export const Success = ({ records }: CellSuccessProps<RecordsQuery>) => {
  const [updateRecord] = useUpdateRecordByIdMutation()

  const handleToastPromise = async (promise: Promise<any>) => {
    await toast.promise(promise, {
      error: 'Error',
      loading: 'Loading...',
      success: 'Record Updated',
    })
  }

  const resolveRecord = async (id: string) => {
    const updatePromise = updateRecord({
      variables: {
        id,
        input: {
          isResolved: true,
        },
      },
      refetchQueries: ['RecordsQuery'],
    })

    await handleToastPromise(updatePromise)
  }

  const unResolveRecord = async (id: string) => {
    const updatePromise = updateRecord({
      variables: {
        id,
        input: {
          isResolved: false,
        },
      },
      refetchQueries: ['RecordsQuery'],
    })

    await handleToastPromise(updatePromise)
  }

  const columnHelper = createColumnHelper<ITableRecord>()

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      cell: (info) => info.getValue(),
      header: () => <span>Id</span>,
      enableHiding: true,
    }),
    columnHelper.accessor('territory.name', {
      cell: (info) => info.getValue(),
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor('checkoutDate', {
      header: () => <span>Checkout Date</span>,
      cell: (info) => dayjs(info.getValue()).format('MM/DD/YYYY'),
    }),
    columnHelper.accessor('checkinDate', {
      header: () => <span>Checkin Date</span>,
      cell: (info) =>
        info.getValue() ? dayjs(info.getValue()).format('MM/DD/YYYY') : '',
    }),
    columnHelper.accessor('user', {
      header: () => <span>Publisher</span>,
      cell: (info) =>
        info.getValue().firstName + ' ' + info.getValue().lastName,
    }),
    columnHelper.accessor('isResolved', {
      header: () => <span>Synced</span>,
      cell: (info) =>
        !info.getValue() ? (
          <Button
            onClick={async () => await resolveRecord(info.row.getValue('id'))}
            variant="custom"
            className={`bg-dark-blue active:translate-y-1 `}
          >
            Resolve
          </Button>
        ) : (
          <Button
            onClick={async () => await unResolveRecord(info.row.getValue('id'))}
            variant="custom"
            className="bg-red-600 active:translate-y-1"
          >
            Unresolve
          </Button>
        ),
    }),
  ]

  const table = useReactTable({
    columns,
    data: records,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="relative flex flex-col items-center justify-center mt-4 overflow-x-auto rounded dark:text-off-white ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-white">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-grey-dark dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 text-center"
                >
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
            <tr
              key={row.id}
              className="bg-white border-b dark:bg-dark-grey-dark dark:border-gray-700"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  )
}
