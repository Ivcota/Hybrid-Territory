import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'

const HomePage = () => {
  const { currentUser, loading, logOut, isAuthenticated } = useAuth() // Make sure to use loading state to avoid errors or use the ? feature.

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1 className="mt-10 font-serif text-3xl text-center font-Roboto text-off-black dark:text-off-white-dark">
        Welcome!
      </h1>

      {!loading ? (
        <div className="text-center font-OpenSans text-off-black dark:text-off-white-dark/80">
          {isAuthenticated ? (
            <p className="my-4">
              {' '}
              Hello {currentUser?.firstName}! Welcome to Hybrid Territory.
            </p>
          ) : (
            <p className="my-4">
              {' '}
              A simple territory distribution application.{' '}
            </p>
          )}

          {isAuthenticated && !loading ? (
            <Button
              onClick={() => {
                logOut()
              }}
              variant="full"
            >
              Log Out
            </Button>
          ) : (
            <Link to={routes.login()}>
              <Button variant="full">Log In</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-10 text-center animate-pulse ">Loading...</div>
      )}
    </>
  )
}

export default HomePage
