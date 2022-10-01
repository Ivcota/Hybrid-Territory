import _ from 'lodash'
import ReactTimeago from 'react-timeago'
import type {
  IssueTrackerQuery,
  IssueTrackerQueryVariables,
  UpdateIssueVariables,
} from 'types/graphql'

import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

export const QUERY = gql`
  query IssueTrackerQuery {
    issueTracker: issues {
      id
      comment
      isClosed
      createdAt
      user {
        id
        firstName
      }
      territory {
        id
        name
        spreadsheetURL
      }
    }
  }
`

export const MUTATION = gql`
  mutation UpdateIssue($id: String!, $input: UpdateIssueInput!) {
    updateIssue(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div className="text-center">Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<IssueTrackerQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  issueTracker,
}: CellSuccessProps<IssueTrackerQuery, IssueTrackerQueryVariables>) => {
  const [updateIssue] = useMutation(MUTATION, {
    refetchQueries: ['IssueTrackerQuery'],
  })

  const resolveIssue = async (issueId: string) => {
    toast.promise(
      updateIssue({
        variables: {
          id: issueId,
          input: {
            isClosed: true,
          },
        } as UpdateIssueVariables,
      }),
      {
        loading: 'Loading...',
        error: 'Error...',
        success: 'Issue Resolved',
      }
    )
  }

  const openIssue = async (issueId: string) => {
    toast.promise(
      updateIssue({
        variables: {
          id: issueId,
          input: {
            isClosed: false,
          },
        } as UpdateIssueVariables,
      }),
      {
        loading: 'Loading...',
        error: 'Error...',
        success: 'Issue Opened',
      }
    )
  }

  return (
    <div className="mt-4">
      {_.orderBy(issueTracker, ['createdAt'], ['desc']).map((issue) => {
        return (
          <div
            className={`px-4 py-3 mt-2 transition-all duration-200 rounded ${
              issue.isClosed ? 'bg-red-200' : 'bg-slate-100'
            }`}
            key={issue.id}
          >
            <h3 className="font-bold"> {issue.territory.name} </h3>
            <p className="mt-2"> {issue.comment}</p>
            <div className="flex gap-3 mt-2 text-black/80">
              <div className="font-bold"> {issue.user.firstName}</div>
              <ReactTimeago date={issue.createdAt} />
            </div>
            <div className="flex gap-1 mt-1">
              <button
                onClick={() => {
                  window.open(issue.territory.spreadsheetURL, '_blank')
                }}
                className="px-2 py-1 mt-2 text-white bg-slate-800 hover:bg-slate-900"
              >
                View Territory
              </button>
              {!issue.isClosed ? (
                <button
                  onClick={() => {
                    resolveIssue(issue.id)
                  }}
                  className="px-2 py-1 mt-2 text-white bg-green-700 hover:bg-green-900"
                >
                  Resolve
                </button>
              ) : (
                <button
                  onClick={() => {
                    openIssue(issue.id)
                  }}
                  className="px-2 py-1 mt-2 text-white bg-red-700 hover:bg-red-900"
                >
                  Open Issue
                </button>
              )}
            </div>
          </div>
        )
      })}
      <Toaster />
    </div>
  )
}
