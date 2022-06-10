import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import type { MyTerritories } from 'types/graphql'

export const QUERY = gql`
  query MyTerritories($userId: String!) {
    userTerritories(userId: $userId) {
      id
      name
      spreadsheetURL
      userId
      __typename
    }
  }
`

export const Loading = () => (
  <div className="flex justify-center">
    <h3 className="text-lg text-center">Loading...</h3>
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-red-500">Error: {error.message}</div>
)

export const Success = ({
  userTerritories,
}: CellSuccessProps<MyTerritories>) => {
  return (
    <div className="flex flex-wrap justify-center gap-1 p-2 mt-4 gap-y-8 ">
      {userTerritories.map(({ id, name, spreadsheetURL }) => {
        return (
          <div
            key={id}
            className="w-64 px-3 py-2 rounded-sm bg-slate-50 "
            id={id}
          >
            <h2 className="text-xl font-bold text-center"> {name} </h2>
            <a className="" href={spreadsheetURL} target="_blank">
              <div className="w-full p-2 mt-3 text-center text-white bg-blue-600 rounded-sm hover:bg-blue-500">
                View Territory
              </div>
            </a>
          </div>
        )
      })}
    </div>
  )
}
