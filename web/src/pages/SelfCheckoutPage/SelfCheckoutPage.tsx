import { MetaTags } from '@redwoodjs/web'
import AvailableTerritoriesCell from 'src/components/AvailableTerritoriesCell'

const SelfCheckoutPage = () => {
  return (
    <>
      <MetaTags title="Self-Checkout" description="Self-Checkout page" />

      <h1 className="text-2xl font-bold font-Roboto text-dark-blue">Self Checkout</h1>
      <p className="mt-2 font-OpenSans italic font-light text-center text-off-black/80 text-sm tracking-wide">
        You can checkout territory yourself using this page. Simply select the
        territory you’d like to use, and it will automatically be added to your
        territories page.
      </p>
      <div className="mt-4">
        <AvailableTerritoriesCell />
      </div>
    </>
  )
}

export default SelfCheckoutPage
