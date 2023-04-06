import { SVGProps } from 'react'

const LoaderAnimation = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      id='L9'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
      enableBackground='new 0 0 0 0'
    >
      <path
        fill='#fff'
        d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50'
      >
        <animateTransform
          attributeName='transform'
          attributeType='XML'
          type='rotate'
          dur='1s'
          from='0 50 50'
          to='360 50 50'
          repeatCount='indefinite'
        />
      </path>
    </svg>
  )
}

type FallBackLoaderProps = {
  msg: string
}

const FallBackLoader = ({ msg }: FallBackLoaderProps) => {
  return (
    <div className='flex flex-col gap-2 justify-center items-center mt-20'>
      <span className='font-bold text-white'>{msg}</span>
      <LoaderAnimation className='h-10 w-10' />
    </div>
  )
}

export default FallBackLoader
