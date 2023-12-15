"use client"
import Link from "next/link";
import { use, useState } from "react";
import { Image } from "next/image"
import 'leaflet/dist/leaflet.css'
import { Container, Button } from 'react-bootstrap';
import Mapa from '@/components/Mapa';

export default function Home() {
    const [codPostal, setCodPostal] = useState(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    //ctrl+mayus+r
    return (
        <div>
            <div>
                <h1>Eventos</h1>
            </div> 
            
            <form onSubmit={async (e) => {
                e.preventDefault();

                let res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${codPostal}&countrycodes=es`);
                const result= await res.json();

                const response = await fetch(`${apiUrl}/api/eventos/?lat=${result.lat},lon=${result.lon}`)

                if (response.ok) {
                console.log('Evento enviada con éxito');
                } else {
                console.error('Error al enviar el evento');
                }
                }}>
                <label>
                    Introduzca un código postal:
                    <input
                        type="text"
                        value={codPostal}
                        onChange={(e) => setCodPostal(e.target.value)}
                    />
                </label>
                <button type="submit" variant="primary"> Enviar</button>
            </form>
            
                {/* <FiltroLineas lineas={lineas} linea={params.linea} sentido={params.sentido} /> 
                <FiltroNombre />
                <FiltroDireccion /> */}
                <div id='ubicacion' fluid className='ps-0'>
                    <Mapa pos={[Number(36.734667), Number(-4.426399)]}/>
                </div>
           
            <br/>
            <div>
                <Link href="/api/loginlog">Ver log de usuario</Link>
            </div>

            <div>
                <Link href="/nuevoEvento">Crear otro evento</Link>
            </div>
        </div>
    );
}