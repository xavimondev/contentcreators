type HeaderProps = {
  msg: string
}

const HeaderTitle = ({ msg }: HeaderProps) => {
  return (
    <h1 className='text-center text-3xl lg:text-5xl bg-clip-text text-transparent dark:text-white font-semibold'>
      {msg}
    </h1>
  )
}

export default HeaderTitle
