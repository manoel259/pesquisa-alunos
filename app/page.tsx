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
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* CARD CENTRAL */}
      <div className="bg-white w-full max-w-3xl p-8 rounded-xl shadow-md">

        {/* LOGO ABA — AQUI */}
        <img
          src="/logo.png"
          alt="ABA Logo"
          className="h-16 mx-auto mb-6"
        />

        {/* TÍTULO */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Procura Sala
        </h1>

        {/* BUSCA */}
        <div className="flex gap-2 mb-6">
          <input
            className="border border-gray-300 rounded px-3 py-2 flex-1"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite o nome do aluno"
          />
          <button
            className="bg-blue-600 text-white px-5 rounded hover:bg-blue-700"
            onClick={pesquisar}
            disabled={loading}
          >
            Pesquisar
          </button>
        </div>

        {loading && <p className="text-center">Carregando...</p>}
        {erro && <p className="text-red-600 text-center">{erro}</p>}

        {/* TABELA */}
        {alunos.length > 0 && (
          <table className="w-full border-collapse mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Nome</th>
                <th className="border p-2 text-left">Sala</th>
                <th className="border p-2 text-left">Professor</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{aluno.nome}</td>
                  <td className="border p-2">{aluno.sala}</td>
                  <td className="border p-2">{aluno.professor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </main>
  )
}
