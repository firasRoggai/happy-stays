// UI components / style
import "~/styles/globals.css";
import "@uploadthing/react/styles.css";
import { Toaster } from "~/_components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import { TRPCReactProvider } from "~/trpc/react";
import { GeistSans } from "geist/font/sans";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Happy Stays",
  description: "Making Every Stay a Happy Stay",
  icons: [{ rel: "icon", url: "/bglogo.png" }],
  openGraph: {
    title: "Happy Stays",
    description: "Making Every Stay a Happy Stay",
    type: "website",
    images: "opengraph-image.png",
    locale: "en_US",
    url: "https://happy-0-1.vercel.app/",
    siteName: "Happy Stays",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <TRPCReactProvider>
          {/*          <Navbar session={session} />*/}
          <NextTopLoader showSpinner={false} />
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
