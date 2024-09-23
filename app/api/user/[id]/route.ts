import Admins from "@/app/models/admin";
import { NextResponse , NextRequest} from "next/server";
import { connectToMongoDB } from "@/app/lib/db";

interface UserType {
  id: string;
}

export async function GET(request: Request, { params }: { params: { id: string } }): Promise<Response> {
  const { id }: { id: string } = params;
  await connectToMongoDB();
  const admins: UserType | null = await Admins.findOne({ _id: id });
  return NextResponse.json({ admins }, { status: 200 });
}

export async function PATCH(request: Request,  { params }: { params: { id: string } }): Promise<Response> {
  const { id }: { id: string } = params;
  const data: Record<string, unknown> = await request.json();

  await connectToMongoDB();
  await Admins.findByIdAndUpdate(id, data);

  return NextResponse.json({ message: "User patched successfully" }, { status: 200 });
}

