import { ShoppingBagIcon } from '@heroicons/react/24/solid'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

import UserTerritoriesCell from 'src/components/UserTerritoriesCell'
import { useSendMessageMutation } from 'src/generated/graphql'

const MyTerritoriesPage = () => {
  const { currentUser, loading } = useAuth()
  const [sendMessage] = useSendMessageMutation()

  const sendMessageRightNow = async (territoryType: string) => {
    try {
      const sendTerritoryPromise = sendMessage({
        variables: {
          phone: process.env.REDWOOD_ENV_PHONENUMBER,
          message: `${currentUser?.firstName} is requesting more ${territoryType}.`,
        },
      })

      await toast.promise(sendTerritoryPromise, {
        success: `Request has been made for ${territoryType}`,
        error: 'Uh oh...',
        loading: 'Requesting...',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Toaster />
      <MetaTags title="MyTerritories" description="MyTerritories page" />

      <div className="flex flex-col w-full">
        <div className="mt-5 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              My Territories
            </h2>
          </div>
          <div className="flex mt-4 md:mt-0 md:ml-4">
            {currentUser?.roles !== 'pioneer' && (
              <Link
                to={routes.selfCheckout()}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Checkout New Territory{' '}
                <ShoppingBagIcon
                  className="w-4 h-4 ml-2 -mr-1"
                  aria-hidden="true"
                />
              </Link>
            )}

            <button
              onClick={() => {
                sendMessageRightNow('Standard Territory')
              }}
              type="button"
              className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Request New Territory
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-10 mb-5">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-2 text-sm text-gray-500 bg-white dark:text-gray-400 dark:bg-off-black">
            Proverbs 21:5
          </span>
        </div>
      </div>

      {!loading && <UserTerritoriesCell userId={currentUser?.id} />}
    </>
  )
}

export default MyTerritoriesPage
