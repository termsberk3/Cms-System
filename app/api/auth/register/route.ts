import { NextResponse, NextRequest } from "next/server";
import { connectToMongoDB } from "@/app/lib/db";
import Admin from "@/app/models/admin";
import { hash } from "bcrypt";


export async function POST(request: Request) {
    const { email, password, userType, fullName }: { email: string; password: string ; userType: string; fullName:string} = await request.json();

    try {
        await connectToMongoDB();

        const user = await Admin.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "User already exist" }, { status: 401 });
        }

        const hashedPasword = await hash(password, 8)
        await Admin.create({ email, password: hashedPasword, userType , fullName})

        return NextResponse.json({ message: 'Created' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}