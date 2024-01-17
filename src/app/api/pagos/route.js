import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Pago } from "@/models/Pago";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const GET = async (req, res) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ "error": "Unauthorized" }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(req.url);
    
    const email = searchParams.get("email");

    try {
        let result;

        if(email != null) {
            result = await Pago.find({email: email});
        } else {
            result = await Pago.find({}).sort({createdAt: -1});
        }
        
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
};

export const POST = async (req) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ "error": "Unauthorized" }, { status: 401 });

    await connectDB();
    try {
        const body = await req.json();
        console.log(body)
        const newPago = await Pago.create(body);
        return NextResponse.json(newPago, { status: 201 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};