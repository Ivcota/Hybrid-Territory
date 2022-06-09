import { useAuth } from '@redwoodjs/auth'
import { useForm } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useEffect } from 'react'
import { useUpdateUserMutation } from 'src/generated/graphql'

interface FormProps {
  firstName: string
  lastName: string
  email: string
  phone: string
}

const UserAccountPage = () => {
  const { currentUser, reauthenticate } = useAuth()
  const [updateUser] = useUpdateUserMutation({
    refetchQueries: ['GetCurrentUser'],
    onCompleted: () => {
      reauthenticate()
    },
  })

  const { register, setValue, handleSubmit } = useForm<FormProps>()

  useEffect(() => {
    setValue('firstName', currentUser?.firstName)
    setValue('lastName', currentUser?.lastName)
    setValue('phone', currentUser?.phone)
  }, [])

  return (
    <>
      <MetaTags title="UserAccount" description="UserAccount page" />
      <h1 className="text-2xl font-black">My Account</h1>
      <p className="mt-2">
        Hi {currentUser?.firstName}! You can edit your account here:
      </p>

      <form
        onSubmit={handleSubmit(
          async ({ firstName, lastName, email, phone }) => {
            await updateUser({
              variables: {
                id: currentUser?.id,
                input: {
                  email,
                  firstName,
                  lastName,
                  phone,
                },
              },
            })
          }
        )}
        className="flex flex-col px-8"
      >
        <label className="mt-1">First Name</label>
        <input
          autoComplete="off"
          className="px-1 py-1 mt-1 border rounded-sm outline-none w-44 focus-within:ring"
          {...register('firstName')}
        />
        <label className="mt-1">Last Name</label>

        <input
          autoComplete="off"
          className="px-1 py-1 mt-1 border rounded-sm outline-none w-44 focus-within:ring"
          {...register('lastName')}
        />

        <label className="mt-1">Phone</label>

        <input
          autoComplete="off"
          className="px-1 py-1 mt-1 border rounded-sm outline-none w-44 focus-within:ring"
          {...register('phone')}
        />
        <button
          className="w-56 py-1 mt-4 text-white bg-blue-500 rounded-sm "
          type="submit"
        >
          Update
        </button>
      </form>
    </>
  )
}

export default UserAccountPage
