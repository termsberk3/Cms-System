import { NextResponse, NextRequest } from "next/server";
import { connectToMongoDB } from "@/app/lib/db";
import Admin from "@/app/models/admin";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";


export async function POST(request: Request) {
    const { email, password }: { email: string; password: string } = await request.json();

    try {
        await connectToMongoDB();

        const user = await Admin.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not Found" }, { status: 401 });
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "wrong password" }, { status: 401 });
        }

        const token = sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return NextResponse.json({ id: user._id, token, userType: user.userType }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}