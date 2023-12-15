import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Evento } from "@/models/Evento";

export const GET = async (request, { params }) => {
    await connectDB();
    const id = params.id;
    try {
        const result = await Evento.findById(id);
        if (!result) {
            return NextResponse.json(
                { message: `No se ha encontrado un evento con ID ${id}.` },
                { status: 404 }
            );
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
  };

export const DELETE = async (request, { params }) => {
    await connectDB();
    const id = params.id;
    try {
        const result = await Evento.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json(
                { message: `No se ha encontrado un evento con ID ${id}.` },
                { status: 404 }
            );
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    await connectDB();
    const id = params.id;
    const body = await request.json();
    try {
        const result = await Evento.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })
        if (!result) {
            return NextResponse.json(
                { message: `No se ha encontrado un evento con ID ${id}.` },
                { status: 404 }
            );
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};