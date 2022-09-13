import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import LandingBG from '../../../public/landingBg.svg';

const LandingPage = () => {
  return (
    <>
      <MetaTags title="Landing" description="Landing page" />

      <div className='relative w-full'>
      <div className='max-h-screen overflow-hidden z-[-1]'>
        <LandingBG className='' />
      </div>
        <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full'>
          <div>Test</div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
