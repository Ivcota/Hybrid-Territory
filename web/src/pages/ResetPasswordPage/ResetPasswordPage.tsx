import { useEffect, useRef, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const ResetPasswordPage = ({ resetToken }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [])

  const passwordRef = useRef<HTMLInputElement>()
  useEffect(() => {
    passwordRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Reset Password" />

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
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">Reset Password</h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              Enter the {' '}
              <a href="#" className="font-medium text-indigo-500 hover:text-indigo-400">
                new password
              </a>{" "}
              to be linked to your account
            </p>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
              <Form onSubmit={onSubmit} className="space-y-6">
                  <div className="text-left">
                  <Label
                      name="password"
                      className="block text-sm font-medium text-gray-700"
                      errorClassName="block text-sm font-medium text-red-600"
                    >
                      New Password
                    </Label>
                    <PasswordField
                      name="password"
                      autoComplete="new-password"
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none caret-blue-700 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      errorClassName="block w-full px-3 py-2 caret-red-500 placeholder-gray-400 border border-rose-300 rounded-md shadow-sm appearance-none focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                      disabled={!enabled}
                      ref={passwordRef}
                      validation={{
                        required: {
                          value: true,
                          message: 'Password is required',
                        },
                      }}
                    />

                    <FieldError name="password" className="block text-sm font-medium text-red-600 capitalize" />
                  </div>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ResetPasswordPage
