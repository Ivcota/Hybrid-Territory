import { createContext, useState } from 'react'

import _ from 'lodash'
import type { AvailableTerritoriesQuery } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { MappedTerritories, TerritoryModal } from './SupportingComponents'

export const QUERY = gql`
  query AvailableTerritoriesQuery {
    availableTerritories {
      id
      name
      isCompleted
      imageURL
    }
  }
`

export interface ITerritory {
  id: string
  name: string
  isCompleted: boolean
  imageURL?: string
  __typename?: 'Territory'
}

export const Loading = () => (
  <div className="mt-5 text-center animate-pulse font-OpenSans text-off-black dark:text-off-white-dark">
    Loading...
  </div>
)

export const Empty = () => (
  <div className="mt-5 text-xl font-bold text-center animate-pulse font-OpenSans text-off-black dark:text-off-white-dark">
    All Territories are checked out right now...
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  availableTerritories,
}: CellSuccessProps<AvailableTerritoriesQuery>) => {
  const [isOpen, setIsOpen] = useState(false)
  const [territoryId, setTerritoryId] = useState('')
  const { Provider } = MappedTerritoriesContext

  return (
    <>
      <Toaster />
      <Provider
        value={{
          isOpen,
          setIsOpen,
          setTerritoryId,
        }}
      >
        <MappedTerritories availableTerritories={availableTerritories} />
      </Provider>
      <TerritoryModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        territoryId={territoryId}
      />
    </>
  )
}

interface IMappedContext {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  setTerritoryId: (territoryId: string) => void
}

export const MappedTerritoriesContext = createContext<IMappedContext | null>(
  null
)
