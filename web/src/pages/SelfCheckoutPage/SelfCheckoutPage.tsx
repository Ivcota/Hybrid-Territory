import { MetaTags } from '@redwoodjs/web'
import AvailableTerritoriesCell from 'src/components/AvailableTerritoriesCell'

const SelfCheckoutPage = () => {
  return (
    <>
      <MetaTags title="Self-Checkout" description="Self-Checkout page" />
      <div className='w-full flex flex-col'>
        <h1 className="text-2xl font-bold font-Roboto text-dark-blue lg:ml-12">Self Checkout</h1>
        <p className="mt-2 mx-auto font-OpenSans italic font-light text-center text-off-black/80 text-sm tracking-wide lg:w-2/3 lg:mt-4">
          You can checkout territory yourself using this page. Simply select the
          territory you’d like to use, and it will automatically be added to your
          territories page.
        </p>
        <div className='w-2/3 border-b border-off-black mx-auto text-transparent lg:mb-4'>-</div>
        <div className="mt-4">
          <AvailableTerritoriesCell />
        </div>
      </div>
    </>
  )
}

export default SelfCheckoutPage
