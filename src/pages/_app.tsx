import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MyNavbar from "@/components/MyNavbar";
import MyFooter from "@/components/MyFooter";
import { SessionProvider } from "next-auth/react";

import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;

  // console.log("session :>> ", session);

  return (
    <div>
      <SessionProvider session={session}>
        <MyNavbar />
        <Component {...pageProps} />
        <MyFooter />
      </SessionProvider>
    </div>
  );
}
