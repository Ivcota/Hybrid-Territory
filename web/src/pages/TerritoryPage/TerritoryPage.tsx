import { useAuth } from '@redwoodjs/auth'
import { useForm } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import IssuesCell, { MUTATION } from 'src/components/IssuesCell'
import ViewTerritoryCell from 'src/components/ViewTerritoryCell'
import { CreateIssueVariables } from 'types/graphql'

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
      <Link to={routes.myTerritories()}>
        <button className="px-3 py-1 mb-5 text-white bg-red-500 rounded-sm hover:bg-red-400 ">
          Back
        </button>
      </Link>
      <div className="flex flex-col items-center">
        <ViewTerritoryCell id={id} />
        <form
          className="mt-10"
          onSubmit={handleSubmit(async ({ comment }) => {
            toast.promise(
              createIssue({
                variables: {
                  input: {
                    userId: currentUser.id,
                    comment,
                    isClosed: true,
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
          <div className="flex flex-col items-center ">
            <input
              autoComplete="off"
              className="px-3 py-2 transition-all outline-none w-80 bg-slate-50 ring-1 ring-black/25 focus-within:ring-blue-400 focus-within:ring-2 "
              placeholder="Comment"
              type="text"
              {...register('comment', { required: 'Comment cannot be empty' })}
            />
            {errors.comment && (
              <p className="mt-1 text-red-500">{errors.comment.message}</p>
            )}
            <button className="px-5 py-2 mt-3 text-white bg-blue-500 ">
              Comment
            </button>
          </div>
        </form>
        <IssuesCell territoryId={id} />
      </div>
      <Toaster />
    </>
  )
}

export default TerritoryPage
