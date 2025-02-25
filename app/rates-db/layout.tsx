// app/rates-db/layout.tsx (Server Component)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rates Database | Nwfg",
  icons: {
    icon: "https://nuevo-logo.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}