import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ], callbacks: {
        async jwt({ token, trigger }) {
            if (trigger === "signIn") token.signin = "hola";
            return token;
        },
        async session({ session, token }) {
            if (token.signin === "hola") {
                token.signin = null;
                const user = session.user;
                await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/loginlog`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        usuario: user.email,
                        caducidad: session.expires,
                        token: token
                    }),
                });
            }
            return session;
        },
    },
}

const handler = NextAuth(
    authOptions
);

export { handler as GET, handler as POST };