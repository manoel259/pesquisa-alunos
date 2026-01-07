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
  const [erro, setErro] = useState<string | null>(null)

  async function pesquisar() {
    setErro(null)

    if (!busca.trim()) {
      setAlunos([])
      return
    }

    setLoading(true)

    const { data, error } = await supabase
      .from('alunos')
      .select('nome, sala, professor')
      .ilike('nome', `%${busca}%`)

    if (error) {
      setErro('Erro ao buscar alunos')
      setAlunos([])
    } else {
      setAlunos(data ?? [])
    }

    setLoading(false)
  }

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">Pesquisa de Alunos</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Digite o nome do aluno"
        />
        <button
          className="border px-4"
          onClick={pesquisar}
          disabled={loading}
        >
          Pesquisar
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

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
