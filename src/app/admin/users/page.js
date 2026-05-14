'use client'

import { useState, useEffect } from 'react'
import { Users, Search, Trash2, Shield, User as UserIcon, Loader2, RefreshCcw, Mail, Calendar } from 'lucide-react'

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const res = await fetch('/api/users')
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত? এই ইউজারকে ডিলিট করলে তার সকল অর্ডার হিস্ট্রি মুছে যেতে পারে।')) return

    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setUsers(users.filter(u => u.id !== id))
      } else {
        alert('ডিলিট করতে সমস্যা হয়েছে')
      }
    } catch (err) {
      alert('একটি সমস্যা হয়েছে')
    }
  }

  const toggleRole = async (user) => {
    const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN'
    setUpdatingId(user.id)
    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      })

      if (res.ok) {
        setUsers(users.map(u => u.id === user.id ? { ...u, role: newRole } : u))
      } else {
        alert('রোল পরিবর্তন করতে সমস্যা হয়েছে')
      }
    } catch (err) {
      alert('একটি সমস্যা হয়েছে')
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold bangla-text text-white">ইউজার ম্যানেজমেন্ট</h1>
          <p className="text-slate-500 bangla-text mt-1 text-lg">আপনার প্ল্যাটফর্মের সকল ব্যবহারকারী নিয়ন্ত্রণ করুন</p>
        </div>
        <button 
          onClick={fetchUsers}
          className="p-4 rounded-2xl bg-slate-800 text-slate-400 hover:text-emerald-500 transition-all"
        >
          <RefreshCcw size={20} />
        </button>
      </header>

      <div className="glass-card overflow-hidden border-slate-800 bg-slate-900/30">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="ইউজার খুঁজুন..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-emerald-500/50 transition-all bangla-text text-sm"
            />
          </div>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{filteredUsers.length} টি মোট</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-[10px] uppercase tracking-widest border-b border-slate-800">
                <th className="px-8 py-5 font-black">ইউজার তথ্য</th>
                <th className="px-6 py-5 font-black">রোল</th>
                <th className="px-6 py-5 font-black">জয়েনিং ডেট</th>
                <th className="px-8 py-5 font-black text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={4} className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-emerald-500" /></td></tr>
              ) : filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-emerald-500/[0.02] transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-900 transition-all duration-300">
                        <UserIcon size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-200 bangla-text text-lg">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                          <Mail size={12} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <button 
                      onClick={() => toggleRole(user)}
                      disabled={updatingId === user.id}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${user.role === 'ADMIN' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 hover:text-white border border-transparent'}`}
                    >
                      {updatingId === user.id ? <Loader2 size={10} className="animate-spin" /> : <Shield size={10} />}
                      {user.role}
                    </button>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Calendar size={14} />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
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
