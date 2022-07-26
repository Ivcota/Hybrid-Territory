import { Link, navigate, routes } from '@redwoodjs/router'
import { useRef, useState } from 'react'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useEffect } from 'react'

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

      <main className="flex flex-col items-center justify-between w-full h-screen bg-gradient-to-br from-teal-blue to-light-blue">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <header className='flex items-center justify-start w-full h-16 px-4'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-Albert text-off-white'>Hybrid<span className='font-bold'>Territory</span></h1>
            <p className='text-xs capitalize text-off-white font-Roboto'>your territory. simplified.</p>
          </div>
        </header>
        <div className="w-2/3 max-w-sm">
          <div className="mx-auto md:w-96 sm:w-8/12">
            <header className="flex items-center justify-center w-full">
              <h2 className="my-8 text-2xl font-medium font-Roboto text-off-white">Welcome!</h2>
            </header>

            <div className="p-4 rounded bg-off-white">
                <Form onSubmit={onSubmit} className="flex flex-col justify-between">
              <div className='h-24'>
                <Label
                    name="username"
                    className="mt-0 text-sm font-bold text-dark-blue font-OpenSans"
                    errorClassName="text-sm font-bold text-red-600 font-OpenSans mt-0"
                >
                    Email
                </Label>
                <TextField
                    name="username"
                    className="mt-1 text-sm rw-input caret-dark-blue font-Roboto text-off-black"
                    errorClassName="rw-input border-red-600 mt-1 caret-red-600"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Username is required',
                      },
                    }}
                />
                <FieldError name="username" className="mt-2 text-xs font-semibold text-red-600 uppercase" />
              </div>
              <div className='h-32 mt-2'>
              <Label
                    name="password"
                    className="mt-0 text-sm font-bold text-dark-blue font-OpenSans "
                    errorClassName="text-sm font-bold text-red-600 font-OpenSans mt-0"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="mt-1 text-sm rw-input caret-dark-blue font-Roboto text-off-black"
                    errorClassName="rw-input border-red-600 mt-1 caret-red-600"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />

                  <div className="flex items-center justify-end">
                    <Link
                      to={routes.forgotPassword()}
                      className="mt-2 text-xs font-medium text-gray-500 font-OpenSans"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <FieldError name="password" className="mt-2 text-xs font-semibold text-red-600 uppercase" />
                </div>
                <div className="rw-button-group">
                    {isLoading ? (
                      <Submit
                        disabled
                        className="rw-button rw-button-blue animate-pulse"
                      >
                        Loading...
                      </Submit>
                    ) : (
                      <Submit className="w-full py-2 tracking-wider uppercase rounded bg-dark-blue text-off-white font-Roboto">
                        Login
                      </Submit>
                    )}
                  </div>
                </Form>
            </div>
          </div>
          <div className="flex items-center justify-center mt-3 text-xs text-off-white font-OpenSans">
            <span>Don&apos;t have an account?</span>{' '}
            <Link to={routes.signup()} className="ml-1 font-bold underline capitalize">
              Sign up!
            </Link>
          </div>
        </div>
        <footer>
          <p>-</p>
        </footer>
      </main>
    </>
  )
}

export default LoginPage
