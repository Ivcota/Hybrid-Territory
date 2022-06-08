import { Link, NavLink, routes } from '@redwoodjs/router'
import { FiMenu, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useClickOutside } from '@mantine/hooks'

type BaseLayoutProps = {
  children?: React.ReactNode
}

interface NavItem {
  title: string
  route: any
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside(() => setIsOpen(false))

  const navLinks: NavItem[] = [
    {
      title: 'Home',
      route: routes.home(),
    },
    {
      title: 'About',
      route: routes.about(),
    },
    {
      title: 'Login',
      route: routes.login(),
    },
  ]

  return (
    <>
      <header className="sticky top-0 z-20 bg-white shadow-md">
        <nav className="flex justify-between px-2 py-4 mx-auto md:max-w-4xl">
          <div className="text-2xl">
            <Link to={routes.home()}>
              Hybrid<span className="font-bold">Territory</span>
            </Link>
          </div>
          <ul className="hidden gap-4 md:flex">
            {navLinks.map(({ title, route }, i) => {
              return (
                <li key={i}>
                  <NavLink
                    to={route}
                    activeClassName="underline text-orange-500 "
                  >
                    {title}
                  </NavLink>
                </li>
              )
            })}
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
          {navLinks.map(({ title, route }, i) => {
            return (
              <li key={i}>
                <NavLink
                  to={route}
                  activeClassName="underline text-orange-500 "
                >
                  {title}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </motion.div>

      <main>
        <div className="max-w-4xl px-2 mx-auto mt-5">{children}</div>
      </main>
    </>
  )
}

export default BaseLayout
