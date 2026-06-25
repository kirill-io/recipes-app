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
    return <div className={cn('inline-flex h-6 w-11 shrink-0', className)} />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <Switch
      checked={isDark}
      className={cn('bg-brand-soft data-[state=checked]:bg-primary', className)}
      onCheckedChange={(checked) => {
        setTheme(checked ? 'dark' : 'light')
      }}
      thumbIcon={isDark ? <Moon className="size-3" /> : <Sun className="size-3" />}
    />
  )
}
