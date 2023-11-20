import Main from "@/components/Main/Main";
import Loading from "@/app/loading";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ForFitness",
  description: "Seu gerenciador de academia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Suspense fallback={<Loading />}>
          <Main>{children}</Main>
        </Suspense>
      </body>
    </html>
  );
}
