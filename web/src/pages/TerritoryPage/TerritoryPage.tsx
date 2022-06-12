import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ViewTerritoryCell from '../../components/ViewTerritoryCell'

interface PageProps {
  id: string
}

const TerritoryPage = ({ id }: PageProps) => {
  return (
    <>
      <MetaTags title="Territory" description="Territory page" />
      <Link to={routes.myTerritories()}>
        <button className="px-3 py-1 mb-5 text-white bg-red-500 rounded-sm hover:bg-red-400 ">
          Back
        </button>
      </Link>
      <div className="flex justify-center">
        <ViewTerritoryCell id={id} />
      </div>
    </>
  )
}

export default TerritoryPage
