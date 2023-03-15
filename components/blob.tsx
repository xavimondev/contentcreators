const Blob = () => {
  return (
    <div className='absolute w-1/2 h-72 top-3/4 left-1/4 right-1/4 opacity-50 filter blur-[100px] z-0 animate-spin-slow'>
      <div className='relative'>
        <div className='rounded-full h-64 w-full bg-[#ff8b42]'></div>
        <div className='absolute top-32 left-24 rounded-full h-64 w-full bg-purple-600'></div>
      </div>
    </div>
  )
}

export default Blob
