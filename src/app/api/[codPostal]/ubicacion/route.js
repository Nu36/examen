import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    
    try {
        const codPostalEventos = params.codPostal;

        let response;
        //const atributos = ["lat", "lon", "display_name"];
        response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${codPostalEventos}&countrycodes=es`);

        const data = await response.json();

        if (!data) return NextResponse.json({ error: 'No se han podido extraer los datos.' });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
