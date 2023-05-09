import React from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header/Header'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
