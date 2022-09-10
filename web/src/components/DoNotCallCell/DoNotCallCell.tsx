import type { FindDoNotCallQuery, FindDoNotCallQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindDoNotCallQuery($id: String!) {
    doNotCall: doNotCall(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindDoNotCallQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  doNotCall,
}: CellSuccessProps<FindDoNotCallQuery, FindDoNotCallQueryVariables>) => {
  return <div>{JSON.stringify(doNotCall)}</div>
}
