import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  const { currentUser, isAuthenticated, loading } = useAuth()

  return (
    <>
      <MetaTags title="About" description="About page" />

      <h1 className="font-serif text-3xl ">About</h1>
      <p className="mt-2">
        This is a fullstack app for managing territory on a hybrid level.
      </p>
      {!loading && isAuthenticated && (
        <div>
          <h1 className="mt-3 text-2xl">Here are your territories:</h1>
          {currentUser?.territories?.map((territory) => {
            return (
              <div
                className="max-w-sm p-2 mt-2 transition-all duration-150 bg-red-300 rounded-sm cursor-pointer hover:-translate-y-1"
                key={territory.id}
              >
                <h2>{territory.name}</h2>
                <p> {territory.userId} </p>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default AboutPage
