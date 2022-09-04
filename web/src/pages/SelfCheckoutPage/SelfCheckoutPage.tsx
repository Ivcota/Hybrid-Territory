import { MdArrowBack } from 'react-icons/md'
import { MetaTags } from '@redwoodjs/web'
import AvailableTerritoriesCell from 'src/components/AvailableTerritoriesCell'

import { Link, routes } from '@redwoodjs/router'
import Button from 'src/components/Button/Button'

const SelfCheckoutPage = () => {
  return (
    <>
      <MetaTags title="Self-Checkout" description="Self-Checkout page" />
      <div className="flex flex-col w-full">
        <div className="mb-2">
          <Link to={routes.myTerritories()}>
            <Button variant="custom" className='flex items-center pl-0 font-medium text-dark-blue dark:text-sky-blue-dark hover:text-accent dark:hover:text-accent-dark active:text-light-blue lg:ml-12'>
              <MdArrowBack /> My Territories
            </Button>
          </Link>
        </div>
        <h1 className="text-2xl font-bold font-Roboto text-dark-blue dark:text-sky-blue-dark lg:ml-12">
          Self Checkout
        </h1>
        <p className="mx-auto mt-2 text-sm italic font-light tracking-wide text-center font-OpenSans text-off-black/80 dark:text-off-white-dark/80 lg:w-2/3 lg:mt-4 md:text-base ">
          You can checkout territory yourself using this page. Simply select the
          territory you’d like to use, and it will automatically be added to
          your territories page.
        </p>
        <div className="w-2/3 mx-auto text-transparent border-b border-off-black dark:border-htd-grey-dark lg:mb-4">
          -
        </div>
        <div className="mt-4">
          <AvailableTerritoriesCell />
        </div>
      </div>
    </>
  )
}

export default SelfCheckoutPage
