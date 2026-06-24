import { nunitoSans } from '@/config/fonts'
import '@/styles/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={nunitoSans.variable}>
      <body>{children}</body>
    </html>
  )
}
