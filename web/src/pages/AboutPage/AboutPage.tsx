import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />

      <div className="px-6 mx-auto max-w-7xl">
        <h1 className="font-serif text-3xl dark:text-off-white-dark">About</h1>
        <p className="mt-2 dark:text-off-white-dark">
          A simple territory distribution app. Documentation on how to use this
          will be provied shortly.
        </p>
      </div>
    </>
  )
}

export default AboutPage
