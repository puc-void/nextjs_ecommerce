import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "অনুমতি নেই" }, { status: 401 });
    }

    const { id } = params;
    
    // Prevent admin from deleting themselves
    if (id === session.user.id) {
      return NextResponse.json({ error: "আপনি নিজেকে ডিলিট করতে পারবেন না" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ message: "ইউজার সফলভাবে ডিলিট করা হয়েছে" });
  } catch (error) {
    return NextResponse.json({ error: "ইউজার ডিলিট করতে সমস্যা হয়েছে" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "অনুমতি নেই" }, { status: 401 });
    }

    const { id } = params;
    const { role } = await req.json();

    if (!role) return NextResponse.json({ error: "রোল আবশ্যক" }, { status: 400 });

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "রোল আপডেট করতে সমস্যা হয়েছে" }, { status: 500 });
  }
}
