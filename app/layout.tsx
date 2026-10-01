import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weddingku | 2026 Agenda",
  description: "An invitation to the 2026 Weddingku events in Jakarta.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
