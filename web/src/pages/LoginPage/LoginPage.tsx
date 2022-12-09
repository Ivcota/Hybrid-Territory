import { useRef, useState } from 'react'
import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.myTerritories())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    setIsLoading(true)
    const response = await logIn({ ...data })
    setIsLoading(false)

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <main className="flex flex-col items-center justify-between w-full h-screen pt-14">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="w-5/6 ">
          <div className="px-5 mx-auto md:w-96 sm:w-8/12">
            <div className="p-4 rounded ">
              <Form
                onSubmit={onSubmit}
                className="flex flex-col justify-between"
              >
                <div className="h-24">
                  <Label
                    name="username"
                    className="block text-sm font-bold text-gray-700 font-Roboto"
                    errorClassName="text-sm font-bold text-error font-OpenSan"
                  >
                    Email
                  </Label>
                  <TextField
                    name="username"
                    className="block w-full px-2 py-3 mt-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    errorClassName="rw-input border-error mt-1 caret-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Username is required',
                      },
                    }}
                  />
                  <FieldError
                    name="username"
                    className="mt-2 text-xs font-semibold uppercase text-error"
                  />
                </div>

                <div className="h-32 mt-2">
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
                  <div className="flex items-center justify-end">
                    <Link
                      to={routes.forgotPassword()}
                      className="mt-4 text-sm text-gray-500"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="rw-button-group">
                  {isLoading ? (
                    <Submit
                      disabled
                      className="items-center px-4 py-2 text-base font-medium text-center text-white bg-blue-700 border border-transparent rounded-md shadow-sm w-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 animate-pulse"
                    >
                      Loading...
                    </Submit>
                  ) : (
                    <Submit className="items-center px-4 py-2 text-base font-medium text-center text-white border border-transparent rounded-md shadow-sm w-28 bg-dark-blue hover:bg-accent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Login
                    </Submit>
                  )}
                </div>
              </Form>
            </div>
          </div>
          <div className="flex items-center justify-center mt-3 text-xs text-gray-500 font-OpenSans">
            <span>Don&apos;t have an account?</span>{' '}
            <Link
              to={routes.signup()}
              className="ml-1 font-bold underline capitalize"
            >
              Sign up!
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

export default LoginPage
