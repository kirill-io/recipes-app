import type { ComponentProps } from 'react'
import { Icon } from '../icon/icon'
import LogoIcon from '@/assets/icons/logo-icon.svg'
import { cn } from '@/lib/utils'

type LogoProps = Omit<ComponentProps<'div'>, 'children'> & {
  withText?: boolean
  iconClassName?: string
  textClassName?: string
}

export const Logo = ({
  className,
  withText,
  iconClassName,
  textClassName,
  ...props
}: LogoProps) => (
  <div className={cn('inline-flex items-center gap-2', className)} {...props}>
    <Icon icon={LogoIcon} className={cn('size-9 text-brand', iconClassName)} />
    {withText && (
      <span
        className={cn(
          'font-logo text-2xl leading-none tracking-wide text-logo-foreground pt-1.5',
          textClassName,
        )}
      >
        ВкусноТут
      </span>
    )}
  </div>
)
