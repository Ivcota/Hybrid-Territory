import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import Modal from 'src/components/Modal/Modal'
import { useSendMessageMutation } from 'src/generated/graphql'
import MyTerritoriesCell from 'src/components/MyTerritoriesCell/'

const MyTerritoriesPage = () => {
  const { currentUser, loading } = useAuth()
  const [sendMessage, { loading: isLoading }] = useSendMessageMutation()

  const sendMessageRightNow = async () => {
    try {
      const res = await sendMessage({
        variables: {
          phone: '15205105764',
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

      <div className="flex flex-col items-center mt-4">
        <h1 className="text-3xl font-black">Your Territories</h1>

        <p className="mt-3">Here are the territories assigned to you.</p>

        <Modal
          title={!isLoading ? 'Request More Territory' : 'Loading...'}
          className="px-3 py-2 mt-4 text-center text-white transition-all duration-200 bg-orange-500 rounded-sm w-[14rem] hover:shadow-md hover:shadow-orange-500/25"
          heading="Send Territory Request?"
          text="This will send a text request to your service overseer."
          fn={sendMessageRightNow}
        />
      </div>

      {/* {!loading && <MyTerritoriesCell userId={currentUser?.id} />} */}
    </>
  )
}

export default MyTerritoriesPage
