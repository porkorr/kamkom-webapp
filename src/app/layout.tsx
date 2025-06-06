import type { Metadata, Viewport } from "next";
import AppProvider from "@/providers/AppProvider";
import "@/styles/main.scss";

export const metadata: Metadata = {
  title: "Kamkom",
  description: "Kamkom",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
