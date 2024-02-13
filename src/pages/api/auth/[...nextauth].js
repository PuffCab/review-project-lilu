import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const cookies = {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: "none",
      path: "/",
      domain: "http://localhost:3000",
      secure: true,
    },
  },
  callbackUrl: {
    name: `next-auth.callback-url`,
  },
  csrfToken: {
    name: "next-auth.csrf-token",
  },
};

export const authOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export default handler;
