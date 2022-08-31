import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/Button/Button'
import Modal from 'src/components/Modal/Modal'
import UserTerritoriesCell from 'src/components/UserTerritoriesCell'
import { useSendMessageMutation } from 'src/generated/graphql'

const MyTerritoriesPage = () => {
  const { currentUser, loading } = useAuth()
  const [sendMessage, { loading: isLoading }] = useSendMessageMutation()

  const sendMessageRightNow = async () => {
    try {
      const res = await sendMessage({
        variables: {
          phone: process.env.REDWOOD_ENV_PHONENUMBER,
          message: `${currentUser?.firstName} is requesting more territory.`,
        },
      })

      toast.success('Request has been made.')

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Toaster />
      <MetaTags title="MyTerritories" description="MyTerritories page" />

      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold font-Roboto text-dark-blue lg:ml-12">
          Your Territories
        </h1>

        <p className="mx-auto mt-2 text-sm italic font-light tracking-wide text-center font-OpenSans text-off-black/80 lg:w-2/3 lg:mt-4 md:text-lg ">
          Here are the territories assigned to you.
        </p>
        <div className="w-2/3 mx-auto text-transparent border-b border-off-black lg:mb-4">
          -
        </div>
        <div className="flex flex-col mx-auto lg:flex-row lg:justify-center lg:gap-4 lg:pb-4 lg:w-3/4">
          <Modal
            title={!isLoading ? 'Request New Territory' : 'Loading...'}
            className="px-10 py-1 min-h-[40px] w-full mt-4 font-medium text-white transition-all duration-100 rounded-sm lg:min-h-[48px] lg:max-w-[300px] active:bg-teal-blue bg-accent hover:bg-accent/70 font-Roboto"
            heading="Send Territory Request?"
            text="This will send a text message request to the territory servant."
            fn={sendMessageRightNow}
          />
          <Link to={routes.selfCheckout()} className="w-full lg:max-w-[300px]">
            <Button
              variant="custom"
              className="px-10 w-full min-h-[40px] mt-4 font-medium lg:min-h-[48px] bg-success hover:bg-success/70"
            >
              Checkout New Territory
            </Button>
          </Link>
        </div>
      </div>

      {!loading && <UserTerritoriesCell userId={currentUser?.id} />}
    </>
  )
}

export default MyTerritoriesPage
