import { createContext } from 'react'

import { Loader } from '@mantine/core'
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
  <div className="flex justify-center mt-10 ">
    <Loader />
  </div>
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

  if (!currentUser.roles.includes('admin')) {
    if (territory.userId !== currentUser?.id) {
      return (
        <div className="text-error">
          You&apos;re not authorized to view this territory.
        </div>
      )
    }
  }

  return (
    <div
      className={`flex flex-col justify-between px-5 py-4 pt-10 rounded-md  w-72 dark:bg-dark-grey-dark lg:w-96  bg-gray-100 shadow-md border-2 ${
        territory.isCompleted
          ? 'border-success/60 dark:border-success '
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
      <h1 className="mt-3 ml-4 text-xl font-medium font-Roboto dark:text-white">
        {territory.name}
      </h1>
      <p className="ml-4 text-xs italic font-light sm:text-base dark:text-off-white">
        {territory.isCompleted ? (
          <p className="inline text-base not-italic font-normal text-green-700 dark:text-green-400">
            Completed
          </p>
        ) : (
          <p className="inline text-base not-italic font-normal text-dark-blue dark:text-light-blue">
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
        <button className="inline-flex items-center justify-center w-full px-4 py-2 mt-4 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ">
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
        <button
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
          className={`items-center text-center px-4 py-2 text-base font-medium border border-transparent rounded-md text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
            loading && 'animate-pulse'
          }`}
        >
          {!loading ? 'Mark as Not Completed' : 'Loading...'}
        </button>
      ) : (
        <button
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
          className={` items-center text-center px-4 py-2 text-base font-medium   border border-transparent rounded-md text-white bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
            loading && 'animate-pulse'
          }`}
        >
          {!loading ? 'Mark as Complete' : 'Loading...'}
        </button>
      )}
    </div>
  )
}
