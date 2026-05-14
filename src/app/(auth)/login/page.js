'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    if (res?.error) {
      setError('ইমেইল বা পাসওয়ার্ড সঠিক নয়')
      setLoading(false)
    } else {
      // Fetch session to check role
      const sessionRes = await fetch('/api/auth/session')
      const session = await sessionRes.json()
      
      if (session?.user?.role === 'ADMIN') {
        router.push('/admin/dashboard')
      } else {
        router.push('/')
      }
      router.refresh()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <div className="glass-card p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold mb-6 bangla-text text-center text-gradient">লগইন করুন</h2>
        
        {error && (
          <div className="bg-error/10 border border-error/20 text-error p-3 rounded-lg mb-4 text-sm bangla-text text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium bangla-text ml-1 text-foreground/80">ইমেইল</label>
            <input
              type="email"
              required
              placeholder="আপনার ইমেইল"
              className="p-3 rounded-xl bg-background/50 border border-border focus:border-primary outline-none transition-all bangla-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium bangla-text ml-1 text-foreground/80">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              placeholder="পাসওয়ার্ড দিন"
              className="p-3 rounded-xl bg-background/50 border border-border focus:border-primary outline-none transition-all bangla-text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full justify-center py-4 mt-2 bangla-text text-lg"
          >
            {loading ? 'প্রবেশ করা হচ্ছে...' : 'প্রবেশ করুন'}
          </button>

          <p className="text-center text-sm text-foreground/60 bangla-text">
            অ্যাকাউন্ট নেই?{' '}
            <Link href="/signup" className="text-primary hover:underline font-semibold">
              নতুন অ্যাকাউন্ট খুলুন
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
