import { navigate, routes } from '@redwoodjs/router'

import placeholderImg from '../../assets/polaroid_placeholder.png'
import Modal from '../Modal/Modal'

interface Props {
  territoryCard: {
    id: string
    name: string
    spreadsheetURL?: string
    imageURL?: string
    userId?: string
    isCompleted: boolean
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submitTerritory: any
  loading: boolean
}

const UserListTerritoryCard = ({
  territoryCard,
  submitTerritory,
  loading,
}: Props) => {
  const { id, name, isCompleted, imageURL } = territoryCard

  return (
    <div
      key={id}
      className={`w-64 px-5 py-6 rounded-lg flex flex-col justify-center items-center shadow-md hover:-translate-y-[1px] transition-all duration-300 bg-gray-100  dark:bg-dark-grey-dark ${
        isCompleted &&
        ' border border-green-400  dark:border-green-700  -translate-y-2'
      } lg:justify-start`}
      id={id}
    >
      <div className="aspect-[4/3] w-full h-56 flex justify-center items-center">
        <img src={imageURL ? imageURL : placeholderImg} alt="Territory" />
      </div>
      <div className="w-3/4 mx-auto text-transparent border-b border-htd-grey/50 lg:mb-4">
        -
      </div>
      <h2 className="my-2 overflow-hidden text-xl font-medium text-center capitalize dark:text-white font-Roboto text-ellipsis">
        {name}
      </h2>
      <button
        onClick={() =>
          navigate(
            routes.territory({
              id,
            })
          )
        }
        className="inline-flex items-center px-4 py-2 text-base font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md dark:text-white dark:bg-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        View Territory
      </button>

      {isCompleted && (
        <Modal
          title={!loading ? 'Turn In Territory' : 'Loading...'}
          heading="Turn in Territory Card?"
          text="This will turn in your territory card and notify the territory servant."
          fn={submitTerritory}
          className="inline-flex items-center px-4 py-2 mt-2 text-base font-medium text-red-700 bg-red-100 border border-transparent rounded-md dark:hover:bg-red-600 dark:text-white dark:bg-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />
      )}
    </div>
  )
}

export default UserListTerritoryCard
