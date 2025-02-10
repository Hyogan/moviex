import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";


export const metadata: Metadata = {
  title: "MovieX - Stream Your Favorite Movies",
  description: "Upload or watch the latest movies and TV shows online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
    <body
        className= 'min-h-screen'
    >
    <AuthProvider>
    {children}
    </AuthProvider>
    </body>
    </html>
  );
}
