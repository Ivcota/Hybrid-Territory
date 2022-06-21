import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SelfCheckoutPage = () => {
  return (
    <>
      <MetaTags title="Self Checkout" description="SelfCheckout page" />

      <h1 className="text-2xl font-extrabold ">Self Checkout</h1>
      <p className="mt-2">
        You can checkout territory yourself using this page. Simply select the
        territory you’d like to use, and it will automatically be added to your
        territories page.
      </p>
    </>
  )
}

export default SelfCheckoutPage
