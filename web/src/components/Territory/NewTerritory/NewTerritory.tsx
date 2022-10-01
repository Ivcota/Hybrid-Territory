import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TerritoryForm from 'src/components/Territory/TerritoryForm'

const CREATE_TERRITORY_MUTATION = gql`
  mutation CreateTerritoryMutation($input: CreateTerritoryInput!) {
    createTerritory(input: $input) {
      id
    }
  }
`

const NewTerritory = () => {
  const [createTerritory, { loading, error }] = useMutation(
    CREATE_TERRITORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Territory created')
        navigate(routes.territories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createTerritory({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Territory</h2>
      </header>
      <div className="rw-segment-main">
        <TerritoryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTerritory
