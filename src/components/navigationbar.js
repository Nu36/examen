"use client"
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";

const NavigationBar = () => {
    const { data: session } = useSession();
    return (
        <Navbar bg="light" expand="lg" sticky='top' className='mb-3'>
            <Container fluid>
                <Navbar.Brand>
                    <Nav.Link href="/" passhref="true">
                        Inicio
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/nuevoEvento" passhref="true">
                            Crear otro evento
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <div>
                { session?.user ?  
                <div>
                    <div className="flex gap-x-2 items-center">
                        <p>
                            {session.user.name} {session.user.email}
                        </p>
                        <img
                            src={session.user.image}
                            alt=""
                            className="w-10 h-10 rounded-full cursor-pointer"
                        />
                        <Button
                            onClick={async () => {await signOut({ callbackUrl: "/",})}}> Cerrar sesi&oacute;n
                        </Button>
                    </div>
                </div>
                 : 
                <div>
                    <Button onClick={() => {signIn("google", { callbackUrl: "/",}).then(() => {
                        console.log("Sesión iniciada correctamente")
                    })}} className="bg-sky-400 px-3 py-2 rounded"> Iniciar sesi&oacute;n </Button>
                </div>
                }
            </div>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;