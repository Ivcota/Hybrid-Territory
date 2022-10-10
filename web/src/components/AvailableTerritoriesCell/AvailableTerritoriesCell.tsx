import { useState } from 'react'

import { Loader, Modal, Tabs } from '@mantine/core'
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

import placeholderImg from '../../assets/polaroid_placeholder.png'
import Button from '../Button/Button'

export const QUERY = gql`
  query AvailableTerritoriesQuery {
    availableTerritories {
      id
      name
      isCompleted
      imageURL
      lastWorkedDate
    }
  }
`

export const Loading = () => (
  <div className="flex items-center justify-center mt-8">
    <Loader />
  </div>
)

export const Empty = () => (
  <div className="mt-5 text-xl font-bold text-center animate-pulse font-OpenSans text-off-black dark:text-off-white-dark">
    All Territories are checked out right now...
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

interface ITab {
  value: string
  text: string
}

export const Success = ({
  availableTerritories,
}: CellSuccessProps<AvailableTerritoriesQuery>) => {
  const tabs: ITab[] = [
    {
      text: 'All Purpose',
      value: 'normal',
    },
    {
      text: 'Letter / Phone Only',
      value: 'LetterWriting',
    },
  ]

  const [tabIndex, setTabIndex] = useState(0)

  return (
    <>
      <Tabs defaultValue={tabs[0].value}>
        <Tabs.List>
          {tabs.map((tab, i) => (
            <Tabs.Tab
              key={tab.value}
              className={`dark:bg-black font-Roboto dark:hover:bg-gray-900  dark:text-white ${
                tabIndex === i
                  ? 'dark:border-dark-blue-dark'
                  : 'dark:border-white'
              } `}
              value={tab.value}
              onClick={() => setTabIndex(i)}
            >
              {tab.text}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabs.map((tab) => (
          <Tabs.Panel key={tab.value} value={tab.value}>
            <div className="flex flex-col flex-wrap items-center justify-center gap-4 mt-5 lg:gap-8 md:flex-row">
              {renderTerritories({
                isNormalTerritory: tab.value === tabs[0].value ? true : false,
              })}
            </div>
          </Tabs.Panel>
        ))}
      </Tabs>
      <Toaster />
    </>
  )

  function renderTerritories({
    isNormalTerritory,
  }: {
    isNormalTerritory: boolean
  }): React.ReactNode {
    const filteredTerritories = availableTerritories
      .slice()
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true })
      )
      .filter(({ imageURL }) => (isNormalTerritory ? imageURL : !imageURL))

    if (filteredTerritories.length === 0)
      return (
        <div className="mt-5 font-bold text-center font-OpenSans animate-pulse text-off-black dark:text-off-white-dark">
          Out of this territory type...
        </div>
      )

    return filteredTerritories.map((item) => {
      return <TerritoryCard item={item} key={item.id} />
    })
  }
}

const TerritoryCard = ({
  item,
}: {
  item: {
    id: string
    name: string
    isCompleted: boolean
    imageURL?: string | null
    lastWorkedDate?: string
  }
}) => {
  const [updateTerritory] = useUpdateTerritoryMutation({
    refetchQueries: ['AvailableTerritoriesQuery'],
  })
  const { currentUser } = useAuth()
  const [sendMessage] = useSendMessageMutation()
  const [createRecord] = useCreateRecordMutation()

  const [isOpen, setIsOpen] = useState(false)

  const now = dayjs()
  const checkoutTerritory = async () => {
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
    setIsOpen(false)
  }

  return (
    <>
      <div
        className="flex flex-row justify-between items-center gap-2 px-4 py-4 mb-3 bg-off-white lg:flex-col transition-all duration-300 rounded-lg shadow hover:-translate-y-1 w-[88%] lg:w-56 lg:h-32 dark:bg-dark-grey-dark  "
        key={item.id}
      >
        <div className="flex items-center justify-between w-full lg:h-full">
          <h2 className="overflow-hidden text-xl font-medium tracking-wider text-center font-Roboto text-off-black text-ellipsis whitespace-nowrap dark:text-off-white">
            {item.name}
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
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            Details
          </Button>
        </div>
      </div>

      <Modal
        centered
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnEscape
        title={`${item.name} Preview`}
        classNames={{
          title: 'text-2xl font-semibold font-Roboto dark:text-white',
          modal: 'dark:bg-dark-grey-dark',
        }}
      >
        <img
          className="rounded shadow-md"
          src={item.imageURL ? item.imageURL : placeholderImg}
          alt="territory"
        />
        {/* parse date */}
        <p className="mt-4 mb-4 text-center dark:text-white font-Roboto">
          Last Worked:{' '}
          {item?.lastWorkedDate
            ? dayjs(item.lastWorkedDate).format('MM/DD/YYYY')
            : 'N/A'}
        </p>
        <div className="flex justify-center">
          <Button variant="outline" onClick={checkoutTerritory}>
            Checkout
          </Button>
        </div>
      </Modal>
    </>
  )
}
