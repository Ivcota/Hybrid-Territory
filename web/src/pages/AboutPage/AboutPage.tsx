import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />

      <h1 className="font-serif text-3xl ">About</h1>
      <p className="mt-2">
        This is a fullstack app for managing territory on a hybrid level.
      </p>
    </>
  )
}

export default AboutPage
