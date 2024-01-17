"use client"
import 'leaflet/dist/leaflet.css'
import { Container, Button } from 'react-bootstrap';
import Mapa from '@/components/Mapa';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home({ params }) {
    const { data: session } = useSession();
    const [evento, setevento] = useState(null);
    const [yo, setYo] = useState(null);
    const id = params.id;
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                const evento = await fetch(`${apiUrl}/api/eventos/${id}`, { cache: 'no-store' }).then(res => res.json());
                const usuario = session.user.email
                setevento(evento);
                setYo(usuario);
            }
        };
        fetchData();
    }, [session, evento]);

    const email = session?.user?.email;

    if (!email)
        return (<h1>Debes iniciar sesión para realizar esta acción.</h1>);
    return (<>{
        evento ? <Container fluid>
            <Container id='evento'>
                <h1>{evento.nombre}</h1>
                <img src={evento.imagen} alt={evento.nombre} style={{ 'maxWidth': '20vw' }} /><br />
                
                <p>Fecha del evento: {evento.timestamp}</p>
            </Container>

            <Container id='ubicacion'>
                <p>Código postal del evento: {evento.lugar}</p>
                <small>Latitud: {evento.lat}. Longitud: {evento.lon}</small>
                {/* <Mapa pos={[Number(evento.lat), Number(evento.lon)]} /> */}
                <br/>
                <Botones eve={evento} usur={yo} />
            </Container>
        </Container>
            : <h1>Cargando...</h1>
    }</>
    );
}

export function Botones({ eve, usur }) {
    const handleDelete = async () => {
        const response = await fetch(`/api/eventos/${eve._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('evento eliminado con éxito');
            window.location.href = `/`;
        } else {
            console.error('Error al eliminar el evento');
        }
    };
    <Button onClick={handleDelete} className="btn btn-danger"> Eliminar evento </Button>

    if (usur == eve.organizador) return (
        <>
            <Link href={`/${eve._id}/editarEvento`} className="btn btn-primary"> Modificar evento </Link>
            <Button onClick={handleDelete} className="btn btn-danger"> Eliminar evento </Button>
        </>
    );
}