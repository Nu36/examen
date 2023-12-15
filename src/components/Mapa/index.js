"use client"
import dynamic from "next/dynamic";

const Mapa = dynamic(() => import('./mapa'), {
    ssr: false
});

export default Mapa;