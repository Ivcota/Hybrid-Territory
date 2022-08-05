import Modal from '../Modal/Modal'
import { navigate, routes } from '@redwoodjs/router'

interface Props {
  territoryCard: {
    id: string
    name: string
    spreadsheetURL?: string
    imageURL?: string
    userId?: string
    isCompleted: boolean
  }
  submitTerritory: any
  loading: boolean
}

const UserListTerritoryCard = ({
  territoryCard,
  submitTerritory,
  loading,
}: Props) => {
  const { id, name, isCompleted, spreadsheetURL, userId, imageURL } =
    territoryCard

  return (
    <div
      key={id}
      className={`w-64 px-3 py-4 rounded-lg shadow-lg flex flex-col justify-center items-center ${
        isCompleted ? '' : ' bg-slate-50'
      }`}
      id={id}
    >
      <h2 className="text-xl font-bold text-center"> {name} </h2>

      {isCompleted ? (
        <p className="mt-2">You're done with this territory.</p>
      ) : (
        <p></p>
      )}

      <button
        onClick={() =>
          navigate(
            routes.territory({
              id,
            })
          )
        }
        className={`w-full p-2 mt-3 text-center text-white rounded-sm ${
          !isCompleted
            ? 'bg-blue-600 hover:bg-blue-500'
            : 'bg-red-600 hover:bg-red-900 active:bg-red-800 '
        }`}
      >
        View Territory
      </button>
      {isCompleted && (
        <Modal
          title={!loading ? 'Turn in Territory Card' : 'Loading...'}
          heading="Turn in Territory Card?"
          text="This will turn in your territory card and notify the territory servant."
          fn={submitTerritory}
          className={
            !loading
              ? 'w-full p-2 mt-3 text-center text-white bg-green-600 rounded-sm active:bg-green-900 hover:bg-green-800'
              : 'w-full p-2 mt-3 text-center text-white bg-green-800 rounded-sm animate-pulse'
          }
        />
      )}
    </div>
  )
}

export default UserListTerritoryCard
