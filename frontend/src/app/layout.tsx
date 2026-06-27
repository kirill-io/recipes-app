import type { ReactNode } from 'react'
import { nunitoSans, pattaya } from '@/config/fonts'
import { ThemeProvider } from '@/providers/theme-provider'
import '@/styles/globals.css'
import { Header } from '@/modules/header/header'

type RootLayoutProps = Readonly<{
  children: ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="ru"
      className={`${nunitoSans.variable} ${pattaya.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
          storageKey="vkusno-tut-theme"
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
