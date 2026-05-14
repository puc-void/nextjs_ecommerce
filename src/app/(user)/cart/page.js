'use client'

import { useCart } from '@/context/CartContext'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const { cart, addToCart, decrementFromCart, removeFromCart, total, clearCart } = useCart()

  const shippingCharge = cart.length > 0 ? 60 : 0
  const grandTotal = total + shippingCharge

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 pt-28">
        <div className="w-24 h-24 bg-glass rounded-full flex items-center justify-center text-foreground/20">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold bangla-text text-foreground/60">আপনার কার্ট খালি</h2>
        <Link href="/products" className="btn btn-primary bangla-text px-8">কেনাকাটা শুরু করুন</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-28">
      <h1 className="text-3xl font-bold mb-10 bangla-text text-center text-gradient">আপনার শপিং কার্ট</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item.id} className="glass-card p-4 flex gap-4 items-center">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-border shrink-0">
                <img src={item.image || `https://picsum.photos/seed/${item.id}/200`} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-bold bangla-text mb-1">{item.name}</h3>
                <p className="text-primary font-bold mb-3">৳ {item.price}</p>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => decrementFromCart(item.id)}
                    className="p-1 hover:bg-glass rounded-md transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-medium w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="p-1 hover:bg-glass rounded-md transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-error/40 hover:text-error p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <button 
            onClick={clearCart}
            className="text-foreground/40 hover:text-error text-sm self-start bangla-text mt-2 px-2"
          >
            কার্ট খালি করুন
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6 bangla-text border-b border-border pb-4">অর্ডার সামারি</h2>
            
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between text-foreground/60 bangla-text">
                <span>সাবটোটাল</span>
                <span>৳ {total}</span>
              </div>
              <div className="flex justify-between text-foreground/60 bangla-text">
                <span>ডেলিভারি চার্জ</span>
                <span>৳ {shippingCharge}</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                <span className="bangla-text">সর্বমোট</span>
                <span className="text-primary">৳ {grandTotal}</span>
              </div>
            </div>

            <Link href="/checkout" className="btn btn-primary w-full justify-center py-4 bangla-text text-lg">
              চেকআউট করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
