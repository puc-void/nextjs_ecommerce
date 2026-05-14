import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent bangla-text">
            ই-শপ বিডি
          </Link>
          <p className="text-foreground/60 text-sm bangla-text">
            আমরা দিচ্ছি সেরা মানের পণ্য এবং দ্রুত ডেলিভারি নিশ্চিত করছি। আমাদের সাথেই থাকুন।
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="p-2 rounded-full bg-glass hover:text-primary transition-colors"><Facebook size={20} /></a>
            <a href="#" className="p-2 rounded-full bg-glass hover:text-primary transition-colors"><Twitter size={20} /></a>
            <a href="#" className="p-2 rounded-full bg-glass hover:text-primary transition-colors"><Instagram size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 bangla-text">প্রয়োজনীয় লিংক</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/products" className="text-foreground/60 hover:text-primary transition-colors bangla-text">সকল পণ্য</Link></li>
            <li><Link href="/categories" className="text-foreground/60 hover:text-primary transition-colors bangla-text">ক্যাটাগরি</Link></li>
            <li><Link href="/cart" className="text-foreground/60 hover:text-primary transition-colors bangla-text">আমার কার্ট</Link></li>
            <li><Link href="/profile" className="text-foreground/60 hover:text-primary transition-colors bangla-text">আমার প্রোফাইল</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 bangla-text">সহযোগিতা</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/faq" className="text-foreground/60 hover:text-primary transition-colors bangla-text">সাধারণ জিজ্ঞাসা</Link></li>
            <li><Link href="/shipping" className="text-foreground/60 hover:text-primary transition-colors bangla-text">শিপিং পলিসি</Link></li>
            <li><Link href="/returns" className="text-foreground/60 hover:text-primary transition-colors bangla-text">রিটার্ন পলিসি</Link></li>
            <li><Link href="/contact" className="text-foreground/60 hover:text-primary transition-colors bangla-text">যোগাযোগ করুন</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6 bangla-text">যোগাযোগ</h4>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3 text-foreground/60">
              <MapPin className="text-primary shrink-0" size={20} />
              <span className="text-sm bangla-text">ঢাকা, বাংলাদেশ</span>
            </li>
            <li className="flex gap-3 text-foreground/60">
              <Phone className="text-primary shrink-0" size={20} />
              <span className="text-sm">+৮৮০ ১২৩৪ ৫৬৭৮৯০</span>
            </li>
            <li className="flex gap-3 text-foreground/60">
              <Mail className="text-primary shrink-0" size={20} />
              <span className="text-sm">support@eshopbd.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container border-t border-border pt-8 text-center text-foreground/40 text-sm">
        <p className="bangla-text">© ২০২৪ ই-শপ বিডি। সকল স্বত্ব সংরক্ষিত।</p>
      </div>
    </footer>
  )
}
