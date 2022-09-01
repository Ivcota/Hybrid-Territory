import { Transition } from '@headlessui/react'
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
          <Transition
            show={isActive}
            ref={ref}
            id="side-bar"
            className="fixed top-0 right-0 z-50 flex justify-end w-full min-h-full bg-black/40 backdrop-blur-sm"
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-450"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className='gap-3 p-4 bg-white shadow-xl md:left-0 md:right-0 w-60 lg:w-72'>
            <div className="flex flex-col h-full min-w-full">
              <div className="flex items-center justify-end w-full py-2">
                <FiX onClick={toggle} size={25} />
              </div>
                <div className="flex flex-col items-start justify-between h-full">
                  <div className="flex flex-col items-start justify-center w-full gap-4 mt-4 text-htd-grey">
                    <NavLink
                      className='text-base font-medium font-OpenSans hover:text-blue-300'
                      to={routes.home()}
                      onClick={toggle}
                      activeClassName="text-sky-blue"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      className='text-base font-medium font-OpenSans hover:text-blue-300'
                      to={routes.myTerritories()}
                      onClick={toggle}
                      activeClassName="text-sky-blue"
                    >
                      My Territories
                    </NavLink>
                    <NavLink
                      className='text-base font-medium font-OpenSans hover:text-blue-300'
                      to={routes.selfCheckout()}
                      onClick={toggle}
                      activeClassName="text-sky-blue"
                    >
                      Checkout Territory
                    </NavLink>
                    <NavLink
                      className='text-base font-medium font-OpenSans hover:text-blue-300'
                      to={routes.userAccount()}
                      onClick={toggle}
                      activeClassName="text-sky-blue"
                    >
                      My Account
                    </NavLink>
                    {currentUser?.roles === 'admin' && (
                        <>
                          <div className='w-full border-b-2 border-dark-blue'>
                            <h3 className="mt-5 text-xl font-semibold tracking-wide font-Roboto text-off-black">Admin Settings</h3>
                          </div>
                        <NavLink
                          className='text-base font-medium font-OpenSans hover:text-violet-300'
                          to={routes.issueTracker()}
                          onClick={toggle}
                          activeClassName="text-violet-500"
                        >
                          Issue Tracker
                        </NavLink>
                        <NavLink
                          className='text-base font-medium font-OpenSans hover:text-violet-300'
                          to={routes.records()}
                          onClick={toggle}
                          activeClassName="text-violet-500"
                        >
                          Records
                        </NavLink>
                        <NavLink
                          className='text-base font-medium font-OpenSans hover:text-violet-300'
                          to={routes.assignTerritory()}
                          onClick={toggle}
                          activeClassName="text-violet-500"
                        >
                          Assign Territory
                        </NavLink>
                        <NavLink
                          className='text-base font-medium font-OpenSans hover:text-violet-300'
                          to={routes.territories()}
                          onClick={toggle}
                          activeClassName="text-violet-500"
                        >
                          Territory Cards
                        </NavLink>
                      </>
                    )}
                  </div>
                  <button
                    className="w-full px-3 py-2 tracking-wider uppercase rounded text-off-white text-md bg-accent font-Roboto hover:bg-accent/80"
                    onClick={logOut}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </Transition>
          <div className="max-w-4xl px-4 pt-5 mx-auto bg-white dark:bg-off-black">{children}</div>
        </main>
      </Provider>
    </>
  )
}

export default UserLayout
