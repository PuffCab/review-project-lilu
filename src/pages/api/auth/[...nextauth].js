import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // I can add more providers here
  ],
});

// You'll need to configure environment variables for your providers. For Google, for example, you'll set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env.local file.
