'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[30%] h-[30%] bg-accent/10 blur-[120px] rounded-full" />

      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <div className="flex items-center gap-3 text-primary font-bold tracking-widest bangla-text px-6 py-2 bg-primary/10 rounded-full w-fit border border-primary/20 shadow-lg shadow-primary/10">
            <Sparkles size={18} /> নতুন কালেকশন ২০২৪
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black leading-[1.1] bangla-text text-white">
            আপনার পছন্দের <br />
            <span className="text-gradient">
              সেরা পণ্যগুলো
            </span> <br />
            সাশ্রয়ী মূল্যে
          </h1>
          
          <p className="text-foreground/50 text-xl max-w-lg bangla-text leading-relaxed">
            সেরা কোয়ালিটির পণ্য এবং দ্রুততম সময়ে আপনার ঠিকানায় পৌঁছে দিতে আমরা প্রতিশ্রুতিবদ্ধ। আজই শপিং শুরু করুন!
          </p>
          
          <div className="flex flex-wrap gap-6 mt-4">
            <Link href="/products" className="btn btn-primary px-10 py-5 rounded-3xl bangla-text text-xl font-bold shadow-2xl shadow-primary/40 group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                শপিং শুরু করুন <ShoppingBag size={24} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
            <Link href="/categories" className="btn btn-outline px-10 py-5 rounded-3xl bangla-text text-xl font-bold border-white/10 hover:border-white/30 backdrop-blur-md group">
              <span className="flex items-center gap-3">
                ক্যাটাগরি দেখুন <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative perspective-1000"
        >
          <div className="relative z-10 glass-card p-4 rotate-3 hover:rotate-0 transition-all duration-700 cursor-pointer shadow-2xl shadow-black/50 border-white/10 hover:border-primary/30">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop" 
                alt="Product" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Badges */}
            <div className="absolute -bottom-8 -left-8 glass-card p-6 border-white/10 shadow-2xl animate-bounce-slow">
              <p className="text-xl font-black text-primary bangla-text">২০% ছাড়!</p>
              <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Limited Offer</p>
            </div>
            
            <div className="absolute -top-8 -right-8 glass-card p-6 border-white/10 shadow-2xl">
              <p className="text-xl font-black text-secondary bangla-text">প্রিমিয়াম</p>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-1 rounded-full bg-accent" />)}
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10" />
        </motion.div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
