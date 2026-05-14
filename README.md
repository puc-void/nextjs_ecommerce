# ই-শপ বিডি (E-Shop BD)

একটি আধুনিক ই-কমার্স প্ল্যাটফর্ম যা Next.js, Prisma এবং NeonDB দিয়ে তৈরি।

## টেক স্ট্যাক
- **Frontend**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS & Tailwind (Custom UI)
- **Animation**: Framer Motion
- **Database**: NeonDB (PostgreSQL)
- **ORM**: Prisma
- **Auth**: NextAuth.js

## শুরু করার আগে
প্রথমে আপনার প্রোজেক্টে একটি `.env` ফাইল তৈরি করুন এবং নিচের ভেরিয়েবলগুলো সেট করুন:

```env
DATABASE_URL="your_neondb_url_here"
NEXTAUTH_SECRET="your_random_secret_here"
NEXTAUTH_URL="http://localhost:3000"
```

## ইন্সটলেশন এবং রান

১. ডিপেন্ডেন্সি ইন্সটল করুন:
```bash
npm install
```

২. ডাটাবেস সিঙ্ক করুন:
```bash
npx prisma db push
```

৩. ডামি ডাটা ইনসার্ট করুন (অপশনাল):
```bash
npx prisma db seed
```

৪. ডেভেলপমেন্ট সার্ভার রান করুন:
```bash
npm run dev
```

## ফিচারসমূহ
- **আধুনিক ডিজাইন**: গ্লাস-মরফিজম এবং ডাইনামিক অ্যানিমেশন।
- **বাংলা সাপোর্ট**: সম্পূর্ণ সাইটটি বাংলায় ডিজাইন করা।
- **অ্যাডমিন ড্যাশবোর্ড**: ইউজার, প্রোডাক্ট এবং অর্ডার ম্যানেজমেন্টের জন্য শক্তিশালী প্যানেল।
- **শপিং কার্ট**: অটো-ক্যালকুলেশন ফিচারসহ কার্ট ম্যানেজমেন্ট।
- **অথেন্টিকেশন**: ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন ও সাইনআপ।
