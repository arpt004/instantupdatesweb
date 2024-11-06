import { Inter } from "next/font/google";
import Head from "next/head";
import LayoutComponent from "@/components/JainKart/LayoutComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jain's 🛒Kart",
  description: "A one stop for Jain Items",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body className={inter.className}>
        <LayoutComponent children={children} />
      </body>
    </html>
  );
}
