import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "ক্যাটাগরি লোড করতে সমস্যা হয়েছে" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "অনুমতি নেই" }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: "নাম আবশ্যক" }, { status: 400 });

    const category = await prisma.category.create({
      data: { name }
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "ক্যাটাগরি তৈরি করতে সমস্যা হয়েছে" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "অনুমতি নেই" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID আবশ্যক" }, { status: 400 });

    await prisma.category.delete({
      where: { id }
    });
    return NextResponse.json({ message: "সফলভাবে ডিলিট হয়েছে" });
  } catch (error) {
    return NextResponse.json({ error: "ক্যাটাগরি ডিলিট করতে সমস্যা হয়েছে (হয়তো এই ক্যাটাগরিতে পণ্য আছে)" }, { status: 500 });
  }
}
