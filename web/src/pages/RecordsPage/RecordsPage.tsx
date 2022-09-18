import { MetaTags } from '@redwoodjs/web'

import RecordsCell from 'src/components/RecordsCell/'

const RecordsPage = () => {
  return (
    <>
      <MetaTags title="Records" description="Records page" />
      <h1 className="text-2xl font-extrabold dark:text-off-white font-Roboto">
        Records Page
      </h1>

      <RecordsCell />
    </>
  )
}

export default RecordsPage
