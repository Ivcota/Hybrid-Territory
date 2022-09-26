import { useState } from 'react'

import { Dialog } from '@headlessui/react'
import _ from 'lodash'
import type { AvailableTerritoriesQuery } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { TerritoryCardWrapper } from './SupportingComponents'

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
  return (
    <>
      <div className="flex flex-col flex-wrap items-center justify-center gap-4 lg:gap-8 md:flex-row">
        {availableTerritories
          .slice()
          .sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { numeric: true })
          )
          .map((item) => {
            return <TerritoryCardWrapper item={item} key={item.id} />
          })}
      </div>
      <Toaster />
    </>
  )
}

function TerritoryModal() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>Deactivate account</Dialog.Title>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        <button onClick={() => setIsOpen(false)}>Deactivate</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Dialog.Panel>
    </Dialog>
  )
}
