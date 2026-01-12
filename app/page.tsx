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
  const [pesquisado, setPesquisado] = useState(false)

  async function pesquisar() {
    setErro(null)
    setPesquisado(true)

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
    <main className="min-h-screen flex justify-center items-start pt-16">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Pesquisa de Alunos
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            className="border rounded px-3 py-2 flex-1"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite o nome do aluno"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={pesquisar}
            disabled={loading}
          >
            Pesquisar
          </button>
        </div>

        {erro && <p className="text-red-600 mb-4">{erro}</p>}

        {pesquisado && (
          <table className="w-full border-collapse mt-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Nome</th>
                <th className="border p-3 text-left">Sala</th>
                <th className="border p-3 text-left">Professor</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="border p-3 text-center">
                    Carregando...
                  </td>
                </tr>
              ) : alunos.length > 0 ? (
                alunos.map((aluno, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="border p-3 font-medium">{aluno.nome}</td>
                    <td className="border p-3">{aluno.sala}</td>
                    <td className="border p-3">{aluno.professor}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="border p-3 text-center">
                    Nenhum aluno encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </main>
  )
}
