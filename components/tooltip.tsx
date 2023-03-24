import { PropsWithChildren } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

type TooltipProps = {
  text: string
}

const Tooltip = ({ text, children }: PropsWithChildren<TooltipProps>) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={0}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={4}
          className='radix-side-top:animate-slide-down-fade 
          radix-side-right:animate-slide-left-fade 
          radix-side-bottom:animate-slide-up-fade 
          radix-side-left:animate-slide-right-fade 
          inline-flex 
          items-center 
          rounded-md 
          px-4 
          py-2.5 
          bg-[#292539]'
        >
          <TooltipPrimitive.Arrow className='fill-current text-[#292539] mr-6' />
          <span className='block text-sm leading-none text-gray-100 max-w-sm'>{text}</span>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
