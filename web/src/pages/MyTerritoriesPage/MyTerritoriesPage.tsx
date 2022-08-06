import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import Modal from 'src/components/Modal/Modal'
import { useSendMessageMutation } from 'src/generated/graphql'
import UserTerritoriesCell from 'src/components/UserTerritoriesCell'

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
    } catch (error) {}
  }

  return (
    <>
      <Toaster />
      <MetaTags title="MyTerritories" description="MyTerritories page" />

      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-bold font-Roboto text-dark-blue lg:ml-12">Your Territories</h1>

        <p className="mx-auto mt-2 text-sm italic font-light tracking-wide text-center font-OpenSans text-off-black/80 lg:w-2/3 lg:mt-4">Here are the territories assigned to you.</p>
        <div className='w-2/3 mx-auto text-transparent border-b border-off-black lg:mb-4'>-</div>
        <Modal
          title={!isLoading ? 'Request New Territory' : 'Loading...'}
          className="px-10 py-2 mx-auto mt-4 font-medium tracking-wider text-white transition-all duration-100 rounded-sm lg:mb-4 active:bg-teal-blue bg-accent hover:bg-accent/70 font-Roboto lg:w-1/3"
          heading="Send Territory Request?"
          text="This will send a text request the territory servant."
          fn={sendMessageRightNow}
        />
      </div>

      {!loading && <UserTerritoriesCell userId={currentUser?.id} />}
    </>
  )
}

export default MyTerritoriesPage
