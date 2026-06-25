import type { ReactNode } from 'react'
import { nunitoSans } from '@/config/fonts'
import { ThemeProvider } from '@/providers/theme-provider'
import '@/styles/globals.css'

type RootLayoutProps = Readonly<{
  children: ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" className={nunitoSans.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
          storageKey="vkusno-tut-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
