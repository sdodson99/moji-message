import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5QBF922');`}
        </Script>

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Mitr:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* Google Tag Manager */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5QBF922" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />

        {/* Kofi Widget */}
        {/* https://stackoverflow.com/questions/60615358/trying-to-run-ko-fi-widget-inside-a-react-component-running-script-commands-i */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<script src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"></script>`,
          }}
        ></div>
        <div
          dangerouslySetInnerHTML={{
            __html: `<script>kofiWidgetOverlay.draw('sdodson', {
              type: 'floating-chat',
              'floating-chat.donateButton.text': 'Donate',
              'floating-chat.donateButton.background-color': '#d9534f',
              'floating-chat.donateButton.text-color': '#fff',
              });</script>`,
          }}
        ></div>
      </body>
    </Html>
  );
}
