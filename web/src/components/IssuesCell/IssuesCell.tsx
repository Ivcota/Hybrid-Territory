import { Fragment } from 'react'

import {
  ChatBubbleLeftEllipsisIcon,
  XMarkIcon,
  UserIcon,
} from '@heroicons/react/20/solid'
import { Loader } from '@mantine/core'
import _ from 'lodash'
import ReactTimeago from 'react-timeago'
import type { DeleteIssueVariables, IssuesQuery } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { CellFailureProps, CellSuccessProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

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

  const handleDelete = async (id: string) => {
    toast.promise(
      deleteIssue({
        variables: {
          id,
        } as DeleteIssueVariables,
      }),
      {
        loading: 'Loading...',
        error: 'Error',
        success: 'Comment Deleted...',
      }
    )
  }

  const remappedIssues = issuesByTerritory.map(
    (issue) =>
      ({
        id: issue.id,
        person: {
          name: issue.user.firstName,
          id: issue.user.id,
        },
        createdAt: issue.createdAt,
        type: 'comment',
        comment: issue.comment,
        isClosed: issue.isClosed,
      } as IIssue)
  )

  return (
    <div className="flex justify-center lg:justify-start">
      <Issues handleDelete={handleDelete} issues={remappedIssues} />
    </div>
  )
}

interface IIssue {
  id: string
  type: string
  person: { name: string; id: string }
  createdAt: string
  comment: string
  isClosed: boolean
}

interface IProps {
  issues: IIssue[]
  handleDelete: (id: string) => void
}

const Issues = (props: IProps) => {
  const { handleDelete } = props
  const { currentUser } = useAuth()

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {_.orderBy(
          _.filter(props.issues, { isClosed: false }),
          ['createdAt'],
          ['desc']
        ).map((issueItem, issueItemIdx) => (
          <li key={issueItem.id}>
            <div className="relative pb-8">
              {issueItemIdx !== props.issues.length - 1 ? (
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 dark:bg-gray-700 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex items-start space-x-3">
                <>
                  <div className="relative">
                    <UserIcon className="w-12 h-12 dark:text-white " />

                    <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white dark:bg-off-black px-0.5 py-px">
                      <ChatBubbleLeftEllipsisIcon
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div>
                      <div className="text-sm">
                        <p className="font-medium text-gray-900 dark:text-gray-200">
                          {issueItem.person.name}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Commented{' '}
                        <ReactTimeago date={issueItem.createdAt} live />
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                      <p>{issueItem.comment}</p>
                      {currentUser.id === issueItem.person.id && (
                        <button
                          type="button"
                          onClick={() => handleDelete(issueItem.id)}
                          className="inline-flex items-center px-3 py-1 mt-2 text-sm font-medium leading-4 text-white bg-red-600 border border-transparent rounded shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
