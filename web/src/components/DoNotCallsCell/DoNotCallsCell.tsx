import { FaTrash } from 'react-icons/fa'
import type {
  DoNotCallsQuery,
  DeleteDoNotCallMutationVariables,
} from 'types/graphql'

import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

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

export const MUTATION = gql`
  mutation DeleteDoNotCallMutation($id: String!) {
    deleteDoNotCall(id: $id) {
      id
    }
  }
`

export const Loading = () => (
  <div className="flex items-center justify-center w-full font-OpenSans text-off-black/80 dark:text-off-white-dark/80 animate-pulse">
    Loading...
  </div>
)

export const Empty = () => (
  <div className="flex items-center justify-center w-full mt-4">
    <p className="font-OpenSans text-off-black dark:text-off-white-dark/80">
      There are no{' '}
      <span className="font-medium text-error dark:text-error-dark">
        {' '}
        Do Not Calls{' '}
      </span>{' '}
      to display
    </p>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  territoryDoNotCalls,
}: CellSuccessProps<DoNotCallsQuery>) => {
  const [deleteDoNotCall, { loading }] = useMutation(MUTATION, {
    refetchQueries: ['DoNotCallsQuery'],
  })

  const deleteDNC = async (id: string) => {
    const deleteDNCPromise = deleteDoNotCall({
      variables: {
        id,
      } as DeleteDoNotCallMutationVariables,
    })

    await toast.promise(deleteDNCPromise, {
      error: 'Error',
      loading: 'Removing...',
      success: 'DNC Removed',
    })
  }

  return (
    <ul>
      {territoryDoNotCalls.map((item) => {
        return (
          <li
            key={item.id}
            className={`flex justify-between w-full min-h-[40px] mt-4 items-center border-l-2 px-2 border-error dark:border-error-dark font-Roboto font-normal text-off-black dark:text-off-white-dark text-base tracking-wide truncate ${
              loading ? 'animate-pulse' : 'animate-none'
            }`}
          >
            {item.address}
            <FaTrash
              className="text-error-dark"
              size={18}
              onClick={() => {
                deleteDNC(item.id)
              }}
            />
          </li>
        )
      })}
    </ul>
  )
}
