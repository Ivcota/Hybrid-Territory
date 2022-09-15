import { Link, navigate, routes } from '@redwoodjs/router'
import { useRef, useState } from 'react'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useEffect } from 'react'

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

      <main className="flex flex-col items-center justify-between w-full h-max lg:h-screen bg-gradient-to-br from-teal-blue to-light-blue">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <header className='flex items-center justify-start w-full h-16 px-4'>
          <div className='flex flex-col'>
            <Link to={routes.landing()}>
              <h1 className='text-2xl font-Albert text-off-white'>Hybrid<span className='font-bold'>Territory</span></h1>
            </Link>
            <p className='text-xs capitalize text-off-white font-Roboto'>your territory. simplified.</p>
          </div>
        </header>
        <div className="w-2/3 max-w-sm">
          <div className="mx-auto md:w-96 sm:w-8/12">
            <header className="flex items-center justify-center w-full">
              <h2 className="my-8 text-2xl font-medium lg:mt-4 font-Roboto text-off-white">Create An Account!</h2>
            </header>

            <div className="p-4 rounded bg-off-white">
              <Form onSubmit={onSubmit} className="flex flex-col justify-between">
                <div className='h-24'>
                  <Label
                    name="username"
                    className="mt-0 text-sm font-bold text-dark-blue font-OpenSans"
                    errorClassName="text-sm font-bold text-error font-OpenSans mt-0"
                  >
                    Email
                  </Label>
                  <TextField
                    name="username"
                    className="mt-1 text-sm rw-input caret-dark-blue font-Roboto text-off-black"
                    errorClassName="rw-input border-error mt-1 caret-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Email is required',
                      },
                    }}
                  />
                  <FieldError name="username" className="mt-2 text-xs font-semibold uppercase text-error" />
                </div>
                <div className='h-24'>
                  <Label
                    name="firstName"
                    className="mt-0 text-sm font-bold text-dark-blue font-OpenSans"
                    errorClassName="text-sm font-bold text-error font-OpenSans mt-0"
                  >
                    First Name
                  </Label>
                  <TextField
                    name="firstName"
                    className="mt-1 text-sm rw-input caret-dark-blue font-Roboto text-off-black"
                    errorClassName="rw-input border-error mt-1 caret-error"
                    validation={{
                      required: {
                        value: true,
                        message: 'First Name is required',
                      },
                    }}
                  />
                  <FieldError name="firstName" className="mt-2 text-xs font-semibold uppercase text-error" />
                </div>
                <div className='h-24'>
                  <Label
                    name="lastName"
                    className="mt-0 text-sm font-bold text-dark-blue font-OpenSans"
                    errorClassName="text-sm font-bold text-error font-OpenSans mt-0"
                  >
                    Last Name
                  </Label>
                  <TextField
                    name="lastName"
                    className="mt-1 text-sm rw-input caret-dark-blue font-Roboto text-off-black"
                    errorClassName="rw-input border-error mt-1 caret-error"
                    validation={{
                      required: {
                        value: true,
                        message: 'Last Name is required',
                      },
                    }}
                  />
                  <FieldError name="lastName" className="mt-2 text-xs font-semibold uppercase text-error" />
                </div>
                <div className='h-24'>
                  <Label
                    name="phone"
                    className="mt-0 text-sm font-bold text-dark-blue font-OpenSans"
                    errorClassName="text-sm font-bold text-error font-OpenSans mt-0"
                  >
                    Phone
                  </Label>
                  <TextField
                    name="phone"
                    className="mt-1 text-sm rw-input caret-dark-blue font-Roboto text-off-black"
                    errorClassName="rw-input border-error mt-1 caret-error"
                    validation={{
                      required: {
                        value: true,
                        message: 'Phone is required',
                      },
                    }}
                  />
                  <FieldError name="phone" className="mt-2 text-xs font-semibold uppercase text-error" />
                </div>
                <div className='h-24'>
                  <Label
                    name="password"
                    className="mt-0 text-sm font-bold text-dark-blue font-OpenSans"
                    errorClassName="text-sm font-bold text-error font-OpenSans mt-0"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="mt-1 text-sm rw-input caret-dark-blue font-Roboto text-off-black"
                    errorClassName="rw-input border-error mt-1 caret-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                  />
                  <FieldError name="password" className="mt-2 text-xs font-semibold uppercase text-error" />
                </div>
                  <div className="rw-button-group">
                    {loading ? (
                      <Submit
                        disabled
                        className="w-full py-2 tracking-wider uppercase rounded bg-dark-blue text-off-white font-Roboto animate-pulse"
                      >
                        Loading...
                      </Submit>
                    ) : (
                      <Submit className="w-full py-2 tracking-wider uppercase rounded bg-dark-blue text-off-white font-Roboto hover:bg-accent">
                        Sign Up
                      </Submit>
                    )}
                  </div>
                </Form>
            </div>
          </div>
          <div className="flex items-center justify-center my-3 text-xs text-off-white font-OpenSans">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="ml-1 font-bold underline capitalize">
              Log in!
            </Link>
          </div>
        </div>
        <footer>
          <p className='text-transparent'>-</p>
        </footer>
      </main>
    </>
  )
}

export default SignupPage
