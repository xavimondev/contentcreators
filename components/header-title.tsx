type HeaderProps = {
  msg: string
}

const HeaderTitle = ({ msg }: HeaderProps) => {
  return (
    <h1 className='text-center mb-12 text-4xl bg-clip-text text-transparent from-[#2c3037] to-[#ffffff] bg-gradient-to-r font-semibold'>
      {msg}
    </h1>
  )
}

export default HeaderTitle
