import { useAuth } from '@redwoodjs/auth'
import { useForm } from '@redwoodjs/forms'
import { CellFailureProps, CellSuccessProps, useMutation } from '@redwoodjs/web'
import ReactTimeago from 'react-timeago'
import { useTerritoryId } from 'src/hooks/useTerritoryId'
import _ from 'lodash'
import type { CreateIssueVariables, IssuesQuery } from 'types/graphql'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div></div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  issuesByTerritory,
}: CellSuccessProps<IssuesQuery>) => {
  return (
    <div className="p-4 rounded-sm w-80">
      <div className="mt-4">
        {_.orderBy(issuesByTerritory, ['createdAt'], ['desc']).map((issue) => {
          return (
            <div
              className="p-4 mt-4 rounded-md w-80 bg-slate-100 "
              key={issue.id}
            >
              <div className="flex gap-2 ">
                <h3 className="font-bold text-left">{issue.user.firstName}</h3>
                <div className="text-black/50">
                  <ReactTimeago date={issue.createdAt} live />
                </div>
              </div>

              <p className="mt-2">{issue.comment} </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
