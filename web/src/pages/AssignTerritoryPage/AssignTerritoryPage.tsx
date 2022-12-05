/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useMemo } from 'react'

import ReactSelect from 'react-select'

import { Controller, useForm } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

import AssignTerritoriesCell from 'src/components/AssignTerritoriesCell'
import { useAllUsersSelectQuery } from 'src/generated/graphql'
import { useUserSelect } from 'src/hooks/useUserSelect'

// TODO: Remove the any type
interface IForm {
  cardName: string
  firstName: string
  lastName: string
  selectedUserId: {
    value: any
    label: any
  }
}

const AssignTerritoryPage = () => {
  const { register, watch, control } = useForm<IForm>()
  const { data, loading } = useAllUsersSelectQuery()
  const { setUserId } = useUserSelect()

  const generateOptions = useMemo(() => {
    if (!loading && data) {
      const newArray = data.users.map((item) => {
        return {
          label: `${item.firstName} ${item.lastName ? item.lastName : ''}`,
          value: item.id,
        }
      })

      return newArray
    }
  }, [data, loading])

  useEffect(() => {
    setUserId(watch('selectedUserId')?.value)
  }, [watch('selectedUserId')])

  return (
    <>
      <MetaTags title="AssignTerritory" description="AssignTerritory page" />

      <h1 className="text-2xl font-black dark:text-white">
        Assign Territorys{' '}
      </h1>

      <div className="flex gap-2 mt-4">
        <div className="flex flex-col gap-1">
          <label className="dark:text-white">Card Name</label>

          <input
            className="px-1 py-1 transition-all duration-200 bg-gray-100 border border-dotted rounded-sm outline-none focus-within:ring focus-within:ring-blue-400"
            type="text"
            autoComplete="off"
            {...register('cardName')}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="dark:text-white">Assign to User</label>
          <Controller
            control={control}
            name="selectedUserId"
            render={({ field }) => {
              return (
                <ReactSelect
                  onChange={field.onChange}
                  options={generateOptions}
                />
              )
            }}
          />
        </div>
      </div>

      <div className="mt-5">
        <AssignTerritoriesCell
          cardName={watch('cardName')?.toUpperCase()}
          firstName={watch('firstName')}
          lastName={watch('lastName')}
        />
      </div>
    </>
  )
}

export default AssignTerritoryPage
