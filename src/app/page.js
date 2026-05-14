import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'
import { ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  })

  return (
    <div>
      <Hero />

      {/* Features Section */}
      <section className="section-padding bg-card/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 flex flex-col items-center text-center gap-4 hover:border-primary/50 transition-all group">
              <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold bangla-text">দ্রুত ডেলিভারি</h3>
              <p className="text-foreground/60 bangla-text">সারা বাংলাদেশে ২৪-৭২ ঘণ্টার মধ্যে হোম ডেলিভারি।</p>
            </div>
            <div className="glass-card p-8 flex flex-col items-center text-center gap-4 hover:border-secondary/50 transition-all group">
              <div className="p-4 rounded-full bg-secondary/10 text-secondary group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold bangla-text">নিরাপদ পেমেন্ট</h3>
              <p className="text-foreground/60 bangla-text">ক্যাশ অন ডেলিভারি এবং অনলাইন পেমেন্ট সুবিধা।</p>
            </div>
            <div className="glass-card p-8 flex flex-col items-center text-center gap-4 hover:border-accent/50 transition-all group">
              <div className="p-4 rounded-full bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold bangla-text">সেরা অফার</h3>
              <p className="text-foreground/60 bangla-text">প্রতি সপ্তাহে আকর্ষণীয় ডিসকাউন্ট এবং অফার।</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold bangla-text text-gradient">সেরা বিক্রিত পণ্য</h2>
              <p className="text-foreground/60 bangla-text mt-4 text-lg">আমাদের কালেকশন থেকে সেরা পণ্যগুলো দেখে নিন</p>
            </div>
            <Link href="/products" className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all bangla-text group">
              সব দেখুন <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="section-padding container">
        <div className="glass-card p-12 text-center flex flex-col items-center gap-6 overflow-hidden relative border-none shadow-2xl shadow-primary/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] -z-10 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 blur-[120px] -z-10 animate-pulse" />
          
          <h2 className="text-4xl md:text-6xl font-bold bangla-text max-w-3xl leading-tight">নতুন অফার এবং আপডেট পেতে আমাদের সাথে থাকুন</h2>
          <p className="text-foreground/60 bangla-text text-lg">আমাদের ইমেইল লিস্টে যোগ দিন এবং ১০% ডিসকাউন্ট পান আপনার প্রথম অর্ডারে।</p>
          
          <form className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mt-6">
            <input 
              type="email" 
              placeholder="আপনার ইমেইল দিন" 
              className="flex-grow p-4 px-6 rounded-2xl bg-background/50 border border-white/10 focus:border-primary/50 outline-none transition-all bangla-text backdrop-blur-md"
            />
            <button className="btn btn-primary px-10 py-4 rounded-2xl bangla-text text-lg font-bold shadow-lg shadow-primary/30">সাবস্ক্রাইব</button>
          </form>
        </div>
      </section>
    </div>
  )
}
