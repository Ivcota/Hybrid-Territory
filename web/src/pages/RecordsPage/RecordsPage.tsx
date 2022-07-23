import { useForm } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { createContext } from 'react'
import RecordsCell from 'src/components/RecordsCell/'

interface RPCI {
  territoryName: string
}

export const RecordsPageContext = createContext<RPCI>(null)

interface IForm {
  territoryName: string
}

const RecordsPage = () => {
  const { register, watch } = useForm<IForm>()

  return (
    <RecordsPageContext.Provider
      value={{
        territoryName: watch('territoryName'),
      }}
    >
      <MetaTags title="Records" description="Records page" />
      <h1 className="text-2xl font-extrabold">Records Page</h1>
      <input
        placeholder="Territory Name"
        {...register('territoryName')}
        type="text"
      />

      <RecordsCell />
    </RecordsPageContext.Provider>
  )
}

export default RecordsPage
