'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        router.push('/login')
      } else {
        const data = await res.json()
        setError(data.message || 'Something went wrong')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <div className="glass-card p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 bangla-text text-center text-gradient">নতুন অ্যাকাউন্ট</h2>
        
        {error && (
          <div className="bg-error/10 border border-error/20 text-error p-3 rounded-lg mb-4 text-sm bangla-text">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium bangla-text ml-1 text-foreground/80">নাম</label>
            <input
              type="text"
              required
              placeholder="আপনার পূর্ণ নাম"
              className="p-3 rounded-xl bg-background/50 border border-border focus:border-primary outline-none transition-all bangla-text"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium bangla-text ml-1 text-foreground/80">ইমেইল</label>
            <input
              type="email"
              required
              placeholder="আপনার ইমেইল"
              className="p-3 rounded-xl bg-background/50 border border-border focus:border-primary outline-none transition-all bangla-text"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium bangla-text ml-1 text-foreground/80">ফোন নাম্বার</label>
            <input
              type="tel"
              required
              placeholder="০১৭XXXXXXXX"
              className="p-3 rounded-xl bg-background/50 border border-border focus:border-primary outline-none transition-all bangla-text"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium bangla-text ml-1 text-foreground/80">ঠিকানা</label>
            <input
              type="text"
              required
              placeholder="আপনার পূর্ণ ঠিকানা"
              className="p-3 rounded-xl bg-background/50 border border-border focus:border-primary outline-none transition-all bangla-text"
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium bangla-text ml-1 text-foreground/80">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              placeholder="পাসওয়ার্ড দিন"
              className="p-3 rounded-xl bg-background/50 border border-border focus:border-primary outline-none transition-all bangla-text"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full justify-center py-4 mt-4 bangla-text text-lg"
          >
            {loading ? 'প্রসেসিং হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
          </button>

          <p className="text-center text-sm text-foreground/60 bangla-text mt-4">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              লগইন করুন
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
