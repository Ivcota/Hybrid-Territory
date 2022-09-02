import { useContext } from 'react'

import { FiMenu } from 'react-icons/fi'

import { Link, routes } from '@redwoodjs/router'

import { layoutContext } from 'src/layouts/UserLayout/UserLayout'

import ThemeToggle from '../ThemeToggle/ThemeToggle'

export const Logo = () => {
  return (
    <div className="text-2xl">
      <Link to={routes.home()}>
        <h1 className="text-2xl font-Albert text-off-black dark:text-off-white-dark">
          Hybrid<span className="font-bold">Territory</span>
        </h1>
      </Link>
    </div>
  )
}

const Navbar = () => {
  const { isActive, toggle } = useContext(layoutContext)

  return (
    <nav className="sticky top-0 py-4 duration-300 bg-white shadow-lg dark:bg-light-black-dark">
      <div className="px-4 mx-auto lg:px-8">
        <div className="flex items-center justify-between gap-5 ">
          <Logo />
          <div className="flex items-center justify-center gap-3 text-off-black dark:text-off-white-dark">
            <ThemeToggle />
            <FiMenu onClick={toggle} size={25} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
