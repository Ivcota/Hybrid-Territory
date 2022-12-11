import { MapIcon } from '@heroicons/react/24/solid'

import { Link, routes } from '@redwoodjs/router'

export default function EmptyPage() {
  return (
    <>
      <div className="flex flex-col min-h-full pt-16 pb-12 bg-white">
        <main className="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-center flex-shrink-0">
            <a href="/" className="inline-flex">
              <span className="sr-only">Your Company</span>
              <MapIcon className="text-blue-500 w-14 h-14" />
            </a>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-base font-semibold text-blue-600">404</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link
                  to={routes.landing()}
                  className="text-base font-medium text-blue-600 hover:text-blue-500"
                >
                  Go back home
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            {/* <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Contact Support
            </a>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Status
            </a>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Twitter
            </a> */}
          </nav>
        </footer>
      </div>
    </>
  )
}
