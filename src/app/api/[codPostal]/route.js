import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Pago } from "@/models/Pago";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export const GET = async (request, { params }) => {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ "error": "Unauthorized" }, { status: 401 });

    await connectDB();  

    const apiUrl = "http://localhost:3000";

    const cod = params.codPostal;

    try {
        const ubi = await fetch(`${apiUrl}/api/${cod}/ubicacion`, { cache: 'no-store' }).then(res => res.json());
          
        const result = await Pago.find({
            $expr: {
                $and: [
                  {
                    $lt: [
                      {
                        $abs: {
                          $subtract: [{$toDouble: "$lat"}, {$toDouble: ubi[0].lat}]
                        }
                      },
                      0.2
                    ]
                  },
                  {
                    $lt: [
                      {
                        $abs: {
                          $subtract: [{$toDouble: "$lon"}, {$toDouble: ubi[0].lon}]
                        }
                      },
                      0.2
                    ]
                  }
                ]
              }
        });

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