import { useEffect, useRef, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    const response = await forgotPassword(
      (data.email as string).toLowerCase()
    )
    setLoading(true)

    if (response.error) {
      toast.error(response.error)
      setLoading(false)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success('A password reset email will be delivered to you shortly.')
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />

      <main className="mx-auto font-Albert">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="mb-4 text-3xl font-black text-center text-blue-500 font-NotoSans">HT</div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 text-sm bg-white text-gray-500/75 font-Roboto">Hybrid Territory</span>
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">Forgot your password?</h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Enter the {' '}
              <a href="#" className="font-medium text-indigo-500 hover:text-indigo-400">
                email address
              </a>{" "}
              associated with your account
            </p>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
              <Form onSubmit={onSubmit} className="space-y-6">
                  <div className="text-left">
                    <Label
                      name="email"
                      className="block text-sm font-medium text-gray-700"
                      errorClassName="block text-sm font-medium text-red-600"
                    >
                      Email Address
                    </Label>
                    <TextField
                      name="email"
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none caret-blue-700 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      errorClassName="block w-full px-3 py-2 caret-red-500 placeholder-gray-400 border border-rose-300 rounded-md shadow-sm appearance-none focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                      ref={usernameRef}
                      validation={{
                        required: true,
                      }}
                    />
                    <FieldError name="email" className="block text-sm font-medium text-red-600 capitalize" />
                  </div>
                  {loading ? (
                    <Submit
                      disabled
                      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 animate-pulse"
                    >
                      Loading...
                    </Submit>
                  ) : (
                    <Submit className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Submit
                    </Submit>
                  )}
              </Form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
