import { useClickOutside } from '@mantine/hooks'
import { CurrentUser, useAuth } from '@redwoodjs/auth'
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
  const { currentUser, logOut } = useAuth()
  const ref = useClickOutside(() => {
    toggle()
  })
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
              ref={ref}
              id="side-bar"
              className="fixed top-0 right-0 z-50 flex min-h-full gap-3 p-3 bg-white shadow-xl md:left-0 md:right-0 w-80 "
            >
              <div className="flex flex-col min-w-full">
                <div className="flex items-center justify-between w-full py-2">
                  <Logo />
                  <FiX onClick={toggle} size={25} />
                </div>
                <div className="flex flex-col items-center gap-4 mt-4 ">
                  <NavLink
                    to={routes.home()}
                    onClick={toggle}
                    activeClassName="text-blue-400"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={routes.myTerritories()}
                    onClick={toggle}
                    activeClassName="text-blue-400"
                  >
                    My Territories
                  </NavLink>
                  <NavLink
                    to={routes.selfCheckout()}
                    onClick={toggle}
                    activeClassName="text-blue-400"
                  >
                    Checkout Territory
                  </NavLink>
                  <NavLink
                    to={routes.userAccount()}
                    onClick={toggle}
                    activeClassName="text-blue-400"
                  >
                    My Account
                  </NavLink>

                  <button
                    className="px-3 py-1 text-white bg-blue-500"
                    onClick={logOut}
                  >
                    Logout
                  </button>

                  {currentUser?.roles === 'admin' && (
                    <>
                      <h3 className="mt-5 text-xl font-bold">Admin</h3>

                      <NavLink
                        to={routes.records()}
                        onClick={toggle}
                        activeClassName="text-blue-400"
                      >
                        Records
                      </NavLink>
                      <NavLink
                        to={routes.assignTerritory()}
                        onClick={toggle}
                        activeClassName="text-blue-400"
                      >
                        Assign Territory
                      </NavLink>
                      <NavLink
                        to={routes.territories()}
                        onClick={toggle}
                        activeClassName="text-blue-400"
                      >
                        Territory Cards
                      </NavLink>
                    </>
                  )}
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
