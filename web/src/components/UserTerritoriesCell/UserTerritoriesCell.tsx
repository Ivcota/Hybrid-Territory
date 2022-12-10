import { Loader } from '@mantine/core'
import dayjs from 'dayjs'
import _ from 'lodash'
import type { MyTerritories } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import {
  useSendMessageMutation,
  useUpdateRecordByIdsMutation,
  useUpdateTerritoryMutation,
} from 'src/generated/graphql'

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
  <div className="flex items-center justify-center mt-8">
    <Loader />
  </div>
)

export const Empty = () => (
  <div className="mt-10 text-lg text-center animate-pulse dark:text-off-white">
    <div className="py-4 ">
      <p> You&#39;re empty.</p>
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
    <div className="flex flex-wrap justify-center gap-4 p-2 mt-4 gap-y-8 lg:gap-x-8">
      {userTerritories
        .slice()
        .sort((a, b) =>
          a.name.localeCompare(b.name, undefined, { numeric: true })
        )
        .map((territoryCard) => {
          const submitTerritory = async () => {
            try {
              const updateTerritoryPromise = await updateTerritory({
                variables: {
                  id: territoryCard.id,
                  input: {
                    isCompleted: !territoryCard.isCompleted,
                    userId: null,
                  },
                },
              })

              const updateRecordsByIdPromise = updateRecordsByIds({
                variables: {
                  userId: currentUser.id,
                  territoryId: territoryCard.id,
                  input: {
                    checkinDate: dayjs(),
                    isResolved: false,
                  },
                },
              })

              const sendMessagePromise = sendMessage({
                variables: {
                  phone: process.env.REDWOOD_ENV_PHONENUMBER,
                  message: `${currentUser?.firstName} turned in territory card ${territoryCard.name} at ${now}.`,
                },
              })

              await Promise.all([
                updateTerritoryPromise,
                updateRecordsByIdPromise,
                sendMessagePromise,
              ])
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
