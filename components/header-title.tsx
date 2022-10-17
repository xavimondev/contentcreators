type HeaderProps = {
  msg: string
}

const HeaderTitle = ({ msg }: HeaderProps) => {
  return <h1 className='text-center mb-12 text-4xl dark:text-white font-semibold'>{msg}</h1>
}

export default HeaderTitle
