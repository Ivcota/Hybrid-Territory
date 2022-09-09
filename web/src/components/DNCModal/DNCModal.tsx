import { Fragment, useContext, useState } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { MdOutlineClose } from 'react-icons/md'

import { useAuth } from '@redwoodjs/auth'
import { useForm } from '@redwoodjs/forms'

import DoNotCallsCell from 'src/components/DoNotCallsCell'
import { useCreateTerritoryDncMutation } from 'src/generated/graphql'

import Button from '../Button/Button'
import { ViewTerritoryCellContext } from '../ViewTerritoryCell'

interface IForm {
  comment: string
}

const DncModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { territoryId } = useContext(ViewTerritoryCellContext)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const [mutate] = useCreateTerritoryDncMutation({
    refetchQueries: ['DoNotCallsQuery'],
  })

  const {
    register,
    // formState: { errors },
    handleSubmit,
  } = useForm<IForm>()

  const {
    currentUser: { id },
  } = useAuth()

  return (
    <>
      <Button
        variant="custom"
        onClick={openModal}
        className="mb-4 font-medium border bg-none text-error hover:text-error/70 active:text-error/50 border-error hover:border-error/70 active:border-error/50 font-Roboto dark:text-error-dark dark:border-error-dark/80 dark:hover:text-error-dark"
      >
        Do Not Calls
      </Button>

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
            <div className="fixed inset-0 bg-opacity-25 bg-off-black" />
          </Transition.Child>
          <form
            onSubmit={handleSubmit(({ comment }) => {
              mutate({
                variables: {
                  input: {
                    address: comment,
                    territoryId,
                    userId: id,
                  },
                },
              })
            })}
          >
            <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm bg-black/20 dark:bg-black/40">
              <div className="flex items-start justify-center min-h-full p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full min-h-[191px] max-w-md p-6 mt-20 mb-10 overflow-hidden text-left align-middle transition-all transform rounded shadow-xl bg-white dark:bg-dark-grey-dark">
                    <div className="flex justify-between text-accent dark:text-accent-dark">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 tracking-wide text-error dark:text-error-dark font-Roboto"
                      >
                        Do Not Calls
                      </Dialog.Title>
                      <MdOutlineClose onClick={closeModal} size={20} />
                    </div>

                    <div className="w-3/4 mt-2 text-transparent border-t border-htd-grey/50 dark:border-htd-grey-dark lg:mb-4" />
                    <p className="mx-auto my-2 text-xs italic font-light tracking-wide font-OpenSans text-off-black/80 dark:text-off-white-dark/80 lg:w-2/3 lg:mt-4 md:text-lg ">
                      To add a new DNC, enter an address.
                    </p>
                    <div className="box-border flex flex-col items-center">
                      <input
                        autoComplete="off"
                        className="w-full px-3 py-2 my-2 transition-all bg-white rounded outline-none lg:w-72 dark:bg-light-black-dark ring-1 ring-htd-grey dark:ring-htd-grey-dark focus-within:ring-light-blue/60 focus-within:ring-2 font-OpenSans text-off-black dark:text-off-white-dark caret-dark-blue dark:caret-sky-blue-dark"
                        placeholder="Comment"
                        type="text"
                        {...register('comment')}
                      />
                      <div className="flex justify-end w-full ">
                        <Button variant="full">Send</Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-sm text-center text-htd-grey dark:text-off-white-dark/80">
                        <DoNotCallsCell territoryId={territoryId} />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </form>
        </Dialog>
      </Transition>
    </>
  )
}

export default DncModal
