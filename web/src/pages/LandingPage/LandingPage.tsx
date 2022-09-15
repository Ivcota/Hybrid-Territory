import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import LandingBG from '../../../public/landingBg.svg';
import WelcomeIMG from '../../../public/welcomeImg.svg';

const LandingPage = () => {
  return (
    <>
      <MetaTags title="Landing" description="Landing page" />

      <div className='relative w-full'>
      <div className='max-h-screen overflow-hidden z-[-1]'>
        <LandingBG className='' />
      </div>
        <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full'>
          <div className='w-[300px] h-[400px] bg-white rounded-lg flex flex-col items-center justify-between p-6'>
            <div className='flex flex-col items-center'>
              <h1 className='mb-1 text-2xl font-light font-Albert text-off-black'>Hybrid<span className='font-semibold'>Territory</span></h1>
              <p className='text-xs italic font-light tracking-wide font-OpenSans text-off-black'>Your Territory. Simplified.</p>
            </div>
            <div className='flex items-center justify-center w-full'>
              <WelcomeIMG className='w-[238px] h-[240px]' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
