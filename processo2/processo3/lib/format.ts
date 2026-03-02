export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    em_andamento: "Em Andamento",
    concluido: "Concluido",
    pendente: "Pendente",
    arquivado: "Arquivado",
  }
  return map[status] || status
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    em_andamento: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    concluido: "border-sky-500/40 text-sky-400 bg-sky-500/10",
    pendente: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    arquivado: "border-zinc-500/40 text-zinc-400 bg-zinc-500/10",
  }
  return map[status] || ""
}

export function getDocTypeLabel(tipo: string): string {
  const map: Record<string, string> = {
    oficio: "Oficio",
    memorando: "Memorando",
    requerimento: "Requerimento",
    parecer: "Parecer",
    portaria: "Portaria",
    nota_tecnica: "Nota Tecnica",
    despacho: "Despacho",
    decreto: "Decreto",
  }
  return map[tipo] || tipo
}

export function getDocTypeColor(tipo: string): string {
  const map: Record<string, string> = {
    oficio: "border-sky-500/40 text-sky-400 bg-sky-500/10",
    memorando: "border-indigo-500/40 text-indigo-400 bg-indigo-500/10",
    requerimento: "border-amber-500/40 text-amber-400 bg-amber-500/10",
    parecer: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    portaria: "border-rose-500/40 text-rose-400 bg-rose-500/10",
    nota_tecnica: "border-teal-500/40 text-teal-400 bg-teal-500/10",
    despacho: "border-orange-500/40 text-orange-400 bg-orange-500/10",
    decreto: "border-red-500/40 text-red-400 bg-red-500/10",
  }
  return map[tipo] || ""
}
