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
import UserListTerritoryCard from '../UserListTerritoryCard/UserListTerritoryCard'

export const QUERY = gql`
  query MyTerritories($userId: String!) {
    userTerritories(userId: $userId) {
      id
      name
      imageURL
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
    <div className="flex flex-wrap justify-center gap-1 p-2 mt-4 gap-y-8 lg:gap-x-8">
      {userTerritories
        .slice()
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { numeric: true })
        )
        .map((territoryCard) => {
          const submitTerritory = async () => {
            try {
              await updateTerritory({
                variables: {
                  id: territoryCard.id,
                  input: {
                    isCompleted: !territoryCard.isCompleted,
                    userId: null,
                  },
                },
              })

              await updateRecordsByIds({
                variables: {
                  userId: currentUser.id,
                  territoryId: territoryCard.id,
                  input: {
                    checkinDate: dayjs(),
                  },
                },
              })

              await sendMessage({
                variables: {
                  phone: process.env.REDWOOD_ENV_PHONENUMBER,
                  message: `${currentUser?.firstName} turned in territory card ${territoryCard.name} at ${now}.`,
                },
              })
            } catch (error) {
              console.log(error)
            }
          }

          return (
            <UserListTerritoryCard
              key={territoryCard.id}
              submitTerritory={submitTerritory}
              territoryCard={territoryCard}
              loading={loading}
            />
          )
        })}
    </div>
  )
}
