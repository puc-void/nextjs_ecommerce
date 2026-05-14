'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck, RotateCcw, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`)
        if (res.ok) {
          const data = await res.json()
          setProduct(data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 gap-6">
        <h2 className="text-3xl font-bold bangla-text text-white">পণ্যটি পাওয়া যায়নি</h2>
        <Link href="/products" className="btn btn-primary px-8">সব পণ্য দেখুন</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-foreground/50 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span className="bangla-text">ফিরে যান</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full -z-10 opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="glass-card p-4 border-white/10 overflow-hidden shadow-2xl">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-900">
                <img 
                  src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold w-fit uppercase tracking-widest">
                {product.category?.name || 'GENERIC'}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white bangla-text leading-tight">{product.name}</h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 text-accent">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />)}
                  <span className="ml-2 text-foreground/50 text-sm font-bold">৪.৫ (২৫টি রিভিউ)</span>
                </div>
                <div className={`text-sm font-bold bangla-text ${product.stock > 0 ? 'text-success' : 'text-error'}`}>
                  {product.stock > 0 ? `স্টক আছে: ${product.stock} টি` : 'স্টক আউট'}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-lg text-foreground/40 line-through font-medium">৳{(product.price * 1.2).toLocaleString()}</span>
              <span className="text-5xl font-black text-primary">৳{product.price.toLocaleString()}</span>
            </div>

            <p className="text-lg text-foreground/60 bangla-text leading-relaxed max-w-xl">
              {product.description || 'এই পণ্যটি আমাদের সংগ্রহের অন্যতম সেরা একটি পণ্য। এর গুণগত মান এবং স্থায়ীত্ব আপনাকে মুগ্ধ করবে। আপনার প্রতিদিনের প্রয়োজনে এটি হতে পারে একটি আদর্শ সঙ্গী।'}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1 shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-2xl hover:text-primary transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center text-xl font-bold font-mono">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-2xl hover:text-primary transition-colors"
                >
                  +
                </button>
              </div>

              <button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) addToCart(product)
                }}
                className="btn btn-primary w-full sm:w-auto px-12 py-5 rounded-2xl bangla-text text-xl font-bold shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <ShoppingCart size={24} /> কার্টে যোগ করুন
              </button>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/5 mt-4">
              <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left">
                <Truck className="text-primary" size={24} />
                <h4 className="font-bold text-white bangla-text">দ্রুত ডেলিভারি</h4>
                <p className="text-xs text-foreground/40 bangla-text">সারা দেশে ২৪-৭২ ঘণ্টার মধ্যে</p>
              </div>
              <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left">
                <ShieldCheck className="text-secondary" size={24} />
                <h4 className="font-bold text-white bangla-text">অরিজিনাল পণ্য</h4>
                <p className="text-xs text-foreground/40 bangla-text">১০০% কোয়ালিটি গ্যারান্টি</p>
              </div>
              <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left">
                <RotateCcw className="text-accent" size={24} />
                <h4 className="font-bold text-white bangla-text">সহজ রিটার্ন</h4>
                <p className="text-xs text-foreground/40 bangla-text">৭ দিনের মধ্যে রিটার্ন পলিসি</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
