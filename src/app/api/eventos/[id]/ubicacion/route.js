import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const apiUrlEvento = "http://localhost:3000";
    try {
        const idEvento = params.id;
        let response = await fetch(`${apiUrlEvento}/api/eventos/${idEvento}`, { cache: 'no-store' });
        if (!response.ok)
            return NextResponse.json({ error: 'No se ha podido obtener los datos del evento especificado.' });
        const evento = await response.json();
        //const atributos = ["lat", "lon", "display_name"];
        response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${evento.codPostal}&countrycodes=es`);

        const data = await response.json();

        if (!data)
            return NextResponse.json({ error: 'No se han podido extraer los datos.' });

        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
