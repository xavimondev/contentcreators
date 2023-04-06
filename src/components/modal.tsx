'use client'
import { PropsWithChildren } from 'react'
import { useStore } from 'state/store'

const Modal = ({ children }: PropsWithChildren) => {
  const setIsModalStoryOpen = useStore((state) => state.setIsModalStoryOpen)
  return (
    <>
      <div
        className='fixed block z-40 w-screen h-screen inset-0 backdrop-blur bg-opacity-30'
        onClick={() => setIsModalStoryOpen(false)}
      ></div>
      <div className='block fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-96 rounded-md sm:py-6 space-y-5 bg-transparent h-screen'>
        {children}
      </div>
    </>
  )
}

export default Modal
