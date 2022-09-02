import dayjs from 'dayjs'
import _ from 'lodash'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'
import type { AvailableTerritoriesQuery } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

import {
  useCreateRecordMutation,
  useSendMessageMutation,
  useUpdateTerritoryMutation,
} from 'src/generated/graphql'

import Button from '../Button/Button'

export const QUERY = gql`
  query AvailableTerritoriesQuery {
    availableTerritories {
      id
      name
      isCompleted
      imageURL
    }
  }
`

export const Loading = () => (
  <div className="mt-5 text-center animate-pulse font-OpenSans text-off-black dark:text-off-white-dark">Loading...</div>
)

export const Empty = () => (
  <div className="mt-5 text-xl font-bold text-center animate-pulse font-OpenSans text-off-black dark:text-off-white-dark">
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
            return <TerritoryCard item={item} key={item.id} />
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
      className="flex flex-row justify-between items-center gap-2 px-4 py-4 mb-3 bg-off-white lg:flex-col transition-all duration-300 rounded-lg shadow hover:-translate-y-1 w-[88%] lg:w-56 lg:h-32 dark:bg-dark-grey-dark  "
      key={item.id}
    >
      <div className="flex items-center justify-between w-full lg:h-full">
        <h2 className="overflow-hidden text-xl font-medium tracking-wider text-center font-Roboto text-off-black text-ellipsis whitespace-nowrap dark:text-off-white">
          {' '}
          {item.name}{' '}
        </h2>
        <div className="mr-3 text-htd-grey dark:text-htd-grey-dark">
          {item.imageURL && (
            <MdOutlinePhotoSizeSelectActual
              className="animate-pulse"
              size={24}
            />
          )}
        </div>
      </div>
      <div className="flex items-end justify-end lg:h-full lg:w-full">
        <Button
          variant="outline"
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
            const recordPromise = createRecord({
              variables: {
                input: {
                  territoryId: item.id,
                  userId: currentUser.id,
                  checkoutDate: now,
                },
              },
            })
            const messagePromise = sendMessage({
              variables: {
                phone: process.env.REDWOOD_ENV_PHONENUMBER,
                message: `${currentUser?.firstName} checked out territory card ${item.name} at ${now}.`,
              },
            })

            await Promise.all([recordPromise, messagePromise])
          }}
        >
          Checkout
        </Button>
      </div>
    </div>
  )
}
