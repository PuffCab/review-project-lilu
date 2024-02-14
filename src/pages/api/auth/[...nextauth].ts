import NextAuth, { CookiesOptions, Session }  from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnection from "../../../utils/dbConnection";
import { verifyPassword } from "../../../utils/passwordServices";
import { JWT } from 'next-auth/jwt';
import { SessionUser } from "@/types/next-auth";






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
      authorize: async (credentials) => {
        const client = await dbConnection();

        // const db = client.db("lilu2");
        const user = await client
          .collection("users")
          .findOne({ email: credentials!.email });

        if (
          user &&
          (await verifyPassword(credentials!.password, user.password))
        ) {
          return { name: user.name, email: user.email, image:user._id };
        } else {
          return null;
        }
      },

      // async authorize(credentials) {
      //   const { email, password } = credentials;

      //   const urlencoded = new URLSearchParams();
      //   urlencoded.append("email", email);
      //   urlencoded.append("password", password);

      //   const requestOptions = {
      //     method: "POST",
      //     body: urlencoded,
      //   };

      //   const response = await fetch("api/login", requestOptions);

      //   if (response.ok) {
      //     const data = await response.json();
      //     console.log(" data from nextAuth :>> ", data);
      //     if (data.token) {
      //       console.log("data.user :>> ", data.user);
      //       return {
      //         ...data,
      //         email: email,
      //         name: data.user._id,
      //         user: data.user,
      //       };
      //     }
      //   }
      //   return null;
      // },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {

    async jwt({token, user}: { token: JWT; user:SessionUser }) {
      console.log('token in JWT :>> ', token);
      console.log('user in JWT:>> ', user);


      return {...token, user};
    },

      async session({session, user,}:{session:Session, user:SessionUser}) {
        console.log('session :>> ', session);
  
    return session;
      },
  
      cookies: cookies,
    },
//     async signIn({ user, account, profile }) {
//         const dbClient = await clientPromise;
//         const db = dbClient.db("e-learning");
//         const existingUser = await db.collection("users").findOne({ email: user.email });

//       if (existingUser) {
// await db.collection("users").updateOne(
//     { email: user.email },
//     { $set: { lastLogin: new Date() } } 
// );
// return true;
// } else {
// await db.collection("users").insertOne({
//     name: user.name,
//     email: user.email,
//     image: user.image, 
//     lastLogin: new Date(),
// });
// return true;
// }
//     }
}


const handler = NextAuth(authOptions);

export default handler;
