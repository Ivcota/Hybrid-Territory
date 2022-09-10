import { createContext } from 'react'

import type {
  FindViewTerritoryQuery,
  FindTerritoryByIdVariables,
  FindViewTerritoryQueryVariables,
} from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useUpdateTerritoryMutation } from 'src/generated/graphql'

import placeholderImg from '../../assets/polaroid_placeholder.png'
import Button from '../Button/Button'
import DNCModal from '../DNCModal/DNCModal'

interface IViewViewTerritoryCellContext {
  territoryId: string
}

export const ViewTerritoryCellContext =
  createContext<IViewViewTerritoryCellContext | null>(null)

export const QUERY = gql`
  query FindViewTerritoryQuery($id: String!) {
    territory(id: $id) {
      id
      name
      spreadsheetURL
      isCompleted
      userId
      imageURL
      __typename
    }
  }
`

export const Loading = () => (
  <div className="mt-5 text-center animate-pulse">Loading...</div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindViewTerritoryQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  territory,
}: CellSuccessProps<FindViewTerritoryQuery, FindTerritoryByIdVariables>) => {
  const [UpdateTerritory, { loading }] = useUpdateTerritoryMutation({
    refetchQueries: ['FindViewTerritoryQuery'],
  })

  const { currentUser } = useAuth()

  if (territory.userId !== currentUser?.id) {
    return (
      <div className="text-error">
        You&apos;re not authorized to view this territory.
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col justify-between px-5 py-4 pt-10 rounded-md shadow-sm w-72 dark:bg-dark-grey-dark lg:w-96  bg-off-white border-2 ${
        territory.isCompleted
          ? 'border-success/60 dark:border-success'
          : 'border-transparent'
      }`}
      key={territory.id}
    >
      <div className="aspect-[4/3] w-full h-56 lg:h-64 flex justify-center items-center">
        <a
          href={territory.imageURL ? territory.imageURL : placeholderImg}
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="rounded-md"
            src={territory.imageURL ? territory.imageURL : placeholderImg}
            alt="Territory"
          />
        </a>
      </div>
      <div className="w-3/4 mx-auto text-transparent border-b border-htd-grey/50 dark:border-htd-grey-dark lg:mb-4">
        -
      </div>
      <h1 className="mt-3 ml-4 text-xl font-medium font-Roboto text-dark-blue dark:text-light-blue">
        {territory.name}
      </h1>
      <p className="ml-4 text-xs italic font-light font-OpenSans sm:text-base dark:text-off-white">
        Status:{' '}
        {territory.isCompleted ? (
          <p className="inline text-base not-italic font-normal font-Roboto text-success dark:text-success-dark">
            Completed
          </p>
        ) : (
          <p className="inline text-base not-italic font-normal font-Roboto text-dark-blue dark:text-light-blue">
            In Progress
          </p>
        )}
      </p>

      <a
        href={territory.spreadsheetURL}
        target="_blank"
        className="flex items-center justify-center"
        rel="noreferrer"
      >
        <button className="flex items-center mt-6 mb-4 font-medium tracking-wider rounded-sm bg-none font-Roboto text-htd-grey dark:text-htd-grey-dark hover:text-accent dark:hover:text-accent-dark active:text-light-blue lg:mt-12">
          View Details
        </button>
      </a>
      <ViewTerritoryCellContext.Provider
        value={{
          territoryId: territory.id,
        }}
      >
        <DNCModal />
      </ViewTerritoryCellContext.Provider>

      {territory.isCompleted ? (
        <Button
          onClick={async () => {
            UpdateTerritory({
              variables: {
                id: territory.id,
                input: {
                  isCompleted: !territory.isCompleted,
                },
              },
            })
          }}
          disabled={loading ? true : false}
          variant="custom"
          className={`tracking-wider text-off-white bg-accent dark:bg-accent-dark rounded-sm hover:bg-accent/70 dark:hover:bg-accent-dark/70 active:bg-accent/70 pt-2 pb-2 ${
            loading && 'animate-pulse'
          }`}
        >
          {!loading ? 'Mark as Not Completed' : 'Loading...'}
        </Button>
      ) : (
        <Button
          disabled={loading ? true : false}
          onClick={async () => {
            UpdateTerritory({
              variables: {
                id: territory.id,
                input: {
                  isCompleted: !territory.isCompleted,
                },
              },
            })
          }}
          variant="custom"
          className={`tracking-wider text-white bg-success dark:bg-success-dark rounded-sm hover:bg-success/70 dark:hover:bg-success-dark/70 active:bg-success/50 pt-2 pb-2 ${
            loading && 'animate-pulse'
          }`}
        >
          {!loading ? 'Mark as Complete' : 'Loading...'}
        </Button>
      )}
    </div>
  )
}
