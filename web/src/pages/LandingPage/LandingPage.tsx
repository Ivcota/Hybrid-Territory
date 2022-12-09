import { Fragment } from 'react'

import { Popover, Transition } from '@headlessui/react'
import {
  ComputerDesktopIcon,
  Bars3Icon,
  FaceSmileIcon,
  DocumentIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const navigation = [{ name: 'About', href: routes.about() }]

export default function LandingPage() {
  return (
    <>
      <head>
        <MetaTags title="Hybrid Territory" />
      </head>

      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <svg
              className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Popover>
              <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
                <nav
                  className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <Link to={routes.landing()}>
                        <span className="sr-only">Hybrid Territory</span>
                        <div className="font-black text-blue-500 ">HT</div>
                      </Link>
                      <div className="flex items-center -mr-2 md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                          <span className="sr-only">Open main menu</span>
                          <Bars3Icon className="w-6 h-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:ml-10 md:block md:space-x-8 md:pr-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="font-medium text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    ))}
                    <Link
                      to={routes.login()}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Log in
                    </Link>
                  </div>
                </nav>
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform md:hidden"
                >
                  <div className="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
                    <div className="flex items-center justify-between px-5 pt-4">
                      <div>
                        <Link to={routes.landing()}>
                          <span className="sr-only">Hybrid Territory</span>
                          <div className="font-black text-blue-500 ">HT</div>
                        </Link>
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                          <span className="sr-only">Close main menu</span>
                          <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <Link
                      to={routes.login()}
                      className="block w-full px-5 py-3 font-medium text-center text-blue-600 bg-gray-50 hover:bg-gray-100"
                    >
                      Log in
                    </Link>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <main className="px-4 mx-auto mt-10 max-w-7xl sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Cover your map with</span>{' '}
                  <span className="block text-blue-600 xl:inline">
                    Hybrid Territory
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  View territory cards, assign letter writing and phone
                  witnessing contacts, and simplify your workflow.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to={routes.signup()}
                      href="#"
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 md:py-4 md:px-10 md:text-lg"
                    >
                      Create an Account
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to={routes.login()}
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 md:py-4 md:px-10 md:text-lg"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="object-cover w-full h-56 sm:h-72 md:h-96 lg:h-full lg:w-full"
            src="https://images.unsplash.com/photo-1513880989635-6eb491ce7f5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
            alt=""
          />
        </div>
      </div>
      <Features />
    </>
  )
}

const features = [
  {
    name: 'Digital Territory Cards',
    description:
      'Easily keep track of your assigned territories, and view important information about each territory at a glance.',
    icon: ComputerDesktopIcon,
  },
  {
    name: 'One Click Territory Request',
    description:
      'Streamline the process of requesting new territories. Request new territories with just one click.',
    icon: FaceSmileIcon,
  },
  {
    name: 'Auto S13 Record Keeping',
    description:
      'Stay organized and efficient with minimal effort. Always have access to accurate and up-to-date records',
    icon: DocumentIcon,
  },
]

const Features = () => {
  return (
    <div className="relative py-24 bg-white sm:py-32 lg:py-40">
      <div className="max-w-md px-6 mx-auto text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-semibold text-blue-600">
          Enjoy the details
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything you&#39;ll need to tackle your territory
        </p>
        <p className="mx-auto mt-5 text-xl text-gray-500 max-w-prose">
          Here are some of the features you&#39;ll encounter
        </p>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root px-6 pb-8 rounded-lg bg-gray-50">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 shadow-lg rounded-xl">
                        <feature.icon
                          className="w-8 h-8 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
