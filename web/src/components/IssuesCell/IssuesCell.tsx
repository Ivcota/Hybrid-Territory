import { useAuth } from '@redwoodjs/auth'
import { CellFailureProps, CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import _ from 'lodash'
import ReactTimeago from 'react-timeago'
import type { DeleteIssueVariables, IssuesQuery } from 'types/graphql'

export const QUERY = gql`
  query IssuesQuery($territoryId: String!) {
    issuesByTerritory(territoryId: $territoryId) {
      id
      comment
      isClosed
      createdAt
      user {
        id
        firstName
      }
      __typename
    }
  }
`

export const MUTATION = gql`
  mutation CreateIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      id
    }
  }
`
export const DELETE_MUTATION = gql`
  mutation DeleteIssue($id: String!) {
    deleteIssue(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div></div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  issuesByTerritory,
}: CellSuccessProps<IssuesQuery>) => {
  const { currentUser } = useAuth()

  const [deleteIssue] = useMutation(DELETE_MUTATION, {
    refetchQueries: ['IssuesQuery'],
  })

  return (
    <div className="p-4 rounded-sm w-80 md:w-[25rem]">
      <div className="mt-4">
        {_.orderBy(issuesByTerritory, ['createdAt'], ['desc']).map((issue) => {
          return (
            <div className="p-4 mt-4 rounded-md bg-slate-100 " key={issue.id}>
              <div className="flex gap-2 ">
                <h3 className="font-bold text-left">{issue.user.firstName}</h3>
                <div className="text-black/50">
                  <ReactTimeago date={issue.createdAt} live />
                </div>
              </div>

              <p className="mt-2">{issue.comment} </p>
              {currentUser.id === issue.user.id && (
                <div className="flex justify-end mt-2 ">
                  <button
                    onClick={async () => {
                      toast.promise(
                        deleteIssue({
                          variables: {
                            id: issue.id,
                          } as DeleteIssueVariables,
                        }),
                        {
                          loading: 'Loading...',
                          error: 'Error',
                          success: 'Comment Issue Created',
                        }
                      )
                    }}
                    className="px-2 py-1 text-white bg-red-500 hover:bg-red-600 active:bg-red-400 "
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
