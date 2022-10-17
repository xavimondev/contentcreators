type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className='p-6 h-screen bg-gradient-to-l from-[#39497e] to-[#1d184e] w-full'>
      {children}
    </main>
  )
}

export default Layout
