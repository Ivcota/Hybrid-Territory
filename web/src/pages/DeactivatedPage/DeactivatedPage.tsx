import { MetaTags } from '@redwoodjs/web'

const DeactivatedPage = () => {
  return (
    <>
      <MetaTags title="Deactivated" description="Deactivated page" />

      <div className="mt-8 text-center">
        <h1 className="text-2xl font-bold ">
          Your account is not currently activated.
        </h1>
        <p className="mt-2">Your account will be activated once approved.</p>
      </div>
    </>
  )
}

export default DeactivatedPage
