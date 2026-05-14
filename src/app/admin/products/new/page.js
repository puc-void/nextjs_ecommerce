'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Upload, Package, Info, DollarSign, Layers, Hash } from 'lucide-react'
import Link from 'next/link'

export default function NewProductPage() {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    image: ''
  })
  const router = useRouter()

  useEffect(() => {
    async function fetchCategories() {
      try {
        // We'll create this API shortly
        const res = await fetch('/api/categories')
        const data = await res.json()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories", error)
      }
    }
    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        router.push('/admin/products')
        router.refresh()
      } else {
        alert('পণ্য যোগ করতে সমস্যা হয়েছে')
      }
    } catch (error) {
      alert('একটি সমস্যা হয়েছে')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto">
      <header className="flex items-center gap-6">
        <Link href="/admin/products" className="p-3 rounded-2xl bg-white/5 text-foreground/60 hover:text-white hover:bg-white/10 transition-all">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-4xl font-bold bangla-text text-white">নতুন পণ্য যোগ করুন</h1>
          <p className="text-foreground/50 bangla-text mt-1">পণ্যের বিস্তারিত তথ্য এখানে প্রদান করুন</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Info */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="glass-card p-8 border-white/5 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-primary font-bold mb-2">
              <Info size={20} /> <span className="bangla-text text-lg">প্রাথমিক তথ্য</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground/60 bangla-text ml-1">পণ্যের নাম</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
                <input
                  required
                  type="text"
                  placeholder="যেমন: প্রিমিয়াম স্মার্ট ওয়াচ"
                  className="w-full bg-background/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 transition-all bangla-text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground/60 bangla-text ml-1">বিস্তারিত বর্ণনা</label>
              <textarea
                required
                rows={6}
                placeholder="পণ্যের বৈশিষ্ট্য এবং অন্যান্য তথ্য লিখুন..."
                className="w-full bg-background/50 border border-white/10 rounded-2xl p-4 outline-none focus:border-primary/50 transition-all bangla-text resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="glass-card p-8 border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground/60 bangla-text ml-1">মূল্য (৳)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
                <input
                  required
                  type="number"
                  placeholder="০.০০"
                  className="w-full bg-background/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 transition-all font-bold"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground/60 bangla-text ml-1">স্টক পরিমাণ</label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
                <input
                  required
                  type="number"
                  placeholder="০"
                  className="w-full bg-background/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary/50 transition-all font-bold"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Media & Category */}
        <div className="flex flex-col gap-8">
          <div className="glass-card p-8 border-white/5 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-secondary font-bold mb-2">
              <Layers size={20} /> <span className="bangla-text text-lg">ক্যাটাগরি</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <select
                required
                className="w-full bg-background/50 border border-white/10 rounded-2xl py-4 px-4 outline-none focus:border-primary/50 transition-all bangla-text appearance-none cursor-pointer"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              >
                <option value="">ক্যাটাগরি সিলেক্ট করুন</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="glass-card p-8 border-white/5 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-accent font-bold mb-2">
              <Upload size={20} /> <span className="bangla-text text-lg">পণ্যের ছবি</span>
            </div>
            
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="ছবির URL দিন (যেমন: https://...)"
                className="w-full bg-background/50 border border-white/10 rounded-2xl py-4 px-4 outline-none focus:border-primary/50 transition-all text-sm"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              {formData.image && (
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5 mt-2">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <button
            disabled={loading}
            className="btn btn-primary w-full py-5 rounded-3xl bangla-text text-xl font-bold shadow-xl shadow-primary/30 flex justify-center items-center gap-3 mt-4 active:scale-95 transition-all disabled:opacity-50"
          >
            <Save size={24} /> {loading ? 'সেভ হচ্ছে...' : 'পণ্যটি সেভ করুন'}
          </button>
        </div>
      </form>
    </div>
  )
}
