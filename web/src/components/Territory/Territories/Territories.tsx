import humanize from 'humanize-string'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'

import { QUERY } from 'src/components/Territory/TerritoriesCell'

const DELETE_TERRITORY_MUTATION = gql`
  mutation DeleteTerritoryMutation($id: String!) {
    deleteTerritory(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const TerritoriesList = ({ territories }) => {
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

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete territory ' + id + '?')) {
      deleteTerritory({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Spreadsheet url</th>
            <th>Is completed</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {territories.map((territory) => (
            <tr key={territory.id}>
              <td>{truncate(territory.id)}</td>
              <td>{truncate(territory.name)}</td>
              <td>{truncate(territory.spreadsheetURL)}</td>
              <td>{checkboxInputTag(territory.isCompleted)}</td>
              <td>{truncate(territory.userId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.territory({ id: territory.id })}
                    title={'Show territory ' + territory.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTerritory({ id: territory.id })}
                    title={'Edit territory ' + territory.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete territory ' + territory.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(territory.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TerritoriesList
