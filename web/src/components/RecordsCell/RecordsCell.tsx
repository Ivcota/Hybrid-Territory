import { useState } from 'react'

import { Table, Tabs, Button, Loader } from '@mantine/core'
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

export const Loading = () => (
  <div className="flex items-center justify-center mt-8">
    <Loader />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-red-500">Error: {error.message}</div>
)

export const Success = ({ records }: CellSuccessProps<RecordsQuery>) => {
  const [updateRecord] = useUpdateRecordByIdMutation()
  const [viewAll, setViewAll] = useState(false)

  const handleToastPromise = async (promise: Promise<unknown>) => {
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
            className={`bg-dark-blue font-Roboto`}
          >
            Resolve
          </Button>
        ) : (
          <Button
            onClick={async () => await unResolveRecord(info.row.getValue('id'))}
            className="bg-red-600 font-Roboto"
          >
            Unresolve
          </Button>
        ),
    }),
  ]

  const filteredRecords = records.filter((record) => !record.isResolved)

  const table = useReactTable({
    columns,
    data: viewAll ? records : filteredRecords,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-x-auto ">
      <Tabs
        defaultValue="main"
        classNames={{
          tab: 'text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-off-white dark:hover:text-off-white dark:active:text-off-white dark:active:bg-dark-blue dark:hover:bg-dark-blue dark:focus:bg-dark-blue dark:focus:text-off-white font-Roboto',
        }}
      >
        <Tabs.List>
          <Tabs.Tab onClick={() => setViewAll(false)} value="main">
            Unresolved
          </Tabs.Tab>
          <Tabs.Tab onClick={() => setViewAll(true)} value="all">
            All
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="main">{renderTable(table)}</Tabs.Panel>
        <Tabs.Panel value="all">{renderTable(table)}</Tabs.Panel>
      </Tabs>

      <Toaster />
    </div>
  )
}
function renderTable(table) {
  return (
    <Table verticalSpacing="md">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                scope="col"
                className="px-6 py-3 text-center dark:text-white dark:bg-dark-grey-dark"
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
          <tr key={row.id} className="bg-white border-b dark:bg-dark-grey-dark">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="text-center dark:text-white">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
