'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Layers, Search, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [adding, setAdding] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    setAdding(true)
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName })
      })

      if (res.ok) {
        setNewCategoryName('')
        fetchCategories()
        router.refresh()
      }
    } catch (err) {
      alert('ক্যাটাগরি যোগ করতে সমস্যা হয়েছে')
    } finally {
      setAdding(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত? এই ক্যাটাগরির অধীনে পণ্য থাকলে ডিলিট হবে না।')) return

    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id))
      } else {
        const data = await res.json()
        alert(data.error || 'ডিলিট করতে সমস্যা হয়েছে')
      }
    } catch (err) {
      alert('একটি সমস্যা হয়েছে')
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold bangla-text text-white">ক্যাটাগরি কন্ট্রোল</h1>
          <p className="text-slate-500 bangla-text mt-1 text-lg">আপনার স্টোরের সকল পণ্য বিভাগ পরিচালনা করুন</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Categories List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="glass-card overflow-hidden border-slate-800 bg-slate-900/30">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="ক্যাটাগরি খুঁজুন..." 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-emerald-500/50 transition-all bangla-text text-sm"
                />
              </div>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{categories.length} টি মোট</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 text-[10px] uppercase tracking-widest border-b border-slate-800">
                    <th className="px-8 py-5 font-black">বিভাগের নাম</th>
                    <th className="px-6 py-5 font-black">পণ্য সংখ্যা</th>
                    <th className="px-8 py-5 font-black text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {loading ? (
                    <tr><td colSpan={3} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-emerald-500" /></td></tr>
                  ) : categories.map((cat) => (
                    <tr key={cat.id} className="group hover:bg-emerald-500/[0.02] transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all duration-300">
                            <Layers size={18} />
                          </div>
                          <span className="font-bold text-slate-200 bangla-text text-lg">{cat.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-500 font-mono font-bold text-lg">{cat._count?.products || 0}</span>
                          <span className="text-xs text-slate-500 bangla-text font-medium">টি পণ্য</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-emerald-400 transition-all">
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(cat.id)}
                            className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 transition-all"
                          >
                            <Trash2 size={16} />
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

        {/* Quick Add Form */}
        <div className="flex flex-col gap-6">
          <form onSubmit={handleAddCategory} className="glass-card p-8 border-slate-800 bg-emerald-500/[0.03] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:w-32 group-hover:h-32 transition-all duration-700" />
            <h3 className="text-xl font-black text-emerald-500 mb-6 bangla-text">দ্রুত যোগ করুন</h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">ক্যাটাগরির নাম</label>
                <input 
                  type="text" 
                  required
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="যেমন: ঘর সাজানো"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 px-4 outline-none focus:border-emerald-500/50 transition-all bangla-text"
                />
              </div>
              <button 
                type="submit"
                disabled={adding}
                className="w-full py-4 bg-emerald-500 text-slate-900 rounded-xl bangla-text font-bold hover:bg-emerald-400 transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {adding ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />} সেভ করুন
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
