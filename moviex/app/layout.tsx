import type { Metadata } from "next";
import "./globals.css";


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
    {children}
    </body>
    </html>
  );
}
