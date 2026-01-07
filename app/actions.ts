'use server'

import { createClient } from '@supabase/supabase-js'

export async function buscarAlunos(nome: string) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  const { data } = await supabase
    .from('alunos')
    .select('nome, sala, professor')
    .ilike('nome', `%${nome}%`)

  return data ?? []
}
