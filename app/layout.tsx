import './globals.css'

export const metadata = {
  title: 'Pesquisa de Alunos',
  description: 'Sistema de pesquisa de alunos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
