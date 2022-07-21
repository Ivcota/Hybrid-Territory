import Navbar from 'src/components/Navbar/Navbar'

type UserLayoutProps = {
  children?: React.ReactNode
}

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <>
      <Navbar />
      <main>
        <div className="max-w-4xl px-4 mx-auto mt-5">{children}</div>
      </main>
    </>
  )
}

export default UserLayout
