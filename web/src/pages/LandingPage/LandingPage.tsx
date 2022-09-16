import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Button from 'src/components/Button/Button';

import LandingBG from '../../../public/landingBg.svg';
import WelcomeIMG from '../../../public/welcomeImg.svg';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <MetaTags title="Landing" description="Landing page" />

      <div className='relative w-full'>
      <div className='max-h-screen overflow-hidden z-[-1]'>
        <LandingBG className='' />
      </div>
        <div className='absolute top-0 left-0 flex flex-col items-center justify-between w-full h-full py-10 lg:py-16'>
          <div className='text-transparent'>-</div>
          <div className='w-[300px] h-[400px] lg:w-[450px] lg:h-[550px] bg-white rounded-lg flex flex-col items-center justify-between p-6 lg:p-14'>
            <div className='flex flex-col items-center'>
              <h1 className='mb-1 text-2xl font-light lg:text-3xl font-Albert text-off-black'>Hybrid<span className='font-semibold'>Territory</span></h1>
              <p className='text-xs italic font-light tracking-wide lg:text-sm font-OpenSans text-off-black'>Your Territory. Simplified.</p>
            </div>
            <div className='flex items-center justify-center w-full'>
              <WelcomeIMG className='w-[238px] h-[240px] lg:w-[304px] lg:h-[307px]' />
            </div>
          </div>
          <Link to={!isAuthenticated ? routes.login() : routes.myTerritories()}>
            <Button variant='custom' className='font-medium tracking-wider text-dark-blue min-h-[39px] active:bg-light-blue active:text-off-white bg-off-white lg:hover:bg-dark-blue lg:hover:text-off-white'>ENTER</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default LandingPage
