import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header";
import { AuthProvider } from "./contexts/AuthContext";
export const metadata: Metadata = {
  title: "Case",
  description: "Case project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='relative'>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
