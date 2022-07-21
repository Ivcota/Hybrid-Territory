import { Link, routes } from '@redwoodjs/router'
import { useContext } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { layoutContext } from 'src/layouts/UserLayout/UserLayout'

const Logo = () => {
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
      <div className="max-w-4xl px-3 mx-auto ">
        <div className="flex items-center gap-5">
          <Logo />
          {!isActive ? (
            <FiMenu onClick={toggle} size={25} />
          ) : (
            <FiX onClick={toggle} size={25} />
          )}
        </div>
        {isActive && <div className="mt-5">{currentUser.firstName}</div>}
      </div>
    </nav>
  )
}

export default Navbar
