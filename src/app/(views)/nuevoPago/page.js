"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
    const [concepto, setConcepto] = useState('');
    const [codPostal, setCodPostal] = useState('');
    const [direccion, setDireccion] = useState('');
    const [importe, setImporte] = useState('');
    const [file, setFile] = useState('');
    const { data: session } = useSession();

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const ubi = await fetch(`${apiUrl}/api/${codPostal}/ubicacion`, { cache: 'no-store' })

        let ubica = await ubi.json()

        console.log(ubica[0].lat)

        const response = await fetch(`${apiUrl}/api/pagos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            concepto: concepto,
            importe: importe,
            direccion: direccion,
            email: session.user.email,
            codPostal: codPostal,
            lat: ubica[0].lat,
            lon: ubica[0].lon,
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

        if (responseimg.ok) {
            console.log('Pago creado con éxito');
        } else {
            console.error('Error al crear el pago');
        }
    };

    const email = session?.user?.email;

    if (!email)
        return (<h1>Debes iniciar sesión para realizar esta acción.</h1>);
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label>
            Crea un nuevo pago.
            <br/>
            Concepto:
            <br/>
            <input
                type="text"
                value={concepto}
                onChange={(e) => setConcepto(e.target.value)}
            />
            <br/>
            Importe:
            <br/>
            <input
                type="text"
                value={importe}
                onChange={(e) => setImporte(e.target.value)}
            />
            <br />
            Dirección:
            <br/>
            <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
            />
            <br />
            Código postal:
            <br/>
            <label>
            <input
                type="text"
                value={codPostal}
                onChange={(e) => setCodPostal(e.target.value)}
            /> <abbr title="required" aria-label="required">*</abbr>
            <br />
            </label>
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
            <button type="submit" variant="primary" >Crear</button>
        </form>
        </div>
    );
}