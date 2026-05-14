'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith('/admin')

  return (
    <>
      {!isAdminPage && <Navbar />}
      <main className={!isAdminPage ? "pt-20" : ""}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </>
  )
}
