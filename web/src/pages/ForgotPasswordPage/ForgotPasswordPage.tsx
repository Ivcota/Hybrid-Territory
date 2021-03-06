import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'

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
      (data.username as string).toLowerCase()
    )
    setLoading(true)

    if (response.error) {
      toast.error(response.error)
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

      <main className="mx-auto rw-main w-80">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Forgot Password
              </h2>
            </header>

            <div className="rw-segment-main ">
              <div className="rw-form-wrapper ">
                <Form onSubmit={onSubmit} className="rw-form-wrapper ">
                  <div className="text-left">
                    <Label
                      name="username"
                      className="rw-label"
                      errorClassName="rw-label rw-label-error"
                    >
                      Email
                    </Label>
                    <TextField
                      name="username"
                      className="rw-input"
                      errorClassName="rw-input rw-input-error"
                      ref={usernameRef}
                      validation={{
                        required: true,
                      }}
                    />

                    <FieldError name="username" className="rw-field-error" />
                  </div>

                  <div className="rw-button-group">
                    {loading ? (
                      <Submit
                        disabled
                        className="rw-button rw-button-blue animate-pulse"
                      >
                        Loading...
                      </Submit>
                    ) : (
                      <Submit className="rw-button rw-button-blue">
                        Submit
                      </Submit>
                    )}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
