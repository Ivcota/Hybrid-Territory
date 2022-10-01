import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import IssueTrackerCell from 'src/components/IssueTrackerCell'

const IssueTrackerPage = () => {
  return (
    <>
      <MetaTags title="IssueTracker" description="IssueTracker page" />

      <h1 className="text-2xl font-bold">Issue Tracking</h1>
      <p className="mt-2">
        Here you can track all the territory issues. Filters will be provided.
      </p>

      <IssueTrackerCell />
    </>
  )
}

export default IssueTrackerPage
