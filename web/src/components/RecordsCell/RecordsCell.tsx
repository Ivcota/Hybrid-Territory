import type { RecordsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

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
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ records }: CellSuccessProps<RecordsQuery>) => {
  return (
    <ul>
      {records.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
