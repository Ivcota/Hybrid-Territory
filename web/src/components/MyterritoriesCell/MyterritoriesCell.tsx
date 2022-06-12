import { Link, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import type { MyTerritories } from 'types/graphql'
import Modal from '../Modal/Modal'
import { navigate } from '@redwoodjs/router'

export const QUERY = gql`
  query MyTerritories($userId: String!) {
    userTerritories(userId: $userId) {
      id
      name
      spreadsheetURL
      userId
      isCompleted
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
  const submitTerritory = () => {}

  return (
    <div className="flex flex-wrap justify-center gap-1 p-2 mt-4 gap-y-8 ">
      {userTerritories.map(({ id, name, isCompleted }) => {
        return (
          <div
            key={id}
            className={`w-64 px-3 py-4 rounded-lg shadow-lg flex flex-col justify-center items-center ${
              isCompleted ? '' : ' bg-slate-50'
            }`}
            id={id}
          >
            <h2 className="text-xl font-bold text-center"> {name} </h2>

            {isCompleted ? (
              <p className="mt-2">You're done with this territory.</p>
            ) : (
              <p></p>
            )}

            <button
              onClick={() =>
                navigate(
                  routes.territory({
                    id,
                  })
                )
              }
              className={`w-full p-2 mt-3 text-center text-white rounded-sm ${
                !isCompleted
                  ? 'bg-blue-600 hover:bg-blue-500'
                  : 'bg-red-600 hover:bg-red-900 active:bg-red-800 '
              }`}
            >
              View Territory
            </button>
            {isCompleted && (
              <Modal
                title="Turn in Territory Card"
                heading="Turn in Territory Card?"
                text="This will turn in your territory card and notify the territory servant."
                fn={submitTerritory}
                className="w-full p-2 mt-3 text-center text-white bg-green-600 rounded-sm active:bg-green-900 hover:bg-green-800"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
