import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { LoginLog } from "@/models/LoginLog";

export const GET = async (req, res) => {
    await connectDB();
    const { searchParams } = new URL(req.url);
    
    const email = searchParams.get("email");

    try {
        let result;

        if(email != null) {
            result = await LoginLog.findOne({usuario: email});
        } else {
            result = await LoginLog.find({});
        }
        
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
};

export const POST = async (req) => {
    await connectDB();
    try {
        const body = await req.json();
        const newLoginLog = await LoginLog.create(body);
        return NextResponse.json(newLoginLog, { status: 201 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};