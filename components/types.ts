export interface Anexo {
  id: string
  nome: string
}

export interface Assinatura {
  id: string
  signatario: string
  data: string
  hora: string
  tipo: string
  arquivo: string
}

export interface SubDoc {
  id: string
  numero: string
  conteudo: string
  codigo: string
  data: string
  hora: string
  setorOrigem: string
  criador: string
  anexos: Anexo[]
  assinaturas: Assinatura[]
}

export interface ProcessoTree {
  id: string
  numero: string
  tipo: string
  assunto: string
  conteudo: string
  codigo: string
  data: string
  hora: string
  setorOrigem: string
  setorOrigemNome: string
  setorDestino: string
  criador: string
  anexos: Anexo[]
  assinaturas: Assinatura[]
  subdocs: SubDoc[]
  assuntos: string[]
}

export interface ProcessTreeViewerProps {
  processoId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}
