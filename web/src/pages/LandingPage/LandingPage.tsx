import { routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import WelcomeImage from '../../../public/welcomeImg.svg'

const LandingPage = () => {
  const handleClick = () => {
    navigate(routes.login())
  }

  return (
    <>
      <MetaTags title="Landing" description="Landing page" />
      <div className="pt-32">
        <WelcomeImage className="w-screen h-56" />
        <div className="mt-3 text-center">
          <h2 className="font-extralight font-Roboto md:text-xl dark:text-white">
            Your Territory. Simplified.
          </h2>
          <h1 className="text-4xl font-bold md:text-5xl font-Roboto dark:text-white ">
            Hybrid Territory
          </h1>
          <button
            onClick={handleClick}
            className="py-2 mt-4 text-sm font-bold text-white rounded px-14 active:translate-y-[1px] hover:bg-accent bg-dark-blue"
          >
            Launch
          </button>
        </div>
      </div>
    </>
  )
}

export default LandingPage
