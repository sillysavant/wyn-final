import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("Received registration request for:", email);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user without specifying the id (let MongoDB generate it)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "user", // optional, as it defaults to "user" in schema
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return new NextResponse(`Error creating user: ${error}`, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
