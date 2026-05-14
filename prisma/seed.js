const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@eshopbd.com',
      password: adminPassword,
      role: 'ADMIN',
      phone: '01700000000',
      address: 'Dhaka, Bangladesh',
    },
  });

  // Create Categories
  const electronics = await prisma.category.create({
    data: { name: 'Electronics' },
  });
  const fashion = await prisma.category.create({
    data: { name: 'Fashion' },
  });

  // Create Products
  const products = [
    {
      name: 'প্রিমিয়াম স্মার্টফোন',
      description: 'অসাধারণ ক্যামেরা এবং শক্তিশালী ব্যাটারি সহ লেটেস্ট স্মার্টফোন।',
      price: 45000,
      stock: 10,
      categoryId: electronics.id,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    },
    {
      name: 'ওয়্যারলেস হেডফোন',
      description: 'হাই-কোয়ালিটি সাউন্ড এবং দীর্ঘস্থায়ী চার্জ।',
      price: 3500,
      stock: 50,
      categoryId: electronics.id,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    },
    {
      name: 'স্মার্ট ওয়াচ',
      description: 'স্টাইলিশ লুক এবং হেলথ ট্র্যাকিং ফিচার।',
      price: 2500,
      stock: 30,
      categoryId: electronics.id,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    },
    {
      name: 'কটন শার্ট',
      description: 'আরামদায়ক এবং স্টাইলিশ ক্যাজুয়াল শার্ট।',
      price: 1200,
      stock: 100,
      categoryId: fashion.id,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
