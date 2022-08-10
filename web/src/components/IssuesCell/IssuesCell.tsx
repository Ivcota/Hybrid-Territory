import { useAuth } from '@redwoodjs/auth'
import { CellFailureProps, CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import _ from 'lodash'
import ReactTimeago from 'react-timeago'
import type { DeleteIssueVariables, IssuesQuery } from 'types/graphql'

import Button from '../Button/Button'

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

export const Loading = () => <div className="mt-5">Loading...</div>

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
    <div className="mb-4 rounded-sm w-80 md:w-[25rem]">
      <div>
        {_.orderBy(
          _.filter(issuesByTerritory, { isClosed: false }),
          ['createdAt'],
          ['desc']
        ).map((issue) => {
          return (
            <div className="p-4 mt-6 rounded bg-off-white shadow-sm" key={issue.id}>
              <div className="flex gap-2 items-center">
                <h3 className="text-left text-sm font-Roboto text-dark-blue font-medium tracking-wider">{issue.user.firstName}</h3>
                <div className="text-htd-grey text-xs italic tracking-wider">
                  <ReactTimeago date={issue.createdAt} live />
                </div>
              </div>

              <p className="mt-2 font-OpenSans text-off-black text-xs tracking-wide">{issue.comment} </p>
              {currentUser.id === issue.user.id && (
                <div className="flex justify-end mt-1">
                  <Button
                    variant='custom'
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
                    className="flex items-center px-5 py-1 font-medium tracking-wider transition-all duration-100 rounded-sm bg-none text-error hover:text-accent active:text-error/60 font-Roboto"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
