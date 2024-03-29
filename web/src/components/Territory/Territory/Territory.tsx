import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_TERRITORY_MUTATION = gql`
  mutation DeleteTerritoryMutation($id: String!) {
    deleteTerritory(id: $id) {
      id
    }
  }
`

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

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Territory = ({ territory }) => {
  const [deleteTerritory] = useMutation(DELETE_TERRITORY_MUTATION, {
    onCompleted: () => {
      toast.success('Territory deleted')
      navigate(routes.territories())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete territory ' + id + '?')) {
      deleteTerritory({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Territory {territory.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{territory.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{territory.name}</td>
            </tr>
            <tr>
              <th>Spreadsheet url</th>
              <td>{territory.spreadsheetURL}</td>
            </tr>
            <tr>
              <th>Is completed</th>
              <td>{checkboxInputTag(territory.isCompleted)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{territory.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTerritory({ id: territory.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(territory.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Territory
