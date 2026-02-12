import type { Metadata, Viewport } from 'next'
import { Dancing_Script, Poppins } from 'next/font/google'

import './globals.css'

const _poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

const _dancing = Dancing_Script({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing'
})

export const metadata: Metadata = {
  title: 'Happy Birthday! - A Special Surprise',
  description: 'A magical birthday surprise with 3D animations, memories, and love.',
}

export const viewport: Viewport = {
  themeColor: '#1a0a10',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_poppins.variable} ${_dancing.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
