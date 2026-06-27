import type { ComponentProps, ComponentType, SVGProps } from 'react'
import { cn } from '@/lib/utils'

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>

type IconProps = Omit<ComponentProps<'span'>, 'children'> & {
  icon: SvgComponent
}

export const Icon = ({ icon: SvgIcon, className, ...props }: IconProps) => {
  return (
    <span className={cn('inline-flex size-5 shrink-0 text-current', className)} {...props}>
      <SvgIcon className="size-full" />
    </span>
  )
}
