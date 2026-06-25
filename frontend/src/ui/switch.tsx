'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SwitchProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  thumbIcon?: ReactNode
}

export const Switch = ({ className, thumbIcon, ...props }: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full',
        'border border-transparent bg-input p-0.5 outline-none transition-colors',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none flex size-5 items-center justify-center rounded-full',
          'bg-background text-muted-foreground shadow-sm ring-0 transition-transform',
          'data-[state=checked]:translate-x-5 data-[state=checked]:text-primary',
          'data-[state=unchecked]:translate-x-0',
        )}
      >
        {thumbIcon}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}
