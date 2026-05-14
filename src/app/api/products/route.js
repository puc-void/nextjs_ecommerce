import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    
    const products = await prisma.product.findMany({
      where: category ? {
        category: {
          name: category
        }
      } : {},
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "পণ্যগুলো লোড করতে সমস্যা হয়েছে" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "অনুমতি নেই" }, { status: 401 });
    }

    const { name, description, price, image, categoryId, stock } = await req.json();

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: "আবশ্যকীয় তথ্য প্রদান করুন" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        categoryId,
        stock: parseInt(stock) || 0,
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json({ error: "পণ্য যোগ করতে সমস্যা হয়েছে" }, { status: 500 });
  }
}
