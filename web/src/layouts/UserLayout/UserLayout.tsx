import { useAuth, CurrentUser } from '@redwoodjs/auth'
import { NavLink, routes } from '@redwoodjs/router'
import { createContext } from 'react'
import { FiX } from 'react-icons/fi'
import Navbar, { Logo } from 'src/components/Navbar/Navbar'
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
          {isActive && (
            <div
              id="side-bar"
              className="fixed top-0 right-0 flex min-h-full gap-3 p-3 bg-white shadow-xl md:left-0 md:right-0 w-80 "
            >
              <div className="flex flex-col min-w-full">
                <div className="flex items-center justify-between w-full py-2">
                  <Logo />
                  <FiX onClick={toggle} size={25} />
                </div>
                <div className="flex flex-col items-center gap-1 mt-4 ">
                  <NavLink to={routes.home()} activeClassName="text-blue-400">
                    Home
                  </NavLink>
                  <NavLink to={routes.about()} activeClassName="text-blue-400">
                    About
                  </NavLink>
                </div>
              </div>
            </div>
          )}
          <div className="max-w-4xl px-4 mx-auto mt-5">{children}</div>
        </main>
      </Provider>
    </>
  )
}

export default UserLayout
