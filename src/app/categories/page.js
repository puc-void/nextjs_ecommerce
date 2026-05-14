'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Layers, Loader2 } from 'lucide-react'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories')
        if (res.ok) {
          const data = await res.json()
          setCategories(data)
        }
      } catch (err) {
        console.error("Failed to fetch categories", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold bangla-text mb-6 text-gradient">ক্যাটাগরি সমূহ</h1>
          <p className="text-foreground/50 bangla-text max-w-2xl mx-auto text-lg leading-relaxed">
            আপনার পছন্দের ক্যাটাগরি থেকে পণ্য বাছাই করুন এবং সেরা শপিং অভিজ্ঞতা উপভোগ করুন
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map((cat, index) => (
              <Link
                key={cat.id}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="glass-card group overflow-hidden border-white/5 hover:border-primary/30 transition-all flex flex-col h-full shadow-xl shadow-black/20"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layers size={64} className="text-white/10 group-hover:text-primary/30 transition-all duration-500 group-hover:scale-125" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-3xl font-bold bangla-text text-white group-hover:text-primary transition-colors">{cat.name}</h3>
                    <div className="h-1 w-12 bg-primary mt-4 rounded-full group-hover:w-24 transition-all duration-500" />
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <p className="text-foreground/50 bangla-text text-lg leading-relaxed">
                    {cat.name} ক্যাটাগরির সেরা পণ্যগুলো দেখে নিতে এখানে ক্লিক করুন।
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
                    <span className="text-sm font-bold text-foreground/30 bangla-text bg-white/5 px-4 py-1.5 rounded-full">
                      {cat._count?.products || 0} টি পণ্য
                    </span>
                    <span className="text-primary flex items-center gap-2 font-bold group-hover:gap-4 transition-all bangla-text text-lg">
                      দেখুন <ArrowRight size={20} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
