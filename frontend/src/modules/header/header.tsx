import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/container'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { Logo } from '@/components/logo'
import Link from 'next/link'

type HeaderProps = ComponentProps<'header'>

export const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header className={cn('px-4', className)} {...props}>
      <Container
        className={cn(
          'flex items-center justify-between',
          'border-b border-border bg-background py-4',
        )}
      >
        <Link href="/" className="inline-flex">
          <Logo withText={true} />
        </Link>
        <ThemeSwitcher />
      </Container>
    </header>
  )
}
