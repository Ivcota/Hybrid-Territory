import { NavLink } from '@redwoodjs/router'
import { FiMenu, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useClickOutside } from '@mantine/hooks'

type BaseLayoutProps = {
  children?: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickOutside(() => setIsOpen(false))

  return (
    <>
      <header className="sticky top-0 z-20 bg-white shadow-md">
        <nav className="flex justify-between px-2 py-4 mx-auto md:max-w-4xl">
          <div className="text-2xl">
            Hybrid<span className="font-bold">Territory</span>
          </div>
          <ul className="hidden gap-4 md:flex">
            <li>
              <NavLink to="/" activeClassName="underline text-orange-500 ">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="underline text-orange-500 ">
                About
              </NavLink>
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
      </motion.div>

      <main>
        <div className="max-w-4xl px-2 mx-auto mt-5">{children}</div>
      </main>
    </>
  )
}

export default BaseLayout
