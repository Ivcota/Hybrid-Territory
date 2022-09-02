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
      <div className="pb-4 mb-2">
        <Link to={routes.myTerritories()}>
          <Button variant="bare">
            <MdArrowBack /> Back
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:gap-12 lg:items-start lg:mt-12">
        <div className="flex flex-col items-center">
          <ViewTerritoryCell id={id} />
        </div>
        <div className="flex flex-col items-center">
          <form
            className="mt-10 lg:mt-0"
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
            <div className="flex flex-col items-start">
              <h3 className="mb-2 font-medium tracking-wider font-Roboto text-dark-blue dark:text-sky-blue-dark">
                Publisher Feedback
              </h3>
              <div className="w-3/4 text-transparent border-t border-htd-grey/50 dark:border-htd-grey-dark lg:mb-4">
                -
              </div>
              <div className="flex flex-col items-end">
                <input
                  autoComplete="off"
                  className={`px-3 py-2 transition-all outline-none w-80 lg:w-72 bg-white dark:bg-light-black-dark ring-1 ring-htd-grey dark:ring-htd-grey-dark rounded focus-within:ring-light-blue/60 focus-within:ring-2 font-OpenSans text-off-black dark:text-off-white-dark caret-dark-blue dark:caret-sky-blue-dark ${
                    errors.comment
                      ? 'focus-within:ring-error dark:focus-within:ring-error-dark caret-error dark:caret-error-dark'
                      : 'focus-within:ring-light-blue/60'
                  }`}
                  placeholder="Comment"
                  type="text"
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
                    <p className="text-error dark:text-error-dark">{errors.comment.message}</p>
                  )}
                  <Button variant="full">Send</Button>
                </div>
              </div>
            </div>
          </form>
          <IssuesCell territoryId={id} />
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default TerritoryPage
