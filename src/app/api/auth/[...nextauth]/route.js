import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ], callbacks: {
    async session(session) {
      const user = session.session.user;
      if (user) {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/loginlog`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario: user.email,
            caducidad: session.session.expires,
            token: session.token
          }),
        });
      }
      return session.session;
    },
  },
});

export { handler as GET, handler as POST };