import { Button, Table } from '@mantine/core'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import _ from 'lodash'
import { FindTerritories } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Territory/TerritoriesCell'

const DELETE_TERRITORY_MUTATION = gql`
  mutation DeleteTerritoryMutation($id: String!) {
    deleteTerritory(id: $id) {
      id
    }
  }
`

interface ITerritory {
  id: string
  name: string
  spreadsheetURL?: string
  imageURL?: string
  isCompleted: boolean
  userId?: string
}

const TerritoriesList = ({ territories }: FindTerritories) => {
  const [deleteTerritory] = useMutation(DELETE_TERRITORY_MUTATION, {
    onCompleted: () => {
      toast.success('Territory deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const columnHelper = createColumnHelper<ITerritory>()

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('spreadsheetURL', {
      header: 'Spreadsheet',
      cell: (info) => (
        // use tailwind to style the link
        <Button
          className="text-white bg-blue-600  dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white"
          onClick={() => window.open(info.getValue(), '_blank')}
        >
          View Sheet
        </Button>
      ),
    }),
    columnHelper.accessor('imageURL', {
      header: 'Image',
      cell: (info) => (
        <img src={info.getValue()} className="w-44" alt="territory" />
      ),
    }),
    columnHelper.accessor('isCompleted', {
      header: 'Completed',
      cell: (info) => (
        <div className="flex items-center justify-center">
          {info.getValue() ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
      ),
    }),
    columnHelper.accessor('userId', {
      header: 'User',
      // display user name in table
      cell: (info) => (
        <div className="flex items-center justify-center">
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('id', {
      header: 'Options',
      cell: (info) => (
        <nav className="rw-table-actions">
          <Link
            to={routes.territory({ id: info.getValue() })}
            title={'Show territory ' + info.getValue() + ' detail'}
            className="rw-button rw-button-small"
          >
            Show
          </Link>
          <Link
            to={routes.editTerritory({ id: info.getValue() })}
            title={'Edit territory ' + info.getValue()}
            className="rw-button rw-button-small rw-button-blue"
          >
            Edit
          </Link>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            href="#"
            title={'Delete territory ' + info.getValue()}
            className="rw-button rw-button-small rw-button-red"
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to delete territory ' +
                    info.getValue() +
                    '?'
                )
              ) {
                deleteTerritory({ variables: { id: info.getValue() } })
              }
            }}
          >
            Delete
          </a>
        </nav>
      ),
    }),
  ]

  const sort = (territories) => {
    return _.sortBy(territories, (territory) => {
      const name = territory.name
      const number = name.replace('T', '')
      return parseInt(number)
    })
  }

  const table = useReactTable({
    columns,
    data: sort(territories),

    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
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
    </div>
  )
}

export default TerritoriesList
