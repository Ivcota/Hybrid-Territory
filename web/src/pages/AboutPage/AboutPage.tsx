import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  const { currentUser, isAuthenticated, loading } = useAuth()

  return (
    <>
      <MetaTags title="About" description="About page" />

      <h1 className="font-serif text-3xl ">About</h1>
      <p className="mt-2">
        A simple territory distribution app. Documentation on how to use this
        will be provied shortly.
      </p>
    </>
  )
}

export default AboutPage
