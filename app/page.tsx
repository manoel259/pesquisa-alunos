import { createClient } from '@supabase/supabase-js'

type Aluno = {
  nome: string
  sala: string
  professor: string
}

export const dynamic = 'force-dynamic'

export default async function Home() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  const { data: alunos } = await supabase
    .from('alunos')
    .select('nome, sala, professor')

  return (
    <main className="p-8">
      <h1>Pesquisa de Alunos</h1>

      <ul>
        {alunos?.map((a, i) => (
          <li key={i}>
            {a.nome} – {a.sala} – {a.professor}
          </li>
        ))}
      </ul>
    </main>
  )
}
