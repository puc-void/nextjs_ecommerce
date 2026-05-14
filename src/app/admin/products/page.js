'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Package, Search, ExternalLink, MoreVertical, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত যে আপনি এই পণ্যটি ডিলিট করতে চান?')) return

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id))
        router.refresh()
      } else {
        alert('ডিলিট করতে সমস্যা হয়েছে')
      }
    } catch (err) {
      alert('একটি সমস্যা হয়েছে')
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category?.name && p.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold bangla-text text-white">ইনভেন্টরি কন্ট্রোল</h1>
          <p className="text-slate-500 bangla-text mt-1 text-lg">স্টোরের সকল পণ্য এবং স্টক ম্যানেজমেন্ট</p>
        </div>
        <Link href="/admin/products/new" className="px-8 py-4 bg-emerald-500 text-slate-900 rounded-2xl bangla-text font-black shadow-xl shadow-emerald-500/20 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" /> নতুন পণ্য যোগ করুন
        </Link>
      </header>

      <div className="glass-card overflow-hidden border-slate-800 bg-slate-900/30">
        <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row gap-6 justify-between items-center bg-slate-900/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="পণ্য খুঁজুন..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-emerald-500/50 transition-all bangla-text text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400">
               মোট পণ্য: <span className="text-emerald-500">{filteredProducts.length}</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-[10px] uppercase tracking-widest border-b border-slate-800">
                <th className="px-8 py-6 font-black">পণ্য</th>
                <th className="px-6 py-6 font-black">বিভাগ</th>
                <th className="px-6 py-6 font-black">মূল্য</th>
                <th className="px-6 py-6 font-black">স্টক লেভেল</th>
                <th className="px-8 py-6 font-black text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={5} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-emerald-500" /></td></tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-6 text-slate-700">
                      <Package size={80} strokeWidth={1} className="opacity-20" />
                      <p className="bangla-text text-2xl font-bold">কোনো পণ্য পাওয়া যায়নি</p>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.map((product) => (
                <tr key={product.id} className="group hover:bg-emerald-500/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shrink-0 shadow-2xl">
                        <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white bangla-text text-lg truncate mb-1">{product.name}</p>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">SKU: {product.id.slice(-10)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                      {product.category?.name || 'GENERIC'}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-white font-black text-lg">৳ {product.price.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        <span>{product.stock} ইউনিট</span>
                        <span className={product.stock > 10 ? 'text-emerald-500' : product.stock > 0 ? 'text-amber-500' : 'text-rose-500'}>
                          {product.stock > 10 ? 'High' : product.stock > 0 ? 'Low' : 'Out'}
                        </span>
                      </div>
                      <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${Math.min(product.stock * 2, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <Link href={`/products/${product.id}`} target="_blank" className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all">
                        <ExternalLink size={18} />
                      </Link>
                      <Link href={`/admin/products/${product.id}/edit`} className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-emerald-400 transition-all">
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
