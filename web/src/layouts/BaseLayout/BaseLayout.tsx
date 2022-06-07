import { Link, NavLink } from '@redwoodjs/router'
import { FiMenu } from 'react-icons/fi'

type BaseLayoutProps = {
  children?: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="py-4 px-4 md:px-8 flex justify-between md:max-w-4xl mx-auto">
          <div className="text-2xl">
            <Link to="/">
              Hybrid<span className="font-bold">Territory</span>
            </Link>
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
          <FiMenu className="md:hidden" size={24} />
        </nav>
      </header>
      <main>
        <div className="max-w-4xl px-4 md:px-8 mx-auto mt-5">{children}</div>
      </main>
    </>
  )
}

export default BaseLayout
