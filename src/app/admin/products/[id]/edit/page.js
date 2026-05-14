'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, Upload, Package, Info, DollarSign, Layers, Hash, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    image: ''
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catsRes] = await Promise.all([
          fetch(`/api/products/${id}`),
          fetch('/api/categories')
        ])

        if (prodRes.ok && catsRes.ok) {
          const product = await prodRes.json()
          const categories = await catsRes.json()
          
          setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price.toString(),
            stock: product.stock.toString(),
            categoryId: product.categoryId,
            image: product.image || ''
          })
          setCategories(categories)
        }
      } catch (error) {
        console.error("Failed to fetch data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH', // I'll add this to the API shortly
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        router.push('/admin/products')
        router.refresh()
      } else {
        alert('আপডেট করতে সমস্যা হয়েছে')
      }
    } catch (error) {
      alert('একটি সমস্যা হয়েছে')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500" size={48} /></div>
  }

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto">
      <header className="flex items-center gap-6">
        <Link href="/admin/products" className="p-3 rounded-2xl bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-4xl font-bold bangla-text text-white">পণ্য এডিট করুন</h1>
          <p className="text-slate-500 bangla-text mt-1">পণ্যের তথ্য আপডেট করুন</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="glass-card p-8 border-slate-800 bg-slate-900/30 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-emerald-500 font-bold mb-2">
              <Info size={20} /> <span className="bangla-text text-lg">প্রাথমিক তথ্য</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-500 bangla-text ml-1">পণ্যের নাম</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                <input
                  required
                  type="text"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500/50 transition-all bangla-text text-white"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-500 bangla-text ml-1">বিস্তারিত বর্ণনা</label>
              <textarea
                required
                rows={6}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl p-4 outline-none focus:border-emerald-500/50 transition-all bangla-text resize-none text-white"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="glass-card p-8 border-slate-800 bg-slate-900/30 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-500 bangla-text ml-1">মূল্য (৳)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                <input
                  required
                  type="number"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500/50 transition-all font-bold text-white"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-500 bangla-text ml-1">স্টক পরিমাণ</label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700" size={18} />
                <input
                  required
                  type="number"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-emerald-500/50 transition-all font-bold text-white"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="glass-card p-8 border-slate-800 bg-slate-900/30 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-emerald-500 font-bold mb-2">
              <Layers size={20} /> <span className="bangla-text text-lg">ক্যাটাগরি</span>
            </div>
            
            <select
              required
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-4 outline-none focus:border-emerald-500/50 transition-all bangla-text text-white appearance-none"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            >
              <option value="">ক্যাটাগরি সিলেক্ট করুন</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="glass-card p-8 border-slate-800 bg-slate-900/30 flex flex-col gap-6">
            <div className="flex items-center gap-3 text-emerald-500 font-bold mb-2">
              <Upload size={20} /> <span className="bangla-text text-lg">পণ্যের ছবি</span>
            </div>
            
            <input
              type="text"
              placeholder="ছবির URL দিন"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-4 outline-none focus:border-emerald-500/50 transition-all text-sm text-white"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            {formData.image && (
              <div className="aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 mt-2">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <button
            disabled={saving}
            className="w-full py-5 bg-emerald-500 text-slate-900 rounded-3xl bangla-text text-xl font-bold shadow-xl shadow-emerald-500/30 flex justify-center items-center gap-3 active:scale-95 transition-all disabled:opacity-50"
          >
            <Save size={24} /> {saving ? 'সেভ হচ্ছে...' : 'আপডেট করুন'}
          </button>
        </div>
      </form>
    </div>
  )
}
