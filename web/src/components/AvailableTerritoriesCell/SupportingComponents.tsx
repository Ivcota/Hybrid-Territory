import dayjs from 'dayjs'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'

import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/dist/toast'

import {
  useCreateRecordMutation,
  useSendMessageMutation,
  useUpdateTerritoryMutation,
} from 'src/generated/graphql'

import Button from '../Button/Button'

import { ITerritory } from '.'

export function UpdateTerritoryButton(props) {
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await toast.promise(
          props.updateTerritory({
            variables: {
              id: props.item.id,
              input: {
                userId: props.currentUser?.id,
              },
            },
          }),
          {
            loading: 'loading...',
            error: 'Error...',
            success: `${props.item.name} has been assigned to you.`,
          }
        )
        const recordPromise = props.createRecord({
          variables: {
            input: {
              territoryId: props.item.id,
              userId: props.currentUser.id,
              checkoutDate: props.now,
            },
          },
        })
        const messagePromise = props.sendMessage({
          variables: {
            phone: process.env.REDWOOD_ENV_PHONENUMBER,
            message: `${props.currentUser?.firstName} checked out territory card ${props.item.name} at ${props.now}.`,
          },
        })
        await Promise.all([recordPromise, messagePromise])
      }}
    >
      Checkout
    </Button>
  )
}

export function CardDetails({ item }: { item: ITerritory }) {
  return (
    <div className="flex items-center justify-between w-full lg:h-full">
      <h2 className="overflow-hidden text-xl font-medium tracking-wider text-center font-Roboto text-off-black text-ellipsis whitespace-nowrap dark:text-off-white">
        {item.name}
      </h2>
      <div className="mr-3 text-htd-grey dark:text-htd-grey-dark">
        {item.imageURL && (
          <MdOutlinePhotoSizeSelectActual className="animate-pulse" size={24} />
        )}
      </div>
    </div>
  )
}

export function TerritoryCard(props) {
  return (
    <div className="flex flex-row justify-between items-center gap-2 px-4 py-4 mb-3 bg-off-white lg:flex-col transition-all duration-300 rounded-lg shadow hover:-translate-y-1 w-[88%] lg:w-56 lg:h-32 dark:bg-dark-grey-dark  ">
      <CardDetails item={props.item}></CardDetails>
      <div className="flex items-end justify-end lg:h-full lg:w-full">
        <UpdateTerritoryButton
          updateTerritory={props.updateTerritory}
          currentUser={props.currentUser}
          sendMessage={props.sendMessage}
          createRecord={props.createRecord}
          now={props.now}
          item={props.item}
        ></UpdateTerritoryButton>
      </div>
    </div>
  )
}

export const TerritoryCardWrapper = ({ item }: { item: ITerritory }) => {
  const [updateTerritory] = useUpdateTerritoryMutation({
    refetchQueries: ['AvailableTerritoriesQuery'],
  })
  const { currentUser } = useAuth()
  const [sendMessage] = useSendMessageMutation()
  const [createRecord] = useCreateRecordMutation()

  const now = dayjs()
  return (
    <TerritoryCard
      key={item.id}
      updateTerritory={updateTerritory}
      currentUser={currentUser}
      sendMessage={sendMessage}
      createRecord={createRecord}
      now={now}
      item={item}
    ></TerritoryCard>
  )
}
