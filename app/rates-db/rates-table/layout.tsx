import type { Metadata } from 'next'
import '../../styles/rates-table.css'

export const metadata: Metadata = {
  title: 'Rates Table | NWFG',
  description: 'Rates Table for NWFG',
  keywords: ['rates', 'table', 'nwfg'],
  icons: {
   icon: "https://rates-nwpc.s3.us-east-2.amazonaws.com/rtrete.png",
   },
   };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
