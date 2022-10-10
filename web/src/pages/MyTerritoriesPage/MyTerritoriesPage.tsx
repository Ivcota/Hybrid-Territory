import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/Button/Button'
import RequestTerritoryButton from 'src/components/RequestTerritoryButton/RequestTerritoryButton'
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
        <h1 className="text-2xl font-bold font-Roboto text-dark-blue dark:text-sky-blue-dark lg:ml-12">
          My Territories
        </h1>

        <p className="mx-auto mt-2 text-sm italic font-light tracking-wide text-center font-OpenSans text-off-black/80 dark:text-off-white-dark/80 lg:w-2/3 lg:mt-4 md:text-lg ">
          Here are the territories assigned to you.
        </p>
        <div className="w-2/3 mx-auto text-transparent border-b border-off-black dark:border-htd-grey-dark lg:mb-4">
          -
        </div>
        <div className="flex flex-col mx-auto lg:flex-row lg:justify-center lg:gap-4 lg:pb-4 lg:w-3/4">
        {currentUser?.roles !== 'pioneer' && (
            <Link
              to={routes.selfCheckout()}
              className="w-full lg:max-w-[300px]"
            >
              <Button
                variant="custom"
                className="px-10 w-full min-h-[40px] mt-4 font-medium lg:min-h-[48px] bg-success dark:bg-success-dark hover:bg-success/70"
              >
                Checkout New Territory
              </Button>
            </Link>
          )}

          <RequestTerritoryButton
            requestTerritoryHandler={sendMessageRightNow}
          />
        </div>
      </div>

      {!loading && <UserTerritoriesCell userId={currentUser?.id} />}
    </>
  )
}

export default MyTerritoriesPage
