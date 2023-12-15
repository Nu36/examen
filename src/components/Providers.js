"use client"
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

// export function CheckSession({children}) {
//     const { data: session } = useSession();
//     if (session?.user) return (
//         <>{children}</>
//     );
//     else return (
//         <Container className="d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
//             <Button onClick={async () => {await signIn("google", { callbackUrl: "/",})}} className="mx-auto bg-sky-400 px-3 py-2 rounded"> Iniciar sesi&oacute;n</Button>
//         </Container>
//     );
// }
