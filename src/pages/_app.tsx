import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MyNavbar from "@/components/MyNavbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <MyNavbar />
      <Component {...pageProps} />;{" "}
    </div>
  );
}
