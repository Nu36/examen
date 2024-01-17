"use client"
import 'leaflet/dist/leaflet.css'
import { Container, Button } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home({ params }) {
    const { data: session } = useSession();
    const [pago, setPago] = useState(null);
    const [yo, setYo] = useState(null);
    const id = params.id;
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    useEffect(() => {
        const fetchData = async () => {
            if (session) {
                const pago = await fetch(`${apiUrl}/api/pagos/${id}`, { cache: 'no-store' }).then(res => res.json());
                const usuario = session.user.email
                setPago(pago);
                setYo(usuario);
            }
        };
        fetchData();
    }, [session, pago]);

    const email = session?.user?.email;

    if (!email)
        return (<h1>Debes iniciar sesión para realizar esta acción.</h1>);
    return (<>{
        pago ? <Container fluid>
            <Container id='pago'>
                <h1>{pago.concepto}</h1>
                <img src={pago.imagen} alt={pago.concepto} style={{ 'maxWidth': '20vw' }} /><br />
                
                <p>Importe del pago: {pago.importe}</p>
            </Container>

            <Container id='ubicacion'>
                <p>Código postal del pago: {pago.codPostal}</p>
                <small>Latitud: {pago.lat}. Longitud: {pago.lon}</small>
                {/* <Mapa pos={[Number(pago.lat), Number(pago.lon)]} /> */}
                <br/>
                <Botones pa={pago} usur={yo} />
            </Container>
        </Container>
            : <h1>Cargando...</h1>
    }</>
    );
}

export function Botones({ pa, usur }) {
    const handleDelete = async () => {
        const response = await fetch(`/api/pagos/${pa._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('pago eliminado con éxito');
            window.location.href = `/`;
        } else {
            console.error('Error al eliminar el pago');
        }
    };

    if (usur == pa.email) return (
        <>
            <Button onClick={handleDelete} className="btn btn-danger"> Eliminar pago </Button>
        </>
    );
}