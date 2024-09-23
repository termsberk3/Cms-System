import Customer from "@/app/models/customer";
import { NextResponse, NextRequest } from "next/server";
import { connectToMongoDB } from "@/app/lib/db";

export async function GET(): Promise<NextResponse> {
  await connectToMongoDB();
  const customers: typeof Customer[] = await Customer.find();
  return NextResponse.json({ customers });
}
export async function POST(request: Request): Promise<Response> {
  const { fullName, email, user }: { fullName: string; email: string; user: string } = await request.json();
  await connectToMongoDB();
  await Customer.create({ fullName, email, user });
  return NextResponse.json({ message: "Customer Created" }, { status: 201 });
}

export async function DELETE(request: NextRequest): Promise<Response> {
  const id: string | null = request.nextUrl.searchParams.get("id");
  await connectToMongoDB();
  await Customer.findByIdAndDelete(id);
  return NextResponse.json({ message: "Customer deleted" }, { status: 200 });
}