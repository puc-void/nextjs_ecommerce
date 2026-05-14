'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, User, Menu, X, LogIn, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const { cart } = useCart()

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'হোম', href: '/' },
    { name: 'পণ্য', href: '/products' },
    { name: 'ক্যাটাগরি', href: '/categories' },
    { name: 'আমাদের সম্পর্কে', href: '/about' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border py-3' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent bangla-text">
          ই-শপ বিডি
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary bangla-text ${pathname === link.href ? 'text-primary' : 'text-foreground/80'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart" className="p-2 rounded-full hover:bg-glass transition-colors relative">
            <ShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full text-white">
                {cartItemCount}
              </span>
            )}
          </Link>

          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/profile" className="p-2 rounded-full hover:bg-glass transition-colors">
                <User size={22} />
              </Link>
              {session.user?.role === 'ADMIN' && (
                <Link href="/admin/dashboard" className="btn btn-outline btn-sm bangla-text text-xs">
                  অ্যাডমিন
                </Link>
              )}
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="btn btn-outline btn-sm bangla-text"
              >
                <LogOut size={18} />
                লগআউট
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-outline btn-sm bangla-text">
              <LogIn size={18} />
              লগইন
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium bangla-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-border" />
            <div className="flex items-center justify-between">
              <Link href="/cart" className="flex items-center gap-2 bangla-text" onClick={() => setIsMobileMenuOpen(false)}>
                <ShoppingCart size={20} /> কার্ট ({cartItemCount})
              </Link>
              {session ? (
                <div className="flex items-center gap-2">
                  <Link href="/profile" className="btn btn-outline btn-sm bangla-text" onClick={() => setIsMobileMenuOpen(false)}>
                    প্রোফাইল
                  </Link>
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); signOut({ callbackUrl: '/' }); }}
                    className="btn btn-primary btn-sm bangla-text"
                  >
                    লগআউট
                  </button>
                </div>
              ) : (
                <Link href="/login" className="btn btn-primary btn-sm bangla-text" onClick={() => setIsMobileMenuOpen(false)}>
                  লগইন
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
        .bg-clip-text {
          -webkit-background-clip: text;
        }
      `}</style>
    </nav>
  )
}
