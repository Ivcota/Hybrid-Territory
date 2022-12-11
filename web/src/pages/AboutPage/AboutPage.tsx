import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <div>
      <MetaTags title="About" description="About page" />

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="block mt-2 text-3xl font-bold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
            About Us
          </h1>
          <div className="mt-8 text-xl leading-8 text-gray-500">
            <p>What is Hybrid Territory?</p>
            <div className="mx-auto mt-6 text-lg text-gray-500 prose-indigo">
              <p>
                Hybrid Territory is a territory management solution that was
                born out of the transition from the pandemic to more normal
                activities. It is designed to individuals streamline and
                simplify their territory management processes, allowing them to
                more effectively cover their maps and assign letter writing and
                phone witnessing contacts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
