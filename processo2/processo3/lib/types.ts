export interface User {
  id: string
  name: string
  email: string
  role: string
  secretariaId: string
  secretariaNome: string
  avatar?: string
}

export interface Secretaria {
  id: string
  nome: string
  sigla: string
  responsavel: string
}

export interface Processo {
  id: string
  numero: string
  tipo: string
  assunto: string
  status: string
  dataCriacao: string
  dataAtualizacao: string
  secretariaOrigemId: string
  secretariaOrigemNome: string
  secretariaOrigemSigla: string
  criadorId: string
  criadorNome: string
  interessado: string
  observacao?: string
  totalDocumentos: number
  totalTramitacoes: number
}

export interface Assinatura {
  id: string
  documentoId: string
  signatario: string
  cargo: string
  dataAssinatura: string
  tipo: string
  valida: boolean
}

export interface Anexo {
  id: string
  documentoId: string
  nome: string
  tipo: string
  tamanho: string
  dataUpload: string
}

export interface Documento {
  id: string
  processoId: string
  titulo: string
  tipo: string
  conteudo: string
  dataCriacao: string
  criadoPor: string
  assinaturas: Assinatura[]
  anexos: Anexo[]
}

export interface Tramitacao {
  id: string
  processoId: string
  setorOrigemNome: string
  setorOrigemSigla: string
  setorDestinoNome: string
  setorDestinoSigla: string
  dataEnvio: string
  dataRecebimento?: string
  despacho: string
  responsavel: string
  status: string
}

export interface NotaInterna {
  id: string
  processoId: string
  autor: string
  conteudo: string
  dataCriacao: string
  privada: boolean
}

export interface DashboardStats {
  totalProcessos: number
  emAndamento: number
  concluidos: number
  pendentes: number
  processosRecentes: ProcessoResumo[]
  tramitacoesRecentes: Tramitacao[]
}

export interface ProcessoResumo {
  id: string
  numero: string
  tipo: string
  assunto: string
  status: string
  dataCriacao: string
  secretariaOrigemSigla: string
  interessado: string
  totalDocumentos: number
  totalTramitacoes: number
}
