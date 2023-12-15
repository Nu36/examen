import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { LoginLog } from "@/models/LoginLog";

export const GET = async () => {
    await connectDB();
    try {
        const result = await LoginLog.find().sort({ timestamp: -1 });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
};

export const POST = async (req) => {
    await connectDB();
    try {
        const body = await req.json();
        console.log("entra en POST\n")
        console.log(body)
        const newLoginLog = await LoginLog.create(body);
        return NextResponse.json(newLoginLog, { status: 201 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};