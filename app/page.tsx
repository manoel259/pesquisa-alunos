import AlunosClient from './AlunosClient'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pesquisa de Alunos</h1>
      <AlunosClient />
    </main>
  )
}


