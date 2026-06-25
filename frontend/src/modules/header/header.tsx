import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/container'
import { ThemeSwitcher } from '@/components/theme-switcher'

type HeaderProps = ComponentProps<'header'>

export const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header className={cn(className)} {...props}>
      <Container>
        <ThemeSwitcher />
      </Container>
    </header>
  )
}
