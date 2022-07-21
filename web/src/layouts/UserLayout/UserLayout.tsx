import { useAuth, CurrentUser } from '@redwoodjs/auth'
import { NavLink, routes } from '@redwoodjs/router'
import { createContext } from 'react'
import Navbar from 'src/components/Navbar/Navbar'
import { useToggle } from 'src/hooks/useToggle'

interface LayoutContext {
  isActive: boolean
  toggle: () => void
  currentUser?: CurrentUser
}

export const layoutContext = createContext<LayoutContext | null>(null)

type UserLayoutProps = {
  children?: React.ReactNode
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const { currentUser } = useAuth()
  const { isActive, toggle } = useToggle({ defaultActive: false })
  const { Provider } = layoutContext

  return (
    <>
      <Provider
        value={{
          currentUser,
          isActive,
          toggle,
        }}
      >
        <Navbar />

        <main>
          <div id="side-bar" className="sticky top-0 left-0 p-3 bg-red-300 ">
            <NavLink to={routes.home()} activeClassName="text-blue-400">
              Home
            </NavLink>
            <NavLink to={routes.home()} activeClassName="text-blue-400">
              Home
            </NavLink>
          </div>
          <div className="max-w-4xl px-4 mx-auto mt-5">{children}</div>
        </main>
      </Provider>
    </>
  )
}

export default UserLayout
