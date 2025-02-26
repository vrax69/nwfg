// app/rates-db/layout.tsx (Server Component)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rates Database | Nwfg",
  icons: {
    icon: "https://rates-nwpc.s3.us-east-2.amazonaws.com/rtrete.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}