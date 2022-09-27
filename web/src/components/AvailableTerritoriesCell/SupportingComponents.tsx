import { Fragment, useContext } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import dayjs from 'dayjs'
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md'

import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/dist/toast'

import {
  useCreateRecordMutation,
  useGetLatestCheckInDateQuery,
  useSendMessageMutation,
  useUpdateTerritoryMutation,
} from 'src/generated/graphql'

import Button from '../Button/Button'

import {
  ITerritory,
  MappedTerritoriesContext,
} from './AvailableTerritoriesCell'

interface IMappedTerritories {
  availableTerritories: {
    __typename?: 'Territory'
    id: string
    name: string
    isCompleted: boolean
    imageURL?: string
  }[]
}

export const MappedTerritories = ({
  availableTerritories,
}: IMappedTerritories) => (
  <div className="flex flex-col flex-wrap items-center justify-center gap-4 lg:gap-8 md:flex-row">
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
  </div>
)

export const TerritoryCard = ({ item }: { item: ITerritory }) => {
  const context = useContext(MappedTerritoriesContext)

  const handleClick = () => {
    context.setTerritoryId(item.id)
    context.setIsOpen(true)
  }

  return (
    <div className="flex flex-row justify-between items-center gap-2 px-4 py-4 mb-3 bg-off-white lg:flex-col transition-all duration-300 rounded-lg shadow hover:-translate-y-1 w-[88%] lg:w-56 lg:h-32 dark:bg-dark-grey-dark">
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
        <UpdateTerritoryButton item={item} />
        <Button onClick={handleClick} variant="outline">
          Get Stuff
        </Button>
      </div>
    </div>
  )
}

interface IPropsTerritoryModal {
  territoryId: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const TerritoryModal = ({
  isOpen,
  setIsOpen,
  territoryId,
}: IPropsTerritoryModal) => {
  const { data } = useGetLatestCheckInDateQuery({
    variables: {
      territoryId,
    },
  })

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {JSON.stringify(data)}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export const UpdateTerritoryButton = ({ item }: { item: ITerritory }) => {
  const { handleClick } = useUpdateTerritoryHook(item)

  return (
    <Button variant="outline" onClick={handleClick}>
      Checkout
    </Button>
  )
}
function useUpdateTerritoryHook(item: ITerritory) {
  const [updateTerritory] = useUpdateTerritoryMutation({
    refetchQueries: ['AvailableTerritoriesQuery'],
  })
  const { currentUser } = useAuth()
  const [sendMessage] = useSendMessageMutation()
  const [createRecord] = useCreateRecordMutation()
  const now = dayjs()

  const handleClick = async () => {
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
  }
  return { handleClick }
}
