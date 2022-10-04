import { Loader } from '@mantine/core'
import _ from 'lodash'
import ReactTimeago from 'react-timeago'
import type { DeleteIssueVariables, IssuesQuery } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { CellFailureProps, CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

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

export const Loading = () => (
  <div className="flex items-center justify-center mt-8">
    <Loader />
  </div>
)

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
    <div className="mb-4 rounded-sm w-80 lg:w-72 md:w-[25rem]">
      <div>
        {_.orderBy(
          _.filter(issuesByTerritory, { isClosed: false }),
          ['createdAt'],
          ['desc']
        ).map((issue) => {
          return (
            <div
              className="p-4 mt-6 rounded shadow-sm bg-off-white dark:bg-dark-grey-dark"
              key={issue.id}
            >
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium tracking-wider text-left font-Roboto text-dark-blue dark:text-sky-blue-dark">
                  {issue.user.firstName}
                </h3>
                <div className="text-xs italic tracking-wider text-htd-grey dark:text-off-white-dark/80">
                  <ReactTimeago date={issue.createdAt} live />
                </div>
              </div>

              <p className="mt-2 text-xs tracking-wide font-OpenSans text-off-black dark:text-off-white-dark">
                {issue.comment}{' '}
              </p>
              {currentUser.id === issue.user.id && (
                <div className="flex justify-end mt-1">
                  <Button
                    variant="custom"
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
                          success: 'Comment Deleted...',
                        }
                      )
                    }}
                    className="flex items-center px-5 py-1 font-medium tracking-wider transition-all duration-100 rounded-sm bg-none text-error dark:text-error-dark hover:text-accent dark:hover:text-accent-dark active:text-error/60 font-Roboto"
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
