import "@/shared/styles/globals.css";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        defaultTitle="Moji Message"
        description="Encode a message with emojis!"
        openGraph={{
          siteName: "Moji Message",
          type: "website",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
