import type { DoNotCallsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query DoNotCallsQuery($territoryId: String!) {
    territoryDoNotCalls(territoryId: $territoryId) {
      id
      address
      createdAt
      territoryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  territoryDoNotCalls,
}: CellSuccessProps<DoNotCallsQuery>) => {
  return (
    <ul>
      {territoryDoNotCalls.map((item) => {
        return <li key={item.id} className='flex w-full min-h-[40px] mt-4 items-center border-l-2 px-2 border-error dark:border-error-dark font-Roboto font-normal text-off-black dark:text-off-white-dark text-base tracking-wide'>{item.address}</li>
      })}
    </ul>
  )
}
