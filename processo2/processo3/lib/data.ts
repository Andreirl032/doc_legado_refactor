import type {
  User,
  Secretaria,
  Processo,
  Documento,
  Tramitacao,
  Anexo,
  NotaInterna,
  DashboardStats,
  ProcessoResumo,
} from "./types"

export const secretarias: Secretaria[] = [
  { id: "sec-1", nome: "Secretaria Municipal de Administracao", sigla: "SEMAD", responsavel: "Carlos Mendes" },
  { id: "sec-2", nome: "Secretaria Municipal de Educacao", sigla: "SEMED", responsavel: "Ana Paula Silva" },
  { id: "sec-3", nome: "Secretaria Municipal de Saude", sigla: "SEMUS", responsavel: "Dr. Roberto Lima" },
  { id: "sec-4", nome: "Secretaria Municipal de Infraestrutura", sigla: "SEMINFRA", responsavel: "Eng. Marcos Oliveira" },
  { id: "sec-5", nome: "Secretaria Municipal de Financas", sigla: "SEMFIN", responsavel: "Dra. Lucia Costa" },
]

export const currentUser: User = {
  id: "user-1",
  name: "SEMIT",
  email: "semit@saoluis.ma.gov.br",
  role: "gestor",
  secretariaId: "sec-1",
  secretariaNome: "Secretaria Municipal de Administracao",
  avatar: undefined,
}

export const processos: Processo[] = [
  {
    id: "proc-1",
    numero: "2026.001.00234",
    tipo: "oficio",
    assunto: "Solicitacao de Recursos para Manutencao Predial",
    status: "em_andamento",
    dataCriacao: "2026-01-15T10:30:00Z",
    dataAtualizacao: "2026-02-08T14:20:00Z",
    secretariaOrigemId: "sec-1",
    secretariaOrigemNome: "Secretaria Municipal de Administracao",
    secretariaOrigemSigla: "SEMAD",
    criadorId: "user-1",
    criadorNome: "Maria Fernanda Alves",
    interessado: "Diretoria de Patrimonio",
    observacao: "Solicitacao urgente para manutencao do predio sede.",
    totalDocumentos: 4,
    totalTramitacoes: 3,
  },
  {
    id: "proc-2",
    numero: "2026.001.00198",
    tipo: "memorando",
    assunto: "Alteracao de Horario de Expediente - Carnaval 2026",
    status: "concluido",
    dataCriacao: "2026-01-10T09:00:00Z",
    dataAtualizacao: "2026-01-28T16:45:00Z",
    secretariaOrigemId: "sec-1",
    secretariaOrigemNome: "Secretaria Municipal de Administracao",
    secretariaOrigemSigla: "SEMAD",
    criadorId: "user-1",
    criadorNome: "Maria Fernanda Alves",
    interessado: "Todas as Secretarias",
    totalDocumentos: 2,
    totalTramitacoes: 5,
  },
  {
    id: "proc-3",
    numero: "2026.002.00412",
    tipo: "requerimento",
    assunto: "Contratacao de Professores Temporarios",
    status: "pendente",
    dataCriacao: "2026-02-01T11:15:00Z",
    dataAtualizacao: "2026-02-09T10:00:00Z",
    secretariaOrigemId: "sec-2",
    secretariaOrigemNome: "Secretaria Municipal de Educacao",
    secretariaOrigemSigla: "SEMED",
    criadorId: "user-3",
    criadorNome: "Pedro Henrique Santos",
    interessado: "Coord. de Ensino Fundamental",
    totalDocumentos: 6,
    totalTramitacoes: 2,
  },
  {
    id: "proc-4",
    numero: "2026.003.00089",
    tipo: "parecer",
    assunto: "Aquisicao de Equipamentos Hospitalares",
    status: "em_andamento",
    dataCriacao: "2026-01-20T08:45:00Z",
    dataAtualizacao: "2026-02-07T11:30:00Z",
    secretariaOrigemId: "sec-3",
    secretariaOrigemNome: "Secretaria Municipal de Saude",
    secretariaOrigemSigla: "SEMUS",
    criadorId: "user-4",
    criadorNome: "Juliana Marques",
    interessado: "Hospital Municipal",
    totalDocumentos: 8,
    totalTramitacoes: 4,
  },
  {
    id: "proc-5",
    numero: "2026.004.00156",
    tipo: "portaria",
    assunto: "Nomeacao de Comissao de Licitacao",
    status: "concluido",
    dataCriacao: "2026-01-05T14:00:00Z",
    dataAtualizacao: "2026-01-18T17:00:00Z",
    secretariaOrigemId: "sec-4",
    secretariaOrigemNome: "Secretaria Municipal de Infraestrutura",
    secretariaOrigemSigla: "SEMINFRA",
    criadorId: "user-5",
    criadorNome: "Ricardo Gomes",
    interessado: "Departamento de Compras",
    totalDocumentos: 3,
    totalTramitacoes: 6,
  },
  {
    id: "proc-6",
    numero: "2026.005.00321",
    tipo: "nota_tecnica",
    assunto: "Analise de Impacto Orcamentario - Reajuste Salarial",
    status: "em_andamento",
    dataCriacao: "2026-02-03T10:00:00Z",
    dataAtualizacao: "2026-02-10T09:15:00Z",
    secretariaOrigemId: "sec-5",
    secretariaOrigemNome: "Secretaria Municipal de Financas",
    secretariaOrigemSigla: "SEMFIN",
    criadorId: "user-6",
    criadorNome: "Fernanda Costa",
    interessado: "Gabinete do Prefeito",
    totalDocumentos: 5,
    totalTramitacoes: 3,
  },
  {
    id: "proc-7",
    numero: "2026.001.00267",
    tipo: "despacho",
    assunto: "Aprovacao de Ferias Coletivas - Dezembro 2026",
    status: "arquivado",
    dataCriacao: "2025-11-10T13:00:00Z",
    dataAtualizacao: "2025-12-20T16:30:00Z",
    secretariaOrigemId: "sec-1",
    secretariaOrigemNome: "Secretaria Municipal de Administracao",
    secretariaOrigemSigla: "SEMAD",
    criadorId: "user-1",
    criadorNome: "Maria Fernanda Alves",
    interessado: "Recursos Humanos",
    totalDocumentos: 2,
    totalTramitacoes: 4,
  },
  {
    id: "proc-8",
    numero: "2026.001.00290",
    tipo: "decreto",
    assunto: "Regulamentacao do Teletrabalho no Servico Publico",
    status: "pendente",
    dataCriacao: "2026-02-05T09:30:00Z",
    dataAtualizacao: "2026-02-11T08:00:00Z",
    secretariaOrigemId: "sec-1",
    secretariaOrigemNome: "Secretaria Municipal de Administracao",
    secretariaOrigemSigla: "SEMAD",
    criadorId: "user-2",
    criadorNome: "Joao Carlos Ribeiro",
    interessado: "Todas as Secretarias",
    totalDocumentos: 7,
    totalTramitacoes: 1,
  },
]

export const documentosProc1: Documento[] = [
  {
    id: "doc-1",
    processoId: "proc-1",
    titulo: "Oficio n. 234/2026 - Solicitacao de Recursos",
    tipo: "oficio",
    conteudo: "Senhor Secretario,\n\nVenho, por meio deste oficio, solicitar a alocacao de recursos financeiros no montante de R$ 150.000,00 (cento e cinquenta mil reais) para a realizacao de servicos de manutencao predial nas dependencias da sede desta Secretaria.\n\nAs instalacoes apresentam necessidade urgente de reparos na parte eletrica, hidraulica e na cobertura do edificio, conforme laudo tecnico anexo.\n\nSolicito a analise e providencias cabiveis.\n\nAtenciosamente,\nMaria Fernanda Alves\nDiretora de Administracao",
    dataCriacao: "2026-01-15T10:30:00Z",
    criadoPor: "Maria Fernanda Alves",
    assinaturas: [
      { id: "sig-1", documentoId: "doc-1", signatario: "Maria Fernanda Alves", cargo: "Diretora de Administracao", dataAssinatura: "2026-01-15T10:35:00Z", tipo: "digital", valida: true },
      { id: "sig-2", documentoId: "doc-1", signatario: "Carlos Mendes", cargo: "Secretario Municipal de Administracao", dataAssinatura: "2026-01-15T14:00:00Z", tipo: "digital", valida: true },
    ],
    anexos: [
      { id: "anx-1", documentoId: "doc-1", nome: "Laudo_Tecnico_Manutencao.pdf", tipo: "application/pdf", tamanho: "2.4 MB", dataUpload: "2026-01-15T10:28:00Z" },
      { id: "anx-2", documentoId: "doc-1", nome: "Fotos_Instalacoes.zip", tipo: "application/zip", tamanho: "15.7 MB", dataUpload: "2026-01-15T10:29:00Z" },
    ],
  },
  {
    id: "doc-2",
    processoId: "proc-1",
    titulo: "Parecer Tecnico n. 045/2026",
    tipo: "parecer",
    conteudo: "Parecer referente a solicitacao de recursos para manutencao predial.\n\nApos vistoria realizada in loco, confirma-se a necessidade dos reparos solicitados. O orcamento apresentado esta compativel com os valores praticados no mercado.\n\nParecer favoravel a aprovacao dos recursos solicitados.",
    dataCriacao: "2026-01-22T15:00:00Z",
    criadoPor: "Eng. Paulo Roberto",
    assinaturas: [
      { id: "sig-3", documentoId: "doc-2", signatario: "Eng. Paulo Roberto", cargo: "Engenheiro Civil - SEMINFRA", dataAssinatura: "2026-01-22T15:10:00Z", tipo: "digital", valida: true },
    ],
    anexos: [
      { id: "anx-3", documentoId: "doc-2", nome: "Planilha_Orcamento.xlsx", tipo: "application/xlsx", tamanho: "485 KB", dataUpload: "2026-01-22T15:05:00Z" },
    ],
  },
  {
    id: "doc-3",
    processoId: "proc-1",
    titulo: "Despacho n. 112/2026 - Aprovacao Parcial",
    tipo: "despacho",
    conteudo: "Aprovo parcialmente a solicitacao, autorizando a liberacao de R$ 100.000,00 para inicio imediato dos servicos mais urgentes (parte eletrica e hidraulica).\n\nA analise do restante dos recursos ficara condicionada a disponibilidade orcamentaria do proximo trimestre.",
    dataCriacao: "2026-02-01T11:00:00Z",
    criadoPor: "Dra. Lucia Costa",
    assinaturas: [
      { id: "sig-4", documentoId: "doc-3", signatario: "Dra. Lucia Costa", cargo: "Secretaria Municipal de Financas", dataAssinatura: "2026-02-01T11:15:00Z", tipo: "digital", valida: true },
    ],
    anexos: [],
  },
  {
    id: "doc-4",
    processoId: "proc-1",
    titulo: "Memorando n. 078/2026 - Ciencia e Providencias",
    tipo: "memorando",
    conteudo: "Para conhecimento e providencias cabiveis quanto ao inicio dos servicos de manutencao predial aprovados.",
    dataCriacao: "2026-02-05T09:00:00Z",
    criadoPor: "Maria Fernanda Alves",
    assinaturas: [
      { id: "sig-5", documentoId: "doc-4", signatario: "Maria Fernanda Alves", cargo: "Diretora de Administracao", dataAssinatura: "2026-02-05T09:10:00Z", tipo: "digital", valida: true },
    ],
    anexos: [],
  },
]

export const tramitacoesProc1: Tramitacao[] = [
  {
    id: "tram-1",
    processoId: "proc-1",
    setorOrigemNome: "Secretaria Municipal de Administracao",
    setorOrigemSigla: "SEMAD",
    setorDestinoNome: "Secretaria Municipal de Infraestrutura",
    setorDestinoSigla: "SEMINFRA",
    dataEnvio: "2026-01-16T08:00:00Z",
    dataRecebimento: "2026-01-16T10:30:00Z",
    despacho: "Encaminho para parecer tecnico sobre viabilidade e orcamento.",
    responsavel: "Maria Fernanda Alves",
    status: "recebido",
  },
  {
    id: "tram-2",
    processoId: "proc-1",
    setorOrigemNome: "Secretaria Municipal de Infraestrutura",
    setorOrigemSigla: "SEMINFRA",
    setorDestinoNome: "Secretaria Municipal de Financas",
    setorDestinoSigla: "SEMFIN",
    dataEnvio: "2026-01-23T09:00:00Z",
    dataRecebimento: "2026-01-23T14:00:00Z",
    despacho: "Parecer favoravel emitido. Encaminho para analise financeira.",
    responsavel: "Eng. Paulo Roberto",
    status: "recebido",
  },
  {
    id: "tram-3",
    processoId: "proc-1",
    setorOrigemNome: "Secretaria Municipal de Financas",
    setorOrigemSigla: "SEMFIN",
    setorDestinoNome: "Secretaria Municipal de Administracao",
    setorDestinoSigla: "SEMAD",
    dataEnvio: "2026-02-01T14:00:00Z",
    dataRecebimento: "2026-02-01T16:00:00Z",
    despacho: "Aprovacao parcial concedida. Recursos liberados conforme despacho.",
    responsavel: "Dra. Lucia Costa",
    status: "recebido",
  },
]

export const notasProc1: NotaInterna[] = [
  {
    id: "nota-1",
    processoId: "proc-1",
    autor: "Maria Fernanda Alves",
    conteudo: "Verificar com o departamento de compras se ja existe ata de registro de precos para servicos de manutencao predial.",
    dataCriacao: "2026-01-15T11:00:00Z",
    privada: false,
  },
  {
    id: "nota-2",
    processoId: "proc-1",
    autor: "Carlos Mendes",
    conteudo: "Priorizar a manutencao eletrica. Houve relato de curto-circuito no 3o andar na semana passada.",
    dataCriacao: "2026-01-17T09:30:00Z",
    privada: true,
  },
  {
    id: "nota-3",
    processoId: "proc-1",
    autor: "Maria Fernanda Alves",
    conteudo: "Recursos parciais liberados. Iniciar processo de contratacao dos servicos urgentes.",
    dataCriacao: "2026-02-02T10:00:00Z",
    privada: false,
  },
]

export function getProcessoById(id: string): Processo | undefined {
  return processos.find((p) => p.id === id)
}

export function getDocumentosByProcesso(processoId: string): Documento[] {
  if (processoId === "proc-1") return documentosProc1
  return []
}

export function getTramitacoesByProcesso(processoId: string): Tramitacao[] {
  if (processoId === "proc-1") return tramitacoesProc1
  return []
}

export function getNotasByProcesso(processoId: string): NotaInterna[] {
  if (processoId === "proc-1") return notasProc1
  return []
}

export function getDashboardStats(): DashboardStats {
  return {
    totalProcessos: processos.length,
    emAndamento: processos.filter((p) => p.status === "em_andamento").length,
    concluidos: processos.filter((p) => p.status === "concluido").length,
    pendentes: processos.filter((p) => p.status === "pendente").length,
    processosRecentes: processos.slice(0, 5).map(toResumo),
    tramitacoesRecentes: tramitacoesProc1.slice(0, 3),
  }
}

function toResumo(p: Processo): ProcessoResumo {
  return {
    id: p.id,
    numero: p.numero,
    tipo: p.tipo,
    assunto: p.assunto,
    status: p.status,
    dataCriacao: p.dataCriacao,
    secretariaOrigemSigla: p.secretariaOrigemSigla,
    interessado: p.interessado,
    totalDocumentos: p.totalDocumentos,
    totalTramitacoes: p.totalTramitacoes,
  }
}
