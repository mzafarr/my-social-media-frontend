"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Social Media',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <html lang="en">
      <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
