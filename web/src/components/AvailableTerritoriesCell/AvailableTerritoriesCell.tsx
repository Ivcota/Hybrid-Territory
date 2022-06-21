import { useAuth } from '@redwoodjs/auth'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import dayjs from 'dayjs'
import _ from 'lodash'
import {
  useSendMessageMutation,
  useUpdateTerritoryMutation,
} from 'src/generated/graphql'
import type { AvailableTerritoriesQuery } from 'types/graphql'

export const QUERY = gql`
  query AvailableTerritoriesQuery {
    availableTerritories {
      id
      name
      isCompleted
    }
  }
`

export const Loading = () => (
  <div className="mt-5 text-center animate-pulse">Loading...</div>
)

export const Empty = () => (
  <div className="mt-5 text-xl font-bold text-center animate-pulse">
    All Territories are checked out right now...
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  availableTerritories,
}: CellSuccessProps<AvailableTerritoriesQuery>) => {
  const [updateTerritory] = useUpdateTerritoryMutation({
    refetchQueries: ['AvailableTerritoriesQuery'],
  })

  const { currentUser } = useAuth()
  const [sendMessage] = useSendMessageMutation()

  const now = dayjs()

  return (
    <>
      <div className="flex flex-col flex-wrap items-center justify-center gap-4 md:flex-row">
        {_.sortBy(availableTerritories, ['name']).map((item) => {
          return (
            <div
              className="flex flex-col items-center gap-3 px-10 py-4 mt-3 transition-all duration-300 rounded-lg shadow-lg hover:-translate-y-1"
              key={item.id}
            >
              <h2 className="text-2xl text-center"> {item.name} </h2>
              <button
                className="px-3 py-2 text-white transition-all duration-200 rounded-sm shadow-md bg-gradient-to-br from-green-500 to-green-600 hover:from-indigo-500 hover:to-indigo-600 active:from-indigo-600 active:to-indigo-670"
                onClick={async () => {
                  await toast.promise(
                    updateTerritory({
                      variables: {
                        id: item.id,
                        input: {
                          userId: currentUser?.id,
                        },
                      },
                    }),
                    {
                      loading: 'loading...',
                      error: 'Error...',
                      success: `${item.name} has been assigned to you.`,
                    }
                  )

                  sendMessage({
                    variables: {
                      phone: process.env.REDWOOD_ENV_PHONENUMBER,
                      message: `${currentUser?.firstName} checked out territory card ${item.name} at ${now}.`,
                    },
                  })
                }}
              >
                Checkout
              </button>
            </div>
          )
        })}
      </div>
      <Toaster />
    </>
  )
}
