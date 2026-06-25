import type { ComponentPropsWithRef } from 'react'
import { cn } from '@/lib/utils'

type ContainerProps = ComponentPropsWithRef<'div'>

export const Container = ({ className, children, ...props }: ContainerProps) => (
  <div className={cn('mx-auto w-full max-w-7xl', className)} {...props}>
    {children}
  </div>
)
