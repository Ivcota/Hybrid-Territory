import { useForm } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import AssignTerritoriesCell from 'src/components/AssignTerritoriesCell'

interface IForm {
  cardName: string
  firstName: string
  lastName: string
}

const AssignTerritoryPage = () => {
  const { register, watch } = useForm<IForm>()

  return (
    <>
      <MetaTags title="AssignTerritory" description="AssignTerritory page" />

      <h1 className="text-2xl font-black">Assign Territory </h1>

      <div className="flex gap-2 mt-4">
        <div className="flex flex-col gap-1">
          <label>Card Name</label>

          <input
            className="px-1 py-1 transition-all duration-200 bg-gray-100 border border-dotted rounded-sm outline-none focus-within:ring focus-within:ring-blue-400"
            type="text"
            autoComplete="off"
            {...register('cardName')}
          />
        </div>
      </div>

      <div className="mt-5">
        <AssignTerritoriesCell
          cardName={watch('cardName').toUpperCase()}
          firstName={watch('firstName')}
          lastName={watch('lastName')}
        />
      </div>
    </>
  )
}

export default AssignTerritoryPage
