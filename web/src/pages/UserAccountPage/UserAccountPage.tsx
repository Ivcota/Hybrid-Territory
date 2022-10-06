import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { useForm } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

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

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>()

  useEffect(() => {
    setValue('firstName', currentUser?.firstName)
    setValue('lastName', currentUser?.lastName)
    setValue('phone', currentUser?.phone)
  }, [])

  return (
    <>
      <MetaTags title="UserAccount" description="UserAccount page" />
      <div className="h-screen">
        <h1 className="text-2xl font-bold font-Roboto text-dark-blue dark:text-sky-blue-dark">
          My Account
        </h1>
        <p className="mt-2 text-sm italic font-light font-OpenSans md:text-base text-off-black/80 dark:text-off-white-dark/80">
          Hi {currentUser?.firstName}! You can edit your account info here.
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
          className="flex flex-col px-4 pb-4 mx-auto duration-300 rounded shadow-xl shadow-black/5 bg-off-white dark:bg-dark-grey-dark w-80 mt-9 sm:w-96"
        >
          <h2 className="mt-4 text-2xl font-bold text-center font-Roboto text-dark-blue dark:text-sky-blue-dark">
            Account Details
          </h2>

          <hr className="w-4/5 mt-4 place-self-center border-dark-blue dark:border-htd-grey-dark border-1" />

          <p className="mt-3 italic font-light text-gray-500 font-OpenSans">
            Account Type:{' '}
            <span className="not-italic font-medium capitalize text-off-black dark:text-off-white-dark">
              {currentUser?.roles}
            </span>
          </p>

          <label className="mt-3 italic font-light text-gray-500 font-OpenSans">
            First Name
          </label>
          <input
            autoComplete="off"
            className="px-3 py-2 mt-1 bg-white border rounded outline-none font-OpenSans dark:bg-light-black-dark ring-1 ring-htd-grey dark:ring-htd-grey-dark/60 focus-within:ring-light-blue/60 focus-within:ring-2 text-off-black dark:text-off-white-dark caret-dark-blue dark:caret-sky-blue-dark"
            {...register('firstName', {
              required: 'This field is required...',
            })}
          />
          {errors.firstName && (
            <div className="mt-2 text-error dark:text-error-dark">
              {' '}
              {errors.firstName.message}{' '}
            </div>
          )}
          <label className="mt-3 italic font-light text-gray-500 font-OpenSans">
            Last Name
          </label>

          <input
            autoComplete="off"
            className="px-3 py-2 mt-1 bg-white border rounded outline-none font-OpenSans dark:bg-light-black-dark ring-1 ring-htd-grey dark:ring-htd-grey-dark/60 focus-within:ring-light-blue/60 focus-within:ring-2 text-off-black dark:text-off-white-dark caret-dark-blue dark:caret-sky-blue-dark"
            {...register('lastName', {
              required: 'This field is required...',
            })}
          />
          {errors.lastName && (
            <div className="mt-2 text-error dark:text-error-dark">
              {' '}
              {errors.lastName.message}{' '}
            </div>
          )}

          <label className="mt-3 italic font-light text-gray-500 font-OpenSans">
            Phone
          </label>

          <input
            autoComplete="off"
            className="px-3 py-2 mt-1 bg-white border rounded outline-none font-OpenSans dark:bg-light-black-dark ring-1 ring-htd-grey dark:ring-htd-grey-dark/60 focus-within:ring-light-blue/60 focus-within:ring-2 text-off-black dark:text-off-white-dark caret-dark-blue dark:caret-sky-blue-dark"
            {...register('phone', {
              required: 'This field is required...',
            })}
          />
          {errors.phone && (
            <div className="mt-2 text-error dark:text-error-dark">
              {' '}
              {errors.phone.message}{' '}
            </div>
          )}
          {!loading ? (
            <button
              className="py-2 mt-4 text-lg rounded text-off-white font-Roboto bg-dark-blue dark:bg-dark-blue-dark hover:bg-accent dark:hover:bg-accent-dark active:bg-light-blue"
              type="submit"
            >
              Update
            </button>
          ) : (
            <button
              disabled
              className="py-2 mt-4 text-lg rounded text-off-white font-Roboto bg-dark-blue dark:bg-dark-blue-dark hover:bg-accent dark:hover:bg-accent-dark active:bg-light-blue"
              type="submit"
            >
              Loading...
            </button>
          )}
        </form>
      </div>
    </>
  )
}

export default UserAccountPage
