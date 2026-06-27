import { Nunito_Sans, Pattaya } from 'next/font/google'

export const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito-sans',
  display: 'swap',
})

export const pattaya = Pattaya({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-pattaya',
  display: 'swap',
})
