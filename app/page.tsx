'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'

type Aluno = {
  nome: string
  sala: string
  professor: string
}

export default function Home() {
  const [busca, setBusca] = useState('')
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [loading, setLoading] = useState(false)

  async function pesquisar() {
    setLoading(true)

    const { data } = await supabase
      .from('alunos')
      .select('nome, sala, professor')
      .ilike('nome', `%${busca}%`)

    setAlunos(data ?? [])
    setLoading(false)
  }

  return (
    <main className="p-8">
      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Nome do aluno"
      />
      <button onClick={pesquisar}>Pesquisar</button>

      <ul>
        {alunos.map((a, i) => (
          <li key={i}>
            {a.nome} – {a.sala} – {a.professor}
          </li>
        ))}
      </ul>
    </main>
  )
}
