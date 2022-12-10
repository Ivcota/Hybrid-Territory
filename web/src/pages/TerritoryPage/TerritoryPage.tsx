import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { MdArrowBack } from 'react-icons/md'
import { CreateIssueVariables } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { useForm } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

import IssuesCell, { MUTATION } from 'src/components/IssuesCell'
import ViewTerritoryCell from 'src/components/ViewTerritoryCell'

import Button from '../../components/Button/Button'

interface PageProps {
  id: string
}

interface IForm {
  comment: string
}

const TerritoryPage = ({ id }: PageProps) => {
  const { currentUser } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>()

  const [createIssue] = useMutation(MUTATION, {
    refetchQueries: ['IssuesQuery'],
  })

  return (
    <>
      <MetaTags title="Territory" description="Territory page" />
      <div>
        <div>
          <nav className="sm:hidden" aria-label="Back">
            <Link
              to={routes.myTerritories()}
              className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <ChevronLeftIcon
                className="flex-shrink-0 w-5 h-5 mr-1 -ml-1 text-gray-400"
                aria-hidden="true"
              />
              Back
            </Link>
          </nav>
          <nav className="hidden sm:flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div className="flex">
                  <Link
                    to={routes.landing()}
                    className="text-sm font-medium text-gray-500 dark:text-gray-200 hover:text-gray-700"
                  >
                    Home
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRightIcon
                    className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-200"
                    aria-hidden="true"
                  />
                  <Link
                    to={routes.myTerritories()}
                    className="ml-4 text-sm font-medium text-gray-500 dark:text-gray-200 hover:text-gray-700"
                  >
                    My Territories
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Territory Card
            </h2>
          </div>
          <div className="flex flex-shrink-0 mt-4 md:mt-0 md:ml-4"></div>
        </div>
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:gap-12 lg:items-start lg:mt-12">
        <div className="flex flex-col items-center">
          <ViewTerritoryCell id={id} />
        </div>

        <div className="w-full px-4 mx-auto max-w-7xl sm:px-24 lg:px-8 ">
          <div className="w-full max-w-3xl mx-auto">
            <form
              onSubmit={handleSubmit(async ({ comment }) => {
                toast.promise(
                  createIssue({
                    variables: {
                      input: {
                        userId: currentUser.id,
                        comment,
                        isClosed: false,
                        territoryId: id,
                      },
                    } as CreateIssueVariables,
                  }),
                  {
                    loading: 'Loading...',
                    error: 'Error',
                    success: 'Comment Issue Created',
                  }
                )

                reset()
              })}
            >
              <div className="flex flex-col items-start w-full">
                <h3 className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-center">
                  Publisher Feedback
                </h3>
                <div className="w-3/4 text-transparent border-t border-htd-grey/50 dark:border-htd-grey-dark ">
                  -
                </div>

                <div className="w-full ">
                  <div className="mt-1">
                    <textarea
                      rows={4}
                      name="comment"
                      id="comment"
                      placeholder="Comment"
                      className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      defaultValue={''}
                      {...register('comment', {
                        required: 'Comment cannot be empty',
                      })}
                    />
                    <div
                      className={`flex ${
                        errors.comment ? 'justify-between' : 'justify-end'
                      } w-full my-2`}
                    >
                      {errors.comment && (
                        <p className="text-error dark:text-error-dark">
                          {errors.comment.message}
                        </p>
                      )}
                      <button className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm sm:justify-center sm:w-28 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <IssuesCell territoryId={id} />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default TerritoryPage
