import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const RecordsPage = () => {
  return (
    <>
      <MetaTags title="Records" description="Records page" />

      <h1>RecordsPage</h1>
      <p>
        Find me in <code>./web/src/pages/RecordsPage/RecordsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>records</code>, link to me with `
        <Link to={routes.records()}>Records</Link>`
      </p>
    </>
  )
}

export default RecordsPage
