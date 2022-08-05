import Modal from '../Modal/Modal'
import Button from '../Button/Button';
import { navigate, routes } from '@redwoodjs/router'

import placeholderImg from '../../assets/polaroid_placeholder.png';
import testImg from '../../assets/testImg.png';

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
      <div className='aspect-[4/3] w-full h-56 flex justify-center items-center'>
        <img src={placeholderImg} alt="Territory Photo" />
      </div>
      <div className='w-3/4 mx-auto text-transparent border-b border-htd-grey/50 lg:mb-4'>-</div>
      <h2 className="my-2 overflow-hidden text-xl font-medium text-center capitalize font-Roboto text-ellipsis"> {name} </h2>

      {isCompleted ? (
        <p className="mt-2">You're done with this territory.</p>
      ) : (
        <p></p>
      )}

      <Button
        onClick={() =>
          navigate(
            routes.territory({
              id,
            })
          )
        }
        variant='bare'
      >
        View Territory
      </Button>
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
