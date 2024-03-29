import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Paga } from "@/models/Paga";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const GET = async (request, { params }) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ "error": "Unauthorized" }, { status: 401 });
    //if (Paga.email !== session.user.email) return NextResponse.json({ "error": "Forbidden" }, { status: 403 });

    await connectDB();
    const id = params.id;
    try {
        const result = await Paga.findById(id);
        if (!result) {
            return NextResponse.json(
                { message: `No se ha encontrado un pago con ID ${id}.` },
                { status: 404 }
            );
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ "error": "Unauthorized" }, { status: 401 });
    
    await connectDB();
    const id = params.id;
    try {
        const result = await Paga.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json(
                { message: `No se ha encontrado un pago con ID ${id}.` },
                { status: 404 }
            );
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ "error": "Unauthorized" }, { status: 401 });

    await connectDB();
    const id = params.id;
    const body = await request.json();
    try {
        const result = await Paga.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })
        if (!result) {
            return NextResponse.json(
                { message: `No se ha encontrado un Paga con ID ${id}.` },
                { status: 404 }
            );
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};