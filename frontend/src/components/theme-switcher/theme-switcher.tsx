'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { useIsClient } from '@/hooks/use-is-client'
import { cn } from '@/lib/utils'
import { Switch } from '@/ui/switch'

type ThemeSwitcherProps = {
  className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const isClient = useIsClient()

  useEffect(() => {
    if (!isClient) {
      return
    }

    if (theme !== 'system') {
      return
    }

    if (resolvedTheme !== 'light' && resolvedTheme !== 'dark') {
      return
    }

    setTheme(resolvedTheme)
  }, [isClient, resolvedTheme, setTheme, theme])

  if (!isClient) {
    return <div className={cn('inline-flex h-6 w-12 shrink-0', className)} />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Switch
      checked={isDark}
      className={cn(
        'w-12 border-brand/30 bg-brand-soft/80 shadow-sm',
        'hover:border-brand/45 hover:bg-brand-soft',
        'data-[state=checked]:border-brand/35',
        'data-[state=checked]:bg-surface-2',
        '[&>span]:bg-primary',
        '[&>span]:text-primary-foreground',
        '[&>span]:shadow-md',
        '[&>span[data-state=checked]]:translate-x-5.5',
        '[&>span[data-state=checked]]:text-primary-foreground',
        className,
      )}
      onCheckedChange={(checked) => {
        setTheme(checked ? 'dark' : 'light')
      }}
      thumbIcon={isDark ? <Moon className="size-3" /> : <Sun className="size-3" />}
    />
  )
}
