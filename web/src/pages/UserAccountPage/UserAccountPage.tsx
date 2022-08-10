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
      <h1 className="text-2xl font-black font-Roboto text-dark-blue ">
        My Account
      </h1>
      <p className="mt-2 text-sm italic font-light font-OpenSans md:text-base ">
        Hi {currentUser?.firstName}! You can edit your account info
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
        className="flex flex-col px-4 pb-4 mx-auto rounded shadow-xl shadow-black/5 bg-off-white w-80 mt-9 sm:w-96"
      >
        <h2 className="mt-4 text-2xl font-bold text-center font-Roboto text-dark-blue">
          Account Details
        </h2>

        <hr className="w-4/5 mt-4 place-self-center border-dark-blue border-1" />

        <label className="mt-3 italic font-light text-gray-500 font-OpenSans">
          First Name
        </label>
        <input
          autoComplete="off"
          className="px-3 py-2 mt-1 border rounded outline-none font-OpenSans focus-within:ring"
          {...register('firstName', {
            required: 'This field is required...',
          })}
        />
        {errors.firstName && (
          <div className="mt-2 text-error"> {errors.firstName.message} </div>
        )}
        <label className="mt-3 italic font-light text-gray-500 font-OpenSans">
          Last Name
        </label>

        <input
          autoComplete="off"
          className="px-3 py-2 mt-1 border rounded outline-none font-OpenSans focus-within:ring"
          {...register('lastName', {
            required: 'This field is required...',
          })}
        />
        {errors.lastName && (
          <div className="mt-2 text-error"> {errors.lastName.message} </div>
        )}

        <label className="mt-3 italic font-light text-gray-500 font-OpenSans">
          Phone
        </label>

        <input
          autoComplete="off"
          className="px-3 py-2 mt-1 border rounded outline-none font-OpenSans focus-within:ring"
          {...register('phone', {
            required: 'This field is required...',
          })}
        />
        {errors.phone && (
          <div className="mt-2 text-error"> {errors.phone.message} </div>
        )}
        {!loading ? (
          <button
            className="py-2 mt-4 text-lg text-white rounded font-Roboto bg-dark-blue hover:bg-accent active:bg-light-blue"
            type="submit"
          >
            Update
          </button>
        ) : (
          <button
            disabled
            className="py-2 mt-4 text-lg text-white rounded font-Roboto bg-dark-blue hover:bg-accent active:bg-light-blue"
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
