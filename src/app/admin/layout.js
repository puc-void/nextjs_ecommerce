'use client'

import Link from 'next/link'
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ShoppingBag,
  Users, 
  Layers, 
  LogOut, 
  Bell, 
  Settings,
  Menu,
  X,
  Search,
  ChevronRight,
  Shield,
  User as UserIcon
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const sidebarLinks = [
    { name: 'ড্যাশবোর্ড', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'পণ্য পরিচালনা', href: '/admin/products', icon: ShoppingCart },
    { name: 'অর্ডার কন্ট্রোল', href: '/admin/orders', icon: ShoppingBag },
    { name: 'ইউজার ম্যানেজমেন্ট', href: '/admin/users', icon: Users },
    { name: 'ক্যাটাগরি', href: '/admin/categories', icon: Layers },
  ]

  const activeLink = sidebarLinks.find(link => pathname === link.href) || { name: 'অ্যাডমিন প্যানেল' }

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/50 backdrop-blur-2xl border-r border-slate-800 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-900 shadow-lg shadow-emerald-500/20">
              <Shield size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white bangla-text tracking-tight">ই-শপ কন্ট্রোল</h2>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">v2.0 Pro Panel</p>
            </div>
          </div>
          
          <nav className="flex flex-col gap-2 flex-grow">
            {sidebarLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 bangla-text group ${pathname === link.href ? 'bg-emerald-500 text-slate-900 font-bold shadow-xl shadow-emerald-500/20' : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'}`}
              >
                <link.icon size={22} className={pathname === link.href ? 'text-slate-900' : 'group-hover:scale-110 transition-transform'} />
                <span className="text-base">{link.name}</span>
                {pathname === link.href && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-slate-800">
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-4 px-5 py-4 w-full text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-all duration-300 bangla-text font-bold group"
            >
              <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
              <span>লগআউট</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Admin Header */}
        <header className="h-24 bg-slate-900/20 border-b border-slate-800/50 flex items-center justify-between px-10 sticky top-0 z-40 backdrop-blur-md">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-3 rounded-xl bg-slate-800 text-slate-400">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden sm:flex items-center gap-3 text-sm text-slate-500 bangla-text">
              <span>অ্যাডমিন</span>
              <ChevronRight size={14} />
              <span className="text-emerald-500 font-bold">{activeLink.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-2xl px-4 py-2">
              <Search size={18} className="text-slate-500" />
              <input type="text" placeholder="কমান্ড সার্চ..." className="bg-transparent border-none outline-none text-sm text-slate-300 w-48 bangla-text" />
            </div>
            
            <div className="flex items-center gap-4 border-l border-slate-800 pl-6">
              <button className="p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
              </button>
              <div className="flex items-center gap-4 pl-2">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-white">{session?.user?.name || 'Admin'}</p>
                  <p className="text-[10px] text-emerald-500 font-black uppercase tracking-tighter">Verified System Admin</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-inner">
                  <UserIcon size={24} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-10 flex-grow bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.03),transparent)]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

