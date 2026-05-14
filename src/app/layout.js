import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import { Inter, Hind_Siliguri } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-bangla',
  display: 'swap',
})

export const metadata = {
  title: 'ই-শপ বিডি | প্রিমিয়াম ই-কমার্স প্ল্যাটফর্ম',
  description: 'সেরা মানের পণ্য এবং দ্রুত ডেলিভারি নিশ্চিত করতে আমরা কাজ করছি।',
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body className="bangla min-h-screen bg-background text-foreground antialiased font-inter">
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}

import LayoutWrapper from '@/components/LayoutWrapper'
