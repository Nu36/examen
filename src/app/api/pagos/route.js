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
    const usuario = searchParams.get("usuario");

    try {
        let result;

        if(email != null) {
            result = await Pago.find({email: email});
        } else if(usuario != null) {
            result = await Pago.find({}).distinct(email);
        } else {
            result = await Pago.find({}).sort({createdAt: -1});
        }
        
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
};

export const POST = async (req) => {
    await connectDB();
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ "error": "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const newPago = await Pago.create(body)
        
        return NextResponse.json(newPago, { status: 201 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};