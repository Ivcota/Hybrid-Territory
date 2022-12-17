import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SandboxLeafletPage = () => {
  return (
    <>
      <MetaTags title="SandboxLeaflet" description="SandboxLeaflet page" />

      <h1>SandboxLeafletPage</h1>
      <p>
        Find me in <code>./web/src/pages/SandboxLeafletPage/SandboxLeafletPage.tsx</code>
      </p>
      <p>
        My default route is named <code>sandboxLeaflet</code>, link to me with `
        <Link to={routes.sandboxLeaflet()}>SandboxLeaflet</Link>`
      </p>
    </>
  )
}

export default SandboxLeafletPage
