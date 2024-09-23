import Customer from "@/app/models/customer";
import { NextResponse , NextRequest} from "next/server";
import { connectToMongoDB } from "@/app/lib/db";

interface CustomerType {
  id: string;
}

export async function GET(request: Request, { params }: { params: { id: string } }): Promise<Response> {
  const { id }: { id: string } = params;
  await connectToMongoDB();
  const customers: CustomerType | null = await Customer.findOne({ _id: id });
  return NextResponse.json({ customers }, { status: 200 });
}

export async function PATCH(request: Request,  { params }: { params: { id: string } }): Promise<Response> {
  const { id }: { id: string } = params;
  const data: Record<string, unknown> = await request.json();

  await connectToMongoDB();
  await Customer.findByIdAndUpdate(id, data);

  return NextResponse.json({ message: "Customer patched successfully" }, { status: 200 });
}

