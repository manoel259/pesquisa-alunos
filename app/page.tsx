import { createClient } from '@supabase/supabase-js'
import AlunosClient from './AlunosClient'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  const { data: alunos } = await supabase
    .from('alunos')
    .select('nome, sala, professor')

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pesquisa de Alunos</h1>
      <AlunosClient alunosIniciais={alunos ?? []} />
    </main>
  )
}
