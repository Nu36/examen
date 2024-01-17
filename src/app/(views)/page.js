"use client"
import Link from "next/link";
import React, { useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css'
import { useSession } from "next-auth/react";
import { Card, CardImg, CardTitle, Row, Col, Container, CardText, CardLink, CardFooter, Button } from 'react-bootstrap';
import Mapa from '@/components/Mapa';

export default function Home() {
    const { data: session } = useSession();
    const [pagos, setPagos] = useState([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    //ctrl+mayus+r
    useEffect(() => {
        fetchPagos();
    }, [session]);

    const fetchPagos = async () => {
        const pagos = await fetch(`${apiUrl}/api/pagos`, { cache: 'no-store' }).then(res => res.json());
        setPagos(pagos);
    };

    const email = session?.user?.email;

    if (!email)
        return (<h1>Debes iniciar sesión para realizar esta acción.</h1>);
    return (
        <div>
            <div>
                <h1>Pagos</h1>
            </div> 

            <Row className='row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 justify-content-center'>
                {
                    pagos.length === 0 ? <h4><i>🐼No hay pagos🐼</i></h4> :
                        pagos.map((pago) => (
                            <CardPago pago={pago} />
                        ))
                }
            </Row>
            
            <div id='ubicacion' fluid className='ps-0'>
                <Mapa pos={[Number(36.734667), Number(-4.426399)]} pagos={pagos}/>
            </div>
            <br/>
            <div>
                <Link href="/nuevPago">Crear otro pago</Link>
            </div>
        </div>
    );
}

export function CardPago({ pago }) {
    return (
        <Col key={pago._id} className='mb-3'>
            <Card className='text-center h-100'>
                <Link href={`/${pago._id}`} className='text-decoration-none flex-fill'>
                    <CardImg className='flex-fill' src={pago.imagen} alt={pago.concepto} />
                </Link>
                <Link href={`/${pago._id}`} className='text-decoration-none'>
                    <CardTitle className='text-wrap mx-2'>{pago.concepto}</CardTitle>
                </Link>
                <Link href={`/${pago._id}`} className='text-decoration-none'>
                    <CardTitle className='text-wrap mx-2'>{pago.importe}</CardTitle>
                </Link>
            </Card>
        </Col>
    );
}