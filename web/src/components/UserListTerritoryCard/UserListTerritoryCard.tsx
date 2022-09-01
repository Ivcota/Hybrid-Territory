import { navigate, routes } from '@redwoodjs/router'

import placeholderImg from '../../assets/polaroid_placeholder.png'
import Button from '../Button/Button'
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
      className={`w-64 px-3 py-4 rounded-lg shadow-sm flex flex-col justify-center items-center border-2 hover:-translate-y-3 transition-all duration-300 bg-off-white dark:bg-dark-grey-dark ${
        isCompleted ? 'border-success/40' : ' border-transparent'
      } lg:justify-start`}
      id={id}
    >
      <div className="aspect-[4/3] w-full h-56 flex justify-center items-center">
        <img src={imageURL ? imageURL : placeholderImg} alt="Territory" />
      </div>
      <div className="w-3/4 mx-auto text-transparent border-b border-htd-grey/50 lg:mb-4">
        -
      </div>
      <h2 className="my-2 overflow-hidden text-xl font-medium text-center capitalize font-Roboto text-ellipsis dark:text-off-white ">
        {name}
      </h2>
      <button
        className="px-5 py-1 font-medium tracking-wider transition-all duration-100 border rounded-sm bg-none text-dark-blue hover:text-accent dark:hover:text-accent active:text-light-blue border-dark-blue hover:border-accent active:border-light-blue font-Roboto dark:text-light-blue dark:outline-light-blue"
        onClick={() =>
          navigate(
            routes.territory({
              id,
            })
          )
        }
      >
        View Territory
      </button>

      {isCompleted && (
        <Modal
          title={!loading ? 'Turn In Territory' : 'Loading...'}
          heading="Turn in Territory Card?"
          text="This will turn in your territory card and notify the territory servant."
          fn={submitTerritory}
          className="px-5 py-1 mt-2 font-medium tracking-wider transition-all duration-100 rounded-sm bg-none text-success/60 hover:text-accent active:text-light-blue font-Roboto animate-pulse"
        />
      )}
    </div>
  )
}

export default UserListTerritoryCard
