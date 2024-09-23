import Admins from "@/app/models/admin";
import { NextResponse, NextRequest } from "next/server";
import { connectToMongoDB } from "@/app/lib/db";
import { hash } from "bcrypt";

export async function GET(): Promise<NextResponse> {
  await connectToMongoDB();
  const admins: typeof Admins[] = await Admins.find();
  return NextResponse.json({ admins });
}
export async function POST(request: Request): Promise<Response> {
  const { fullName, email, userType , password}: { fullName: string; email: string, userType : string ; password: string} = await request.json();
  await connectToMongoDB();
  const hashedPasword = await hash(password, 8)
  await Admins.create({ fullName, email, userType, password : hashedPasword });
  return NextResponse.json({ message: "User Created" }, { status: 201 });
}

export async function DELETE(request: NextRequest): Promise<Response> {
  const id: string | null = request.nextUrl.searchParams.get("id");
  await connectToMongoDB();
  await Admins.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}