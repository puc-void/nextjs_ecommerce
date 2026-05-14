'use client'

import { useCart } from '@/context/CartContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, CreditCard, Truck, Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'cod',
  })

  const shippingCharge = 60
  const grandTotal = total + shippingCharge

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bangla-text pt-28">লোড হচ্ছে...</div>
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 pt-28">
        <h2 className="text-2xl font-bold bangla-text text-foreground/60">কার্ট খালি!</h2>
        <Link href="/products" className="btn btn-primary bangla-text px-8">কেনাকাটা করুন</Link>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 pt-28">
        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center text-success animate-bounce">
          <ShieldCheck size={48} />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold bangla-text text-gradient">অর্ডার সফল হয়েছে!</h2>
        <p className="text-foreground/60 bangla-text text-center max-w-md text-lg">
          আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। শীঘ্রই আমরা আপনার সাথে যোগাযোগ করবো।
        </p>
        <Link href="/profile" className="btn btn-primary bangla-text px-10 py-4 rounded-2xl shadow-lg shadow-primary/30">অর্ডারের অবস্থা দেখুন</Link>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          total: grandTotal,
          address: formData.address || session.user.address,
          phone: formData.phone || session.user.phone,
        })
      })

      if (res.ok) {
        setOrderPlaced(true)
        clearCart()
      } else {
        alert('অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।')
      }
    } catch (error) {
      alert('একটি সমস্যা হয়েছে।')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-28">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 bangla-text text-center text-gradient">চেকআউট সম্পন্ন করুন</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Info */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-card p-8 border-white/5">
            <h2 className="text-2xl font-bold mb-8 bangla-text flex items-center gap-3">
              <Truck className="text-primary" size={28} />
              শিপিং এবং ডেলিভারি তথ্য
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium bangla-text ml-1 text-foreground/60">নাম</label>
                <input
                  type="text"
                  required
                  placeholder="আপনার পূর্ণ নাম"
                  className="p-4 rounded-2xl bg-background/50 border border-white/10 focus:border-primary/50 outline-none transition-all bangla-text"
                  defaultValue={session?.user?.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium bangla-text ml-1 text-foreground/60">ফোন নাম্বার</label>
                <input
                  type="tel"
                  required
                  placeholder="০১৭XXXXXXXX"
                  className="p-4 rounded-2xl bg-background/50 border border-white/10 focus:border-primary/50 outline-none transition-all bangla-text"
                  defaultValue={session?.user?.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium bangla-text ml-1 text-foreground/60">সম্পূর্ণ ঠিকানা</label>
                <textarea
                  required
                  placeholder="আপনার পূর্ণ ঠিকানা (বাসা নং, রোড, এলাকা, শহর)"
                  rows={3}
                  className="p-4 rounded-2xl bg-background/50 border border-white/10 focus:border-primary/50 outline-none transition-all bangla-text resize-none"
                  defaultValue={session?.user?.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-8 border-white/5">
            <h2 className="text-2xl font-bold mb-8 bangla-text flex items-center gap-3">
              <CreditCard className="text-primary" size={28} />
              পেমেন্ট মেথড সিলেক্ট করুন
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['cod', 'bkash', 'nagad'].map((method) => (
                <label key={method} className={`glass-card p-6 flex flex-col items-center gap-3 cursor-pointer transition-all border-2 ${
                  formData.paymentMethod === method ? 'border-primary bg-primary/5' : 'border-white/5 hover:border-white/20'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="hidden"
                  />
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentMethod === method ? 'border-primary' : 'border-white/20'}`}>
                    {formData.paymentMethod === method && <div className="w-3 h-3 rounded-full bg-primary" />}
                  </div>
                  <span className="font-bold bangla-text uppercase text-sm">
                    {method === 'cod' ? 'ক্যাশ অন ডেলিভারি' : method}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card p-8 sticky top-28 border-white/5 shadow-2xl shadow-black/50">
            <h2 className="text-2xl font-bold mb-8 bangla-text border-b border-white/10 pb-6">অর্ডার সামারি</h2>

            <div className="flex flex-col gap-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-bold bangla-text truncate text-white">{item.name}</p>
                    <p className="text-xs text-foreground/40 font-medium mt-1">৳{item.price} x {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-white">৳{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 mb-8 border-t border-white/10 pt-6">
              <div className="flex justify-between text-foreground/50 bangla-text">
                <span>পণ্যের মোট দাম</span>
                <span className="text-white font-medium">৳ {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-foreground/50 bangla-text">
                <span>ডেলিভারি চার্জ</span>
                <span className="text-white font-medium">৳ {shippingCharge}</span>
              </div>
              <div className="border-t border-white/10 pt-6 flex justify-between font-bold text-2xl">
                <span className="bangla-text text-white">সর্বমোট</span>
                <span className="text-primary">৳ {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary w-full py-5 rounded-3xl bangla-text text-xl font-bold shadow-xl shadow-primary/30 flex justify-center items-center gap-3 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'অর্ডার কনফার্ম করুন'}
            </button>
            <p className="text-[10px] text-center text-foreground/30 mt-4 bangla-text">
              "অর্ডার কনফার্ম করুন" বাটনে ক্লিক করার মাধ্যমে আপনি আমাদের শর্তাবলীতে সম্মত হচ্ছেন।
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
