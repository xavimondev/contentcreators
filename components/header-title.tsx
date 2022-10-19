type HeaderProps = {
  msg: string
}

const HeaderTitle = ({ msg }: HeaderProps) => {
  return (
    <h1 className='mb-12 text-center text-3xl sm:text-5xl lg:text-6xl bg-clip-text text-transparent from-[#2c3037] to-[#ffffff] bg-gradient-to-r font-semibold'>
      {msg}
    </h1>
  )
}

export default HeaderTitle
