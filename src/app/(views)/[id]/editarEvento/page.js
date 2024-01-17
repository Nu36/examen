"use client"
import React, { useEffect, useState} from 'react';
import { signIn, useSession, signOut } from "next-auth/react";

export default function Home({ params }) {
    const [nombre, setNombre] = useState('');
    const [lugar, setLugar] = useState('');
    const [file, setFile] = useState('');
    const [evento, setEvento] = useState('');
    const { data: session } = useSession();

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    useEffect(() => {
        fetchEvento();
    }, [session]);

    const fetchEvento = async () => {
        const evento = await fetch(`${apiUrl}/api/eventos/${params.id}`, { cache: 'no-store' }).then(res => res.json());
        setEvento(evento);   
        setLugar(evento.lugar);
        setNombre(evento.nombre)
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const ubi = await fetch(`${apiUrl}/api/${lugar}/ubicacion`, { cache: 'no-store' }).then(res => res.json());

        const response = await fetch(`${apiUrl}/api/eventos/${params.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            lugar: lugar,
            organizador: session.user.email,
            lat: ubi[0].lat,
            lon: ubi[0].lon,
        }),
        });

        const responsej = await response.json()
        
        const responseimg = await fetch(`${apiUrl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({ 
                image: file,
                nombre : responsej._id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
        console.log('Evento creado con éxito');
        } else {
        console.error('Error al crear el evento');
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>
            Edita este evento.
            <br/>
            Nombre:
            <br/>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <br/>
            Código postal:
            <br/>
            <input
                type="text"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
            />
            <br />
            <input
                type="file"
                onChange={(e) => {
                    //setFile(e.target.files[0]);
                    const file = e.target.files[0];
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        setFile(reader.result);
                    };

                    reader.readAsDataURL(file);
                }}
            />
            </label>
            <br />
            <button type="submit" variant="primary">Editar</button>
        </form>
        </div>
    );
}