import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Formulário #INCLUDE <MUDANÇA>',
  description: 'Coletando sugestões em busca da melhoria',
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico', // Caminho padrão
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
