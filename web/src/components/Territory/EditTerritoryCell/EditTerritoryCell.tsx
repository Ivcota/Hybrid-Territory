import type { EditTerritoryById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TerritoryForm from 'src/components/Territory/TerritoryForm'

export const QUERY = gql`
  query EditTerritoryById($id: String!) {
    territory: territory(id: $id) {
      id
      name
      spreadsheetURL
      isCompleted
      userId
    }
  }
`
const UPDATE_TERRITORY_MUTATION = gql`
  mutation UpdateTerritoryMutation(
    $id: String!
    $input: UpdateTerritoryInput!
  ) {
    updateTerritory(id: $id, input: $input) {
      id
      name
      spreadsheetURL
      isCompleted
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ territory }: CellSuccessProps<EditTerritoryById>) => {
  const [updateTerritory, { loading, error }] = useMutation(
    UPDATE_TERRITORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Territory updated')
        navigate(routes.territories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateTerritory({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Territory {territory.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TerritoryForm
          territory={territory}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
