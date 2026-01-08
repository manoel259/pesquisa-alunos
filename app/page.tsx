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

      {busca && (
        <table className="border-collapse border w-full mt-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Nome</th>
              <th className="border p-2 text-left">Sala</th>
              <th className="border p-2 text-left">Professor</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="border p-2 text-center">
                  Carregando...
                </td>
              </tr>
            ) : alunos.length > 0 ? (
              alunos.map((aluno, index) => (
                <tr key={index}>
                  <td className="border p-2">{aluno.nome}</td>
                  <td className="border p-2">{aluno.sala}</td>
                  <td className="border p-2">{aluno.professor}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="border p-2 text-center">
                  Nenhum aluno encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </main>
  )
}
