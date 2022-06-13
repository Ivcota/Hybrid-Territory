import { useAuth } from '@redwoodjs/auth'
import { useForm } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { useEffect } from 'react'
import { navigate, routes } from '@redwoodjs/router'
import { useUpdateUserMutation } from 'src/generated/graphql'

interface FormProps {
  firstName: string
  lastName: string
  email: string
  phone: string
}

const UserAccountPage = () => {
  const { currentUser, reauthenticate } = useAuth()
  const [updateUser, { loading }] = useUpdateUserMutation({
    onCompleted: () => {
      reauthenticate()
      navigate(routes.myTerritories())
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
        className="flex flex-col px-4 pb-4 mx-auto rounded shadow-lg w-80 mt-9 sm:w-96"
      >
        <h2 className="mt-2 text-2xl font-bold text-center">Account Details</h2>
        <label className="mt-3">First Name</label>
        <input
          autoComplete="off"
          className="px-1 py-1 mt-1 border rounded-sm outline-none focus-within:ring"
          {...register('firstName')}
        />
        <label className="mt-3">Last Name</label>

        <input
          autoComplete="off"
          className="px-1 py-1 mt-1 border rounded-sm outline-none focus-within:ring"
          {...register('lastName')}
        />

        <label className="mt-3">Phone</label>

        <input
          autoComplete="off"
          className="px-1 py-1 mt-1 border rounded-sm outline-none focus-within:ring"
          {...register('phone')}
        />
        {!loading ? (
          <button
            className="py-1 mt-4 text-white bg-blue-500 rounded-sm hover:bg-blue-600 active:bg-blue-400"
            type="submit"
          >
            Update
          </button>
        ) : (
          <button
            disabled
            className="py-1 mt-4 text-white bg-blue-500 rounded-sm hover:bg-blue-600 animate-pulse active:bg-blue-400"
            type="submit"
          >
            Loading...
          </button>
        )}
      </form>
    </>
  )
}

export default UserAccountPage
