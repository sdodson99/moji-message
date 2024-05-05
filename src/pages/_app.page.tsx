import '@/shared/styles/globals.css';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        defaultTitle="The Fun Way to Create a Message - Moji Message"
        description="Encode a message with emojis to spice up your delivery and make your message stick."
        openGraph={{
          siteName: 'Moji Message',
          type: 'website',
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
