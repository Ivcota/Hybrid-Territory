import { useAuth } from '@redwoodjs/auth'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import dayjs from 'dayjs'
import _ from 'lodash'
import {
  useCreateRecordMutation,
  useSendMessageMutation,
  useUpdateTerritoryMutation,
} from 'src/generated/graphql'
import type { AvailableTerritoriesQuery } from 'types/graphql'

import Button from '../Button/Button'

export const QUERY = gql`
  query AvailableTerritoriesQuery {
    availableTerritories {
      id
      name
      isCompleted
    }
  }
`

export const Loading = () => (
  <div className="mt-5 text-center animate-pulse">Loading...</div>
)

export const Empty = () => (
  <div className="mt-5 text-xl font-bold text-center animate-pulse">
    All Territories are checked out right now...
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  availableTerritories,
}: CellSuccessProps<AvailableTerritoriesQuery>) => {
  return (
    <>
      <div className="flex flex-col flex-wrap items-center justify-center gap-4 lg:gap-8 md:flex-row">
        {availableTerritories
          .slice()
          .sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { numeric: true })
          )
          .map((item) => {
            return (
              <TerritoryCard item={item} key={item.id} />
            )
          })}
      </div>
      <Toaster />
    </>
  )
}

const TerritoryCard = ({ item }) => {
  const [updateTerritory] = useUpdateTerritoryMutation({
    refetchQueries: ['AvailableTerritoriesQuery'],
  })
  const { currentUser } = useAuth()
  const [sendMessage] = useSendMessageMutation()
  const [createRecord] = useCreateRecordMutation()

  const now = dayjs()
  return (
    <div
      className="flex flex-row justify-between items-center gap-3 px-4 py-4 mb-3 bg-off-white transition-all duration-300 rounded-lg shadow hover:-translate-y-1 w-[88%] lg:w-56 lg:h-32"
      key={item.id}
    >
      <div className='lg:h-full'>
        <h2 className="text-xl text-center font-Roboto font-medium tracking-wider text-off-black text-ellipsis overflow-hidden whitespace-nowrap"> {item.name} </h2>
      </div>
      <div className='lg:h-full flex items-end'>
        <Button
          variant='outline'
          onClick={async () => {
            await toast.promise(
              updateTerritory({
                variables: {
                  id: item.id,
                  input: {
                    userId: currentUser?.id,
                  },
                },
              }),
              {
                loading: 'loading...',
                error: 'Error...',
                success: `${item.name} has been assigned to you.`,
              }
            )
            await createRecord({
              variables: {
                input: {
                  territoryId: item.id,
                  userId: currentUser.id,
                  checkoutDate: now,
                },
              },
            })
            await sendMessage({
              variables: {
                phone: process.env.REDWOOD_ENV_PHONENUMBER,
                message: `${currentUser?.firstName} checked out territory card ${item.name} at ${now}.`,
              },
            })
          }}
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}