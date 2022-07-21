import { Link, routes } from '@redwoodjs/router'
import { useContext } from 'react'
import { FiMenu } from 'react-icons/fi'
import { layoutContext } from 'src/layouts/UserLayout/UserLayout'

export const Logo = () => {
  return (
    <div className="text-2xl">
      <Link to={routes.home()}>
        Hybrid<span className="font-bold">Territory</span>
      </Link>
    </div>
  )
}

const Navbar = () => {
  const { isActive, toggle, currentUser } = useContext(layoutContext)

  return (
    <nav className="sticky top-0 py-4 bg-white shadow-lg ">
      <div className="px-4 mx-auto ">
        <div className="flex items-center justify-between gap-5 md:justify-start ">
          <Logo />
          {!isActive && <FiMenu onClick={toggle} size={25} />}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
