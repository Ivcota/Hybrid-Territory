import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import AssignTerritoriesCell from 'src/components/AssignTerritoriesCell'

const AssignTerritoryPage = () => {
  return (
    <>
      <MetaTags title="AssignTerritory" description="AssignTerritory page" />

      <h1>AssignTerritoryPage</h1>

      <AssignTerritoriesCell />
    </>
  )
}

export default AssignTerritoryPage
