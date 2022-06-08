import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  const { currentUser, loading, logOut, isAuthenticated } = useAuth() // Make sure to use loading state to avoid errors or use the ? feature.

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1 className="font-serif text-3xl">HomePage</h1>
      {!loading && (
        <div className="mt-2">
          {isAuthenticated ? (
            <p> Hello {currentUser?.firstName}! Welcome to Hybrid Territory.</p>
          ) : (
            <p>Login to the app!</p>
          )}

          {isAuthenticated && !loading ? (
            <button
              onClick={() => {
                logOut()
              }}
              className="w-40 px-3 py-2 mt-4 text-center text-white transition-all duration-200 bg-orange-500 rounded-sm hover:shadow-md hover:shadow-orange-500/25"
            >
              Log Out
            </button>
          ) : (
            <Link to={routes.login()}>
              <div className="w-40 px-3 py-2 mt-4 text-center text-white transition-all duration-200 bg-orange-500 rounded-sm hover:shadow-md hover:shadow-orange-500/25">
                Log In
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  )
}

export default HomePage
