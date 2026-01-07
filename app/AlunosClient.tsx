'use client'

import { useState } from 'react'

type Aluno = {
  nome: string
  sala: string
  professor: string
}

export default function AlunosClient({
  alunosIniciais
}: {
  alunosIniciais: Aluno[]
}) {
  const [busca, setBusca] = useState('')
  const [alunos, setAlunos] = useState(alunosIniciais)

  function filtrar(valor: string) {
    setBusca(valor)

    const filtrados = alunosIniciais.filter((a) =>
      a.nome.toLowerCase().includes(valor.toLowerCase())
    )

    setAlunos(filtrados)
  }

  return (
    <>
      <input
        className="border p-2 mb-4 w-64"
        placeholder="Digite o nome do aluno"
        value={busca}
        onChange={(e) => filtrar(e.target.value)}
      />

      <ul>
        {alunos.map((a, i) => (
          <li key={i}>
            {a.nome} – {a.sala} – {a.professor}
          </li>
        ))}
      </ul>
    </>
  )
}
