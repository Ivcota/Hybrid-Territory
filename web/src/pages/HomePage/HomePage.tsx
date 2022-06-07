import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="flex  flex-col items-center">
        <h1 className="md:text-3xl text-2xl">Home</h1>
        <Link
          to={routes.login()}
          className="bg-blue-500 w-20 text-center text-white px-2 py-1 rounded-sm hover:bg-blue-700 mt-2 active:bg-blue-400"
        >
          Login
        </Link>
      </div>
    </>
  )
}

export default HomePage
