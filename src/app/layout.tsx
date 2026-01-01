// UI components / style
import "@uploadthing/react/styles.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "./_components/ui/toaster";
import { api } from "~/trpc/server";

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
    url: "https://happy-stays.vercel.app/",
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
