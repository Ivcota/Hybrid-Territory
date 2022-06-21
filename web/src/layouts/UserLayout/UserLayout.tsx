import { useClickOutside } from '@mantine/hooks'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes, NavLink, navigate } from '@redwoodjs/router'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

type UserLayoutProps = {
  children?: React.ReactNode
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside(() => setIsOpen(false))
  const { isAuthenticated, logOut, loading, currentUser } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  return (
    <>
      <>
        <header className="sticky top-0 z-20 bg-white shadow-md">
          <nav className="flex justify-between px-2 py-4 mx-auto md:max-w-4xl">
            <div className="text-2xl">
              <Link to={routes.home()}>
                Hybrid<span className="font-bold">Territory</span>
              </Link>
            </div>
            <ul className="hidden gap-4 md:flex">
              <li>
                <NavLink
                  to={routes.myTerritories()}
                  activeClassName="underline text-orange-500 "
                >
                  My Territories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={routes.userAccount()}
                  activeClassName="underline text-orange-500 "
                >
                  My Account
                </NavLink>
              </li>

              {currentUser?.roles === 'admin' && (
                <li>
                  <NavLink
                    to={routes.territories()}
                    activeClassName="underline text-orange-500 "
                  >
                    Admin Territories
                  </NavLink>
                </li>
              )}

              {currentUser?.roles === 'admin' && (
                <li>
                  <NavLink
                    to={routes.assignTerritory()}
                    activeClassName="underline text-orange-500 "
                  >
                    Assign Territory
                  </NavLink>
                </li>
              )}

              <li>
                <button
                  onClick={() => {
                    logOut()
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
            <FiMenu
              onClick={() => {
                setIsOpen(true)
              }}
              className="md:hidden"
              size={24}
            />
          </nav>
        </header>

        <motion.div
          ref={ref}
          initial={{
            x: 400,
          }}
          variants={{
            open: {
              x: 0,
            },
            closed: {
              x: 400,
            },
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          animate={isOpen ? 'open' : 'closed'}
          className="fixed z-20 min-h-screen shadow-lg top-0 right-0 bg-white w-[18rem]"
        >
          <FiX
            className="absolute top-3 right-3"
            size={20}
            onClick={() => {
              setIsOpen(false)
            }}
          />

          <ul
            onClick={() => {
              setIsOpen(false)
            }}
            className="flex flex-col items-center min-h-screen gap-4 pt-10"
          >
            <li>
              <NavLink
                to={routes.myTerritories()}
                activeClassName="underline text-orange-500 "
              >
                My Territories
              </NavLink>
            </li>
            <li>
              <NavLink
                to={routes.userAccount()}
                activeClassName="underline text-orange-500 "
              >
                My Account
              </NavLink>
            </li>
            {currentUser?.roles === 'admin' && (
              <li>
                <NavLink
                  to={routes.territories()}
                  activeClassName="underline text-orange-500 "
                >
                  Admin Territories
                </NavLink>
              </li>
            )}

            {currentUser?.roles === 'admin' && (
              <li>
                <NavLink
                  to={routes.assignTerritory()}
                  activeClassName="underline text-orange-500 "
                >
                  Assign Territory
                </NavLink>
              </li>
            )}
            <li>
              <button
                onClick={() => {
                  logOut()
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </motion.div>

        <main>
          <div className="max-w-4xl px-4 mx-auto mt-5">{children}</div>
        </main>
      </>
    </>
  )
}

export default UserLayout
