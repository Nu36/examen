"use client"
import Link from "next/link";
import { useState } from "react";
import { Button } from "react-bootstrap"
import { Image } from "next/image"

import { signIn, useSession, signOut } from "next-auth/react";

export default function Home() {
    const [nombre, setNombre] = useState('');
    const [lugar, setLugar] = useState('');
    const [file, setFile] = useState('');
    const { data: session } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(nombre);
        console.log(lugar)

        const responseimg = await fetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({ image: file }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const response = await fetch(`/api/eventos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            lugar: lugar,
            organizador: session.user.email,
            imagen: responseimg.secure_url,
        }),
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
            Crea un nuevo evento.
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
            <button type="submit" variant="primary" >Crear</button>
        </form>
        </div>
    );
}