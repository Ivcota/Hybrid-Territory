import { NavLink } from '@redwoodjs/router'
import { FiMenu } from 'react-icons/fi'

type BaseLayoutProps = {
  children?: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="py-4 flex justify-between px-2 md:max-w-4xl mx-auto">
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
          <FiMenu className="md:hidden" size={24} />
        </nav>
      </header>
      <main>
        <div className="max-w-4xl px-2 mx-auto mt-5">{children}</div>
      </main>
    </>
  )
}

export default BaseLayout
