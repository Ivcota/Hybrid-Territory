import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

interface ModalProps {
  title: string
  heading: string
  text: string
  fn: any
  className: string
}

const Modal = ({ title, heading, text, fn, className }: ModalProps) => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function closeModalWithAction() {
    setIsOpen(false)
    fn()
  }

  function openModal() {
    setIsOpen(true)
  }
  return (
    <>
      <button type="button" onClick={openModal} className={className}>
        {title}
      </button>

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
                <Dialog.Panel className="w-full max-w-md p-6 mb-10 overflow-hidden text-left align-middle transition-all transform rounded shadow-xl bg-off-white">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 tracking-wide text-center text-dark-blue font-Roboto"
                  >
                    {heading}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-htd-grey">{text}</p>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-success/20 text-success hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModalWithAction}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md text-error bg-error/10 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
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

export default Modal
