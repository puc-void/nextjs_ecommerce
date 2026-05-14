'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { Search, SlidersHorizontal, Loader2, PackageX } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const data = await res.json()
          setProducts(data)
        }
      } catch (err) {
        console.error("Failed to fetch products", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold bangla-text mb-4 text-gradient">আমাদের সকল পণ্য</h1>
            <p className="text-foreground/50 bangla-text max-w-xl text-lg">
              সেরা কোয়ালিটির পণ্য সবচেয়ে সাশ্রয়ী মূল্যে। আপনার পছন্দের পণ্যটি খুঁজে নিন।
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3">
             <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold bangla-text">
               <SlidersHorizontal size={16} />
               {filteredProducts.length} টি পণ্য পাওয়া গেছে
             </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16 group">
          <div className="relative glass-card p-2 border-white/5 group-focus-within:border-primary/30 transition-all shadow-2xl shadow-primary/5">
            <Search size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="পণ্য খুঁজুন (যেমন: হেডফোন, ঘড়ি...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background/50 rounded-2xl py-5 pl-16 pr-6 outline-none text-xl text-white bangla-text placeholder:text-foreground/20"
            />
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card overflow-hidden animate-pulse border-white/5">
                <div className="aspect-[4/5] bg-white/5" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-white/5 rounded-lg w-3/4" />
                  <div className="h-4 bg-white/5 rounded-lg w-full" />
                  <div className="flex justify-between items-center mt-6">
                    <div className="h-8 bg-white/5 rounded-lg w-1/4" />
                    <div className="h-10 bg-white/5 rounded-full w-10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 glass-card border-white/5 flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-foreground/20">
              <PackageX size={48} strokeWidth={1} />
            </div>
            <div>
              <p className="text-2xl font-bold bangla-text text-white">দুঃখিত, কোনো পণ্য পাওয়া যায়নি</p>
              <p className="text-foreground/40 bangla-text mt-2">অন্য কোনো কিওয়ার্ড দিয়ে খুঁজে দেখুন</p>
            </div>
            <button onClick={() => setSearchTerm('')} className="btn btn-outline px-8 rounded-2xl font-bold bangla-text">সব পণ্য দেখুন</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
