import { getServerAuthSession } from "~/server/auth";
import Navbar from "../_components/Navbar";
import Footer from "~/_components/Footer";

interface ListingsLayoutProps {
  children?: React.ReactNode;
}

export default async function ListingsLayout({
  children,
}: ListingsLayoutProps) {
  const session = await getServerAuthSession();

  return (
    <div className="">
      <Navbar session={session} />
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
      <div className="p-8">
        <Footer />
      </div>
    </div>
  );
}
