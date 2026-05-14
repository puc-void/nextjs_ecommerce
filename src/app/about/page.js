import { ShieldCheck, Truck, Heart, Users } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'বিশ্বাসযোগ্যতা',
      description: 'আমরা শুধুমাত্র অরিজিনাল এবং গুণগত মানের পণ্য সরবরাহ করি।',
    },
    {
      icon: Truck,
      title: 'দ্রুত ডেলিভারি',
      description: 'সারা বাংলাদেশে ২৪-৭২ ঘণ্টার মধ্যে হোম ডেলিভারি নিশ্চিত করি।',
    },
    {
      icon: Heart,
      title: 'কাস্টমার সেবা',
      description: '২৪/৭ কাস্টমার সাপোর্ট দিয়ে আমরা সর্বদা আপনার পাশে আছি।',
    },
    {
      icon: Users,
      title: 'কমিউনিটি',
      description: 'লক্ষাধিক সন্তুষ্ট কাস্টমারের বিশ্বস্ত পরিবার।',
    },
  ]

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bangla-text mb-6 text-gradient">আমাদের সম্পর্কে</h1>
          <p className="text-foreground/60 bangla-text max-w-2xl mx-auto text-lg leading-relaxed">
            ই-শপ বিডি বাংলাদেশের অন্যতম সেরা ই-কমার্স প্ল্যাটফর্ম। আমরা বিশ্বাস করি, 
            প্রতিটি মানুষ সেরা মানের পণ্য সবচেয়ে সাশ্রয়ী মূল্যে পাওয়ার অধিকার রাখে।
          </p>
        </div>

        {/* Story Section */}
        <div className="glass-card p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold bangla-text mb-6">আমাদের গল্প</h2>
              <div className="space-y-4 text-foreground/70 bangla-text leading-relaxed">
                <p>
                  ২০২৪ সালে ই-শপ বিডি প্রতিষ্ঠিত হয়। আমাদের লক্ষ্য হলো বাংলাদেশের প্রতিটি 
                  মানুষের কাছে সেরা মানের পণ্য সবচেয়ে সুলভ মূল্যে পৌঁছে দেওয়া।
                </p>
                <p>
                  আমাদের টিম প্রতিনিয়ত কাজ করে যাচ্ছে আপনাদের শপিং অভিজ্ঞতাকে আরও 
                  সহজ, নিরাপদ এবং আনন্দদায়ক করে তুলতে।
                </p>
              </div>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop"
                alt="About E-Shop BD"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold bangla-text text-center mb-12">আমাদের মূল্যবোধ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="glass-card p-8 text-center hover:border-primary/50 transition-all">
                <div className="p-4 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-6">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-bold bangla-text mb-3">{value.title}</h3>
                <p className="text-foreground/60 text-sm bangla-text">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="glass-card p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '১০,০০০+', label: 'পণ্য' },
              { number: '৫,০০০+', label: 'সন্তুষ্ট কাস্টমার' },
              { number: '৬৪', label: 'জেলায় ডেলিভারি' },
              { number: '৯৯%', label: 'পজিটিভ রিভিউ' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-foreground/60 bangla-text">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
