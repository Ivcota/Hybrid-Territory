import type {
  FindViewTerritoryQuery,
  FindTerritoryByIdVariables,
  FindViewTerritoryQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useUpdateTerritoryMutation } from 'src/generated/graphql'
import { useAuth } from '@redwoodjs/auth'

import placeholderImg from '../../assets/polaroid_placeholder.png'

export const QUERY = gql`
  query FindViewTerritoryQuery($id: String!) {
    territory(id: $id) {
      id
      name
      spreadsheetURL
      isCompleted
      userId
      __typename
    }
  }
`

export const Loading = () => (
  <div className="mt-5 text-center animate-pulse">Loading...</div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindViewTerritoryQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  territory,
}: CellSuccessProps<FindViewTerritoryQuery, FindTerritoryByIdVariables>) => {
  const [UpdateTerritory, { loading }] = useUpdateTerritoryMutation({
    refetchQueries: ['FindViewTerritoryQuery'],
  })

  const { currentUser } = useAuth()

  if (territory.userId !== currentUser?.id) {
    return (
      <div className="text-error">
        You're not authorized to view this territory.
      </div>
    )
  }

  return (
    <div
      className="flex flex-col justify-between px-5 py-4 rounded-md shadow-sm w-72 bg-off-white"
      key={territory.id}
    >
      <div className="aspect-[4/3] w-full h-56 flex justify-center items-center">
        <img src={placeholderImg} alt="Territory Photo" />
      </div>
      <div className="w-3/4 mx-auto text-transparent border-b border-htd-grey/50 lg:mb-4">
        -
      </div>
      <h1 className="mt-4 ml-4 text-xl font-medium font-Roboto text-dark-blue"> {territory.name} </h1>

      {territory.isCompleted ? (
        <p className="mt-2">
          <b>You're done with this territory.</b> Let your territory servant
          know you're ready to turn it in.
        </p>
      ) : (
        <p>This territory is not finished.</p>
      )}
      <a href={territory.spreadsheetURL} target="_blank">
        <button className="px-3 py-2 mt-4 text-lg text-white rounded-sm bg-slate-800 hover:bg-slate-700 active:bg-slate-500 ">
          View Spreadsheet
        </button>
      </a>

      {territory.isCompleted ? (
        <button
          onClick={async () => {
            UpdateTerritory({
              variables: {
                id: territory.id,
                input: {
                  isCompleted: !territory.isCompleted,
                },
              },
            })
          }}
          disabled={loading ? true : false}
          className={`px-3 py-2 mt-4 text-lg text-white bg-red-500 rounded-sm hover:bg-red-700 active:bg-red-300 ${
            loading && 'animate-pulse'
          } `}
        >
          {!loading ? 'Mark as Not Completed' : 'Loading...'}
        </button>
      ) : (
        <button
          disabled={loading ? true : false}
          onClick={async () => {
            UpdateTerritory({
              variables: {
                id: territory.id,
                input: {
                  isCompleted: !territory.isCompleted,
                },
              },
            })
          }}
          className={`px-3 py-2 mt-4 text-lg text-white bg-green-500 rounded-sm hover:bg-green-700 active:bg-green-300 ${
            loading && 'animate-pulse'
          }`}
        >
          {!loading ? 'Mark as Complete' : 'Loading...'}
        </button>
      )}
    </div>
  )
}
