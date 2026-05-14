'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { User, Phone, MapPin, Mail, Package, ShieldCheck, Clock, ExternalLink } from 'lucide-react'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      fetchOrders()
    }
  }, [status])

  async function fetchOrders() {
    try {
      const res = await fetch('/api/orders')
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Failed to fetch orders", error)
    } finally {
      setLoadingOrders(false)
    }
  }

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bangla-text">লোড হচ্ছে...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  const user = session?.user

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-28">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar / Info */}
        <div className="w-full lg:w-1/3">
          <div className="glass-card p-10 text-center sticky top-28 border-white/5">
            <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6 border-4 border-primary/20 shadow-xl shadow-primary/10">
              <User size={56} />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">{user?.name}</h2>
            <p className="text-foreground/50 text-sm mb-8 font-medium">{user?.email}</p>
            
            <div className="flex flex-col gap-5 text-left bg-white/5 p-6 rounded-3xl border border-white/5">
              <div className="flex items-center gap-4 text-sm text-foreground/80">
                <div className="p-2 rounded-lg bg-primary/10 text-primary"><Phone size={18} /></div>
                <span className="font-medium">{user?.phone || 'যোগ করা হয়নি'}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-foreground/80">
                <div className="p-2 rounded-lg bg-primary/10 text-primary"><MapPin size={18} /></div>
                <span className="line-clamp-2 font-medium">{user?.address || 'যোগ করা হয়নি'}</span>
              </div>
              {user?.role === 'ADMIN' && (
                <div className="flex items-center gap-4 text-sm text-success font-bold mt-2 pt-4 border-t border-white/5">
                  <ShieldCheck size={20} />
                  <span>অ্যাডমিন অ্যাকাউন্ট</span>
                </div>
              )}
            </div>

            <button className="btn btn-outline w-full justify-center mt-8 bangla-text py-4 rounded-2xl font-bold">প্রোফাইল আপডেট করুন</button>
          </div>
        </div>

        {/* Content / Orders */}
        <div className="w-full lg:w-2/3">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bangla-text flex items-center gap-4 text-white">
              <Package className="text-primary" size={32} />
              আমার অর্ডারসমূহ
            </h2>
            <span className="px-4 py-1 rounded-full bg-white/5 text-xs font-bold text-foreground/40">{orders.length} টি অর্ডার</span>
          </div>

          <div className="flex flex-col gap-6">
            {loadingOrders ? (
              <div className="flex flex-col gap-4">
                {[1, 2].map(i => (
                  <div key={i} className="glass-card p-8 animate-pulse border-white/5 h-48" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="glass-card p-16 text-center text-foreground/20 border-white/5">
                <Package size={64} strokeWidth={1} className="mx-auto mb-4 opacity-20" />
                <p className="bangla-text text-xl font-bold">আপনার এখন পর্যন্ত কোনো অর্ডার নেই।</p>
                <Link href="/products" className="text-primary hover:underline text-sm mt-4 inline-block font-bold">কেনাকাটা শুরু করুন</Link>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="glass-card overflow-hidden border-white/5 hover:border-primary/20 transition-all group">
                  <div className="p-6 bg-white/5 flex flex-wrap justify-between items-center gap-4 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-background/50 border border-white/5">
                        <Clock size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-foreground/40 font-bold uppercase tracking-wider mb-1">অর্ডার আইডি</p>
                        <p className="font-mono text-sm text-white">#{order.id.slice(-8).toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-foreground/40 font-bold uppercase tracking-wider mb-1">অবস্থা</p>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold bangla-text ${
                        order.status === 'DELIVERED' ? 'bg-success/10 text-success' : 
                        order.status === 'PENDING' ? 'bg-accent/10 text-accent' : 
                        'bg-primary/10 text-primary'
                      }`}>
                        {order.status === 'PENDING' ? 'পেন্ডিং' : 
                         order.status === 'DELIVERED' ? 'সফল' : 'প্রসেসিং'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-background border border-white/5 overflow-hidden shrink-0">
                            <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-sm font-bold bangla-text text-white truncate">{item.product.name}</p>
                            <p className="text-xs text-foreground/40 font-medium mt-1">৳{item.price} x {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex flex-col">
                        <p className="text-xs text-foreground/40 font-bold uppercase tracking-wider mb-1">মোট মূল্য</p>
                        <p className="text-2xl font-bold text-primary">৳ {order.total.toLocaleString()}</p>
                      </div>
                      <Link href={`/orders/${order.id}`} className="flex items-center gap-2 text-sm font-bold text-foreground/40 hover:text-white transition-colors group/link">
                        বিস্তারিত <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
