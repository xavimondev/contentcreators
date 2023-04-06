type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return <main className='p-6 min-h-screen h-full w-full'>{children}</main>
}

export default Layout
