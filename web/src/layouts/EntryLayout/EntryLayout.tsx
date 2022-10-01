import { Link, routes } from '@redwoodjs/router'

type EntryLayoutProps = {
  children?: React.ReactNode
}

const EntryLayout = ({ children }: EntryLayoutProps) => {
  return (
    <>
      <div className="relative flex flex-col items-center justify-start w-full h-max bg-gradient-to-br from-teal-blue to-light-blue">
        <header className="absolute top-0 left-0 flex items-center justify-start w-full h-16 px-4">
          <div className="flex flex-col">
            <Link to={routes.landing()}>
              <h1 className="text-2xl font-Albert text-off-white">
                Hybrid<span className="font-bold">Territory</span>
              </h1>
            </Link>
            <p className="text-xs capitalize text-off-white font-Roboto">
              your territory. simplified.
            </p>
          </div>
        </header>
        {children}
      </div>
    </>
  )
}

export default EntryLayout
