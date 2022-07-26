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
        <div className="w-1/2">
          <div className="mx-auto md:w-96 sm:w-8/12">
            <div className="">
              <div className='flex items-center justify-center w-full'>
                <h3 className='text-2xl font-medium font-Roboto text-off-white'>Welcome!</h3>
              </div>
              <Form onSubmit={onSubmit} className="flex flex-col items-center justify-between w-full my-8 h-fit">
                <div className='flex flex-col justify-end h-16'>
                <FieldError name="username" className="text-xs font-bold tracking-wide uppercase text-error font-OpenSans" />
                  <TextField
                    name="username"
                    className="w-full border-b rounded-t-sm outline-none bg-off-white/0 border-off-white caret-off-white text-dark-blue placeholder-off-white"
                    errorClassName=""
                    placeholder='Email'
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Email is required',
                      },
                    }}
                  />


                </div>
                <div className='flex flex-col justify-end h-16'>
                  <FieldError name="password" className="text-xs font-bold tracking-wide uppercase text-error font-OpenSans" />
                  <PasswordField
                    name="password"
                    className="w-full border-b rounded-t-sm outline-none bg-off-white/0 border-off-white caret-off-white text-dark-blue placeholder-off-white"
                    errorClassName=""
                    placeholder='Password'
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />




                </div>
                <div className="flex items-center justify-end w-full my-2">
                    <Link
                      to={routes.forgotPassword()}
                      className="text-off-white text-right mt-0.5 text-xs"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="flex items-center justify-center w-full mt-2">
                    {isLoading ? (
                      <Submit
                        disabled
                        className="rw-button rw-button-blue animate-pulse"
                      >
                        Loading...
                      </Submit>
                    ) : (
                      <Submit className="w-full h-10 font-medium tracking-wider capitalize rounded-sm font-Roboto bg-dark-blue text-off-white">
                        LOGIN
                      </Submit>
                    )}
                  </div>
                </Form>

            </div>
          </div>
          <div className="text-xs text-off-white font-OpenSans">
            <span>Don&apos;t have an account?</span>{' '}
            <Link to={routes.signup()} className="font-bold underline capitalize">
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
