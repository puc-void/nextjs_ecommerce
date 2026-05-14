import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "পণ্যটি পাওয়া যায়নি" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "পণ্য লোড করতে সমস্যা হয়েছে" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "অনুমতি নেই" }, { status: 401 });
    }

    const { id } = params;
    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ message: "পণ্যটি সফলভাবে ডিলিট করা হয়েছে" });
  } catch (error) {
    return NextResponse.json({ error: "পণ্য ডিলিট করতে সমস্যা হয়েছে" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "অনুমতি নেই" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        stock: parseInt(body.stock),
        categoryId: body.categoryId,
        image: body.image
      }
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: "পণ্য আপডেট করতে সমস্যা হয়েছে" }, { status: 500 });
  }
}
