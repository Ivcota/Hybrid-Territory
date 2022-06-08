import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import MyTerritoriesCell from '../../components/MyterritoriesCell'

const MyTerritoriesPage = () => {
  return (
    <>
      <MetaTags title="MyTerritories" description="MyTerritories page" />

      <div className="flex flex-col items-center mt-4">
        <h1 className="text-3xl font-black">Your Territories</h1>

        <p className="mt-3">Here are the territories assigned to you.</p>
        <button className="px-3 py-2 mt-4 text-center text-white transition-all duration-200 bg-orange-500 rounded-sm w-[14rem] hover:shadow-md hover:shadow-orange-500/25">
          Request More Territory
        </button>
      </div>

      <MyTerritoriesCell />
    </>
  )
}

export default MyTerritoriesPage
