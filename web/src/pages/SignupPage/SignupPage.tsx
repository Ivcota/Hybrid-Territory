import { useRef, useState } from 'react'
import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.myTerritories())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    const response = await signUp({ ...data })
    setLoading(false)

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <main className="flex flex-col items-center justify-between w-full min-h-screen pt-8 h-max 2xl:pt-24">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="w-5/6 max-w-sm">
          <div className="mx-auto md:w-96 ">
            <header className="flex items-center justify-center w-full">
              <h2 className="my-4 text-2xl font-extrabold lg:mt-4 ">
                Create An Account!
              </h2>
            </header>

            <div className="p-4 rounded ">
              <Form
                onSubmit={onSubmit}
                className="flex flex-col justify-between"
              >
                <div className="h-24">
                  <Label
                    name="username"
                    className="block text-sm font-bold text-gray-700 font-Roboto"
                    errorClassName="text-sm font-bold text-error font-OpenSans mt-0"
                  >
                    Email
                  </Label>
                  <TextField
                    name="username"
                    className="block w-full px-2 py-3 mt-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    errorClassName="rw-input border-error mt-1 caret-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Email is required',
                      },
                    }}
                  />
                  <FieldError
                    name="username"
                    className="mt-2 text-xs font-semibold uppercase text-error"
                  />
                </div>
                <div className="h-24">
                  <Label
                    name="firstName"
                    className="block text-sm font-bold text-gray-700 font-Roboto"
                    errorClassName="text-sm font-bold text-error font-OpenSans mt-0"
                  >
                    First Name
                  </Label>
                  <TextField
                    name="firstName"
                    className="block w-full px-2 py-3 mt-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    errorClassName="rw-input border-error mt-1 caret-error"
                    validation={{
                      required: {
                        value: true,
                        message: 'First Name is required',
                      },
                    }}
                  />
                  <FieldError
                    name="firstName"
                    className="mt-2 text-xs font-semibold uppercase text-error"
                  />
                </div>
                <div className="h-24">
                  <Label
                    name="lastName"
                    className="block text-sm font-bold text-gray-700 font-Roboto"
                    errorClassName="text-sm font-bold text-error font-OpenSans mt-0"
                  >
                    Last Name
                  </Label>
                  <TextField
                    name="lastName"
                    className="block w-full px-2 py-3 mt-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    errorClassName="rw-input border-error mt-1 caret-error"
                    validation={{
                      required: {
                        value: true,
                        message: 'Last Name is required',
                      },
                    }}
                  />
                  <FieldError
                    name="lastName"
                    className="mt-2 text-xs font-semibold uppercase text-error"
                  />
                </div>
                <div className="h-24">
                  <Label
                    name="phone"
                    className="block text-sm font-bold text-gray-700 font-Roboto"
                    errorClassName="text-sm font-bold text-error font-OpenSans mt-0"
                  >
                    Phone
                  </Label>
                  <TextField
                    name="phone"
                    className="block w-full px-2 py-3 mt-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    errorClassName="rw-input border-error mt-1 caret-error"
                    validation={{
                      required: {
                        value: true,
                        message: 'Phone is required',
                      },
                    }}
                  />
                  <FieldError
                    name="phone"
                    className="mt-2 text-xs font-semibold uppercase text-error"
                  />
                </div>
                <div className="h-24">
                  <Label
                    name="password"
                    className="block text-sm font-bold text-gray-700 font-Roboto"
                    errorClassName="text-sm font-bold text-error font-OpenSans mt-0"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="block w-full px-2 py-3 mt-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    errorClassName="rw-input border-error mt-1 caret-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />
                  <FieldError
                    name="password"
                    className="mt-2 text-xs font-semibold uppercase text-error"
                  />
                </div>
                <div className="rw-button-group">
                  {loading ? (
                    <Submit
                      disabled
                      className="items-center px-4 py-2 text-base font-medium text-center text-white bg-blue-700 border border-transparent rounded-md shadow-sm w-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 animate-pulse"
                    >
                      Loading...
                    </Submit>
                  ) : (
                    <Submit className="items-center px-4 py-2 text-base font-medium text-center text-white border border-transparent rounded-md shadow-sm w-28 bg-dark-blue hover:bg-accent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Sign Up
                    </Submit>
                  )}
                </div>
              </Form>
            </div>
          </div>
          <div className="flex items-center justify-center my-3 text-xs text-gray-500 font-OpenSans">
            <span>Already have an account?</span>{' '}
            <Link
              to={routes.login()}
              className="ml-1 font-bold underline capitalize"
            >
              Log in!
            </Link>
          </div>
        </div>
        <footer>
          <p className="text-transparent">-</p>
        </footer>
      </main>
    </>
  )
}

export default SignupPage
