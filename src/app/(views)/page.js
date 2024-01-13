"use client"
import Link from "next/link";
import React, { useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css'
import { useSession } from "next-auth/react";
import { Card, CardImg, CardTitle, Row, Col, Container, CardText, CardLink, CardFooter, Button } from 'react-bootstrap';
import Mapa from '@/components/Mapa';

export default function Home() {
    const { data: session } = useSession();
    const [codPostal, setCodPostal] = useState(null);
    const [eventos, setEventos] = useState([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    //ctrl+mayus+r
    useEffect(() => {
        fetchEventos();
    }, [session]);

    const fetchEventos = async () => {
        const eventos = await fetch(`${apiUrl}/api/eventos`, { cache: 'no-store' }).then(res => res.json());
        setEventos(eventos);
    };

    return (
        <div>
            <div>
                <h1>Eventos</h1>
            </div> 

            <Row className='row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 justify-content-center'>
                {
                    eventos.length === 0 ? <h4><i>🐼No hay eventos🐼</i></h4> :
                        eventos.map((evento) => (
                            <CardEvento evento={evento} />
                        ))
                }
            </Row>
            
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
            <div id='ubicacion' fluid className='ps-0'>
                <Mapa pos={[Number(36.734667), Number(-4.426399)]} eventos={eventos}/>
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

export function CardEvento({ evento }) {
    return (
        <Col key={evento._id} className='mb-3'>
            <Card className='text-center h-100'>
                <Link href={`/${evento._id}`} className='text-decoration-none flex-fill'>
                    <CardImg className='flex-fill' src={evento.imagen} alt={evento.nombre} />
                </Link>
                <Link href={`/${evento._id}`} className='text-decoration-none'>
                    <CardTitle className='text-wrap mx-2'>{evento.nombre}</CardTitle>
                </Link>
                <Link href={`/${evento._id}`} className='text-decoration-none'>
                    <CardTitle className='text-wrap mx-2'>{evento.organizador}</CardTitle>
                </Link>
            </Card>
        </Col>
    );
}