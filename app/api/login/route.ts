import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (user && user.password === password) {
      return NextResponse.json(
        { message: "Login successful", role: user.role, userId: user.id },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
