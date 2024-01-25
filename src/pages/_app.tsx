import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MyNavbar from "@/components/MyNavbar";
import MyFooter from "@/components/MyFooter";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <MyNavbar />
      <Component {...pageProps} />
      <MyFooter />
    </div>
  );
}
