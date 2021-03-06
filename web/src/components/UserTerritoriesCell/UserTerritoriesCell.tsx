import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import _ from 'lodash'
import dayjs from 'dayjs'
import {
  useSendMessageMutation,
  useUpdateRecordByIdsMutation,
  useUpdateTerritoryMutation,
} from 'src/generated/graphql'
import type { MyTerritories } from 'types/graphql'
import Modal from '../Modal/Modal'

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
  <div className="mt-10 text-lg text-center animate-pulse">
    <h3 className="text-lg text-center">Loading...</h3>
  </div>
)

export const Empty = () => (
  <div className="mt-10 text-lg text-center animate-pulse">
    <div className="py-4 ">
      <p> You're empty.</p>
      <p>Request some territory.</p>
    </div>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-red-500">Error: {error.message}</div>
)

export const Success = ({
  userTerritories,
}: CellSuccessProps<MyTerritories>) => {
  const [sendMessage] = useSendMessageMutation()
  const [updateTerritory, { loading }] = useUpdateTerritoryMutation({
    refetchQueries: ['MyTerritories'],
  })
  const [updateRecordsByIds] = useUpdateRecordByIdsMutation({
    refetchQueries: ['RecordsQuery'],
  })
  const { currentUser } = useAuth()
  const now = dayjs()

  return (
    <div className="flex flex-wrap justify-center gap-1 p-2 mt-4 gap-y-8 ">
      {userTerritories
        .slice()
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { numeric: true })
        )
        .map(({ id, name, isCompleted }) => {
          const submitTerritory = async () => {
            try {
              await updateTerritory({
                variables: {
                  id,
                  input: {
                    isCompleted: !isCompleted,
                    userId: null,
                  },
                },
              })

              await updateRecordsByIds({
                variables: {
                  userId: currentUser.id,
                  territoryId: id,
                  input: {
                    checkinDate: dayjs(),
                  },
                },
              })

              await sendMessage({
                variables: {
                  phone: process.env.REDWOOD_ENV_PHONENUMBER,
                  message: `${currentUser?.firstName} turned in territory card ${name} at ${now}.`,
                },
              })
            } catch (error) {
              console.log(error)
            }
          }

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
                  title={!loading ? 'Turn in Territory Card' : 'Loading...'}
                  heading="Turn in Territory Card?"
                  text="This will turn in your territory card and notify the territory servant."
                  fn={submitTerritory}
                  className={
                    !loading
                      ? 'w-full p-2 mt-3 text-center text-white bg-green-600 rounded-sm active:bg-green-900 hover:bg-green-800'
                      : 'w-full p-2 mt-3 text-center text-white bg-green-800 rounded-sm animate-pulse'
                  }
                />
              )}
            </div>
          )
        })}
    </div>
  )
}
