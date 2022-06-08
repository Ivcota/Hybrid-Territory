import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type TerritoryLayoutProps = {
  children: React.ReactNode
}

const TerritoriesLayout = ({ children }: TerritoryLayoutProps) => {
  const { currentUser } = useAuth()

  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.territories()} className="rw-link">
            Territories
          </Link>
        </h1>
        <p> {currentUser?.id}</p>
        <Link to={routes.newTerritory()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Territory
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default TerritoriesLayout
