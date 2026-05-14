import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, password, phone, address } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "ইমেইল এবং পাসওয়ার্ড প্রয়োজন" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({
      where: { email }
    });

    if (exists) {
      return NextResponse.json({ error: "এই ইমেইলটি ইতিমধ্যে ব্যবহার করা হয়েছে" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        role: 'USER'
      }
    });

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "রেজিস্ট্রেশন করতে সমস্যা হয়েছে" }, { status: 500 });
  }
}
