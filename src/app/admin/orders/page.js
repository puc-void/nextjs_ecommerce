'use client'

import { useState, useEffect } from 'react'
import { ShoppingBag, Clock, Search, User, MapPin, Phone, Loader2, RefreshCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    try {
      const res = await fetch('/api/orders')
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId)
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
        router.refresh()
      } else {
        alert('অর্ডার আপডেট করতে সমস্যা হয়েছে')
      }
    } catch (err) {
      alert('একটি সমস্যা হয়েছে')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bangla-text text-white">অর্ডার কন্ট্রোল</h1>
          <p className="text-slate-500 bangla-text mt-1 text-lg">আপনার স্টোরের সকল কাস্টমার অর্ডার পরিচালনা করুন</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="p-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-emerald-500 transition-all active:rotate-180 duration-500"
        >
          <RefreshCcw size={20} />
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-emerald-500" size={48} /></div>
        ) : orders.length === 0 ? (
          <div className="glass-card p-20 text-center text-slate-700">
             <ShoppingBag size={80} strokeWidth={1} className="mx-auto mb-6 opacity-20" />
             <p className="text-2xl font-bold bangla-text">এখন পর্যন্ত কোনো অর্ডার নেই</p>
          </div>
        ) : orders.map((order) => (
          <div key={order.id} className="glass-card overflow-hidden border-slate-800 bg-slate-900/30 group hover:border-emerald-500/30 transition-all">
            <div className="p-6 bg-slate-900/50 flex flex-wrap justify-between items-center gap-6 border-b border-slate-800">
              <div className="flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-500">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">অর্ডার আইডি</p>
                  <p className="font-mono text-white text-lg font-bold">#{order.id.slice(-10).toUpperCase()}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-10">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">মোট মূল্য</p>
                  <p className="text-xl font-black text-emerald-500">৳ {order.total.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">তারিখ</p>
                  <p className="text-sm font-bold text-slate-300">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="relative">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">অবস্থা</p>
                  <div className="flex items-center gap-3">
                    <select 
                      disabled={updatingId === order.id}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs font-bold bangla-text focus:border-emerald-500 outline-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="PENDING">পেন্ডিং</option>
                      <option value="PROCESSING">প্রসেসিং</option>
                      <option value="SHIPPED">শিপড</option>
                      <option value="DELIVERED">ডেলিভারড</option>
                      <option value="CANCELLED">বাতিল</option>
                    </select>
                    {updatingId === order.id && <Loader2 size={16} className="animate-spin text-emerald-500" />}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 xl:grid-cols-3 gap-12">
              <div className="flex flex-col gap-6">
                <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest border-l-2 border-emerald-500 pl-4">কাস্টমার তথ্য</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-400">
                    <User size={18} className="text-slate-600" />
                    <span className="font-bold text-white">{order.user?.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <Phone size={18} className="text-slate-600" />
                    <span className="font-medium">{order.phone}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <MapPin size={18} className="text-slate-600" />
                    <span className="text-sm leading-relaxed">{order.address}</span>
                  </div>
                </div>
              </div>

              <div className="xl:col-span-2">
                <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest border-l-2 border-emerald-500 pl-4 mb-6">পণ্যসমূহ</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                        <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-grow">
                        <p className="text-sm font-bold text-slate-200 truncate bangla-text">{item.product.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold">৳{item.price} x {item.quantity}</p>
                      </div>
                      <p className="font-bold text-white text-sm">৳{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
