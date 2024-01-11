import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY_CLOUDINARY, 
    api_secret: process.env.API_SECRET_CLOUDINARY 
});

export async function POST(request) {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    try {
        const body = await request.json();
        const image = body.image;
        const eventoId = body.nombre;
        
        if (!image) {
            return NextResponse.json("no se ha subido ninguna imagen", {status: 400});
        }

        const buffer = Buffer.from(image.split(",")[1], 'base64');    
        const response = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({}, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
            .end(buffer);
        });

        // Añadir la imagen al evento
        const r = await fetch(`${apiUrl}/api/eventos/${eventoId}`, {
            method: "PUT",
            body: JSON.stringify({ imagen: response.secure_url }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        return NextResponse.json({
            body: JSON.stringify({ message: "imagen subida", url: response.secure_url }),
            status: 200,
            headers: { "Content-Type": "application/json" },
        }, { status: 200 });
    } catch (error) {
        console.log(`Error: ${error}`)
        return NextResponse.json(error, { status: 500 });
    }
}