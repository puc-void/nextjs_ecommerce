import { Users, ShoppingBag, DollarSign, TrendingUp, Package, Clock } from 'lucide-react'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [totalProducts, totalUsers, totalOrders, totalRevenue] = await Promise.all([
    prisma.product.count(),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: {
        total: true
      }
    })
  ])

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  })

  const popularProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { orderItems: { _count: 'desc' } },
    include: { _count: { select: { orderItems: true } } }
  })

  const stats = [
    { label: 'মোট বিক্রয়', value: `৳ ${(totalRevenue._sum.total || 0).toLocaleString()}`, icon: DollarSign, color: 'text-success', bg: 'bg-success/10' },
    { label: 'মোট অর্ডার', value: totalOrders.toString(), icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'মোট কাস্টমার', value: totalUsers.toString(), icon: Users, color: 'text-secondary', bg: 'bg-secondary/10' },
    { label: 'মোট প্রোডাক্ট', value: totalProducts.toString(), icon: Package, color: 'text-accent', bg: 'bg-accent/10' },
  ]

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold bangla-text text-white">অ্যাডমিন ড্যাশবোর্ড</h1>
        <p className="text-foreground/50 bangla-text text-lg">আপনার শপ এর লাইভ আপডেট এবং স্ট্যাটিস্টিকস</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-8 flex items-center gap-6 border-white/5 hover:border-primary/20 transition-all group">
            <div className={`p-5 rounded-3xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/50 bangla-text mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 glass-card p-8 border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold bangla-text flex items-center gap-3">
              <Clock className="text-primary" /> সাম্প্রতিক অর্ডার
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-4 text-foreground/40 font-medium bangla-text">অর্ডার আইডি</th>
                  <th className="pb-4 text-foreground/40 font-medium bangla-text">কাস্টমার</th>
                  <th className="pb-4 text-foreground/40 font-medium bangla-text">টাকা</th>
                  <th className="pb-4 text-foreground/40 font-medium bangla-text">অবস্থা</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-foreground/30 bangla-text">কোনো অর্ডার পাওয়া যায়নি</td>
                  </tr>
                ) : recentOrders.map((order, i) => (
                  <tr key={order.id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-5 text-sm font-mono text-foreground/60">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="py-5 text-sm bangla-text font-medium text-white">{order.user?.name || 'অজানা কাস্টমার'}</td>
                    <td className="py-5 text-sm font-bold text-primary">৳ {order.total.toLocaleString()}</td>
                    <td className="py-5">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold bangla-text ${
                        order.status === 'DELIVERED' ? 'bg-success/10 text-success' : 
                        order.status === 'PENDING' ? 'bg-accent/10 text-accent' : 
                        'bg-primary/10 text-primary'
                      }`}>
                        {order.status === 'PENDING' ? 'পেন্ডিং' : 
                         order.status === 'DELIVERED' ? 'সফল' : 'প্রসেসিং'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card p-8 border-white/5">
          <h3 className="text-2xl font-bold mb-8 bangla-text">জনপ্রিয় পণ্য</h3>
          <div className="flex flex-col gap-6">
            {popularProducts.length === 0 ? (
              <p className="text-center py-10 text-foreground/30 bangla-text">কোনো পণ্য বিক্রি হয়নি</p>
            ) : popularProducts.map((product, i) => (
              <div key={product.id} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/10 group">
                <div className="w-16 h-16 rounded-xl bg-border overflow-hidden shrink-0">
                  <img src={product.image || `https://picsum.photos/seed/${product.id}/200`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-bold bangla-text text-white text-sm truncate">{product.name}</p>
                  <p className="text-xs text-foreground/40 mt-1 font-medium">{product._count.orderItems} টি অর্ডার</p>
                </div>
                <p className="font-bold text-primary">৳ {product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
