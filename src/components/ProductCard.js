'use client'

import { ShoppingCart, Star, Heart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <Link href={`/products/${product.id}`} className="glass-card group overflow-hidden flex flex-col h-full border-white/5 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
      <div className="aspect-[4/5] overflow-hidden relative">
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
           <button 
             onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
             className="p-4 rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 shadow-xl"
           >
             <Heart size={20} />
           </button>
           <button 
             onClick={handleAddToCart}
             className="p-4 rounded-full bg-primary text-white hover:bg-white hover:text-black transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75 shadow-xl"
           >
             <ShoppingCart size={20} />
           </button>
        </div>

        <div className="absolute top-4 left-4">
           <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] text-white font-bold uppercase tracking-widest border border-white/10">
             {product.category?.name || 'New'}
           </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow gap-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xl font-bold bangla-text text-white leading-tight group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-accent/10 text-accent shrink-0">
            <Star size={12} fill="currentColor" />
            <span className="text-xs font-black">4.5</span>
          </div>
        </div>
        
        <p className="text-foreground/40 text-sm bangla-text line-clamp-2 leading-relaxed">
          {product.description || 'সেরা মানের প্রিমিয়াম পণ্য আমাদের কালেকশন থেকে।'}
        </p>
        
        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-foreground/20 line-through font-medium">৳{(product.price * 1.2).toLocaleString()}</span>
            <span className="text-2xl font-black text-white group-hover:text-primary transition-colors">৳{product.price.toLocaleString()}</span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="p-4 rounded-2xl bg-white/5 text-white hover:bg-primary hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-90"
            title="কার্টে যোগ করুন"
          >
            <ShoppingCart size={22} />
          </button>
        </div>
      </div>
    </Link>
  )
}
