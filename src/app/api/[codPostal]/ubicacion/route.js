import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(req, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ "error": "Unauthorized" }, { status: 401 });

    try {
        const codPostalPagos = params.codPostal;

        let response;
        //const atributos = ["lat", "lon", "display_name"];
        response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${codPostalPagos}&countrycodes=es`);

        const data = await response.json();

        if (!data) return NextResponse.json({ error: 'No se han podido extraer los datos.' });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
