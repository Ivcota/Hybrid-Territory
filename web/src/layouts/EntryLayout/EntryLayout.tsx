import { Fragment } from 'react'

import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { Link, routes } from '@redwoodjs/router'

type EntryLayoutProps = {
  children?: React.ReactNode
}

const EntryLayout = ({ children }: EntryLayoutProps) => {
  return (
    <>
      <div className="">
        <header>
          <Navbar />
        </header>
        {children}
      </div>
    </>
  )
}

export default EntryLayout

const Navbar = () => {
  return (
    <Popover className="relative mx-auto bg-white max-w-7xl">
      <div className="flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div>
          <Link to={routes.landing()}>
            <span className="sr-only">Hybrid Territory</span>
            <div className="font-black text-blue-500 ">HT</div>
          </Link>
        </div>
        <div className="-my-2 -mr-2 md:hidden">
          <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <Popover.Group as="nav" className="flex space-x-10">
            <Link
              to={routes.about()}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              About
            </Link>
          </Popover.Group>
          <div className="flex items-center md:ml-12">
            <Link
              to={routes.login()}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              to={routes.signup()}
              className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden"
        >
          <div className="bg-white divide-y-2 rounded-lg shadow-lg divide-gray-50 ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <Link to={routes.landing()}>
                    <span className="sr-only">Hybrid Territory</span>
                    <div className="font-black text-blue-500 ">HT</div>
                  </Link>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-6"></nav>
              </div>
            </div>
            <div className="px-5 py-6">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to={routes.about()}
                  className="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  About
                </Link>
              </div>
              <div className="mt-6">
                <Link
                  to={routes.signup()}
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
                >
                  Sign up
                </Link>
                <p className="mt-6 text-base font-medium text-center text-gray-500">
                  Existing User?{' '}
                  <Link
                    to={routes.login()}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
