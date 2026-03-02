import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Nao autenticado" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const numero = searchParams.get("numero") || ""
    const assunto = searchParams.get("assunto") || ""
    const ano = searchParams.get("ano") || ""
    const fluxoId = searchParams.get("fluxo") || ""
    const status = searchParams.get("status") || ""
    const tipo = searchParams.get("tipo") || ""
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const skip = (page - 1) * limit

    // Build where clause
    const where: Record<string, unknown> = {}

    if (numero) {
      where.num = { contains: numero, mode: "insensitive" }
    }
    if (assunto) {
      where.assunto = { contains: assunto, mode: "insensitive" }
    }
    if (ano) {
      where.ano = ano
    }
    if (fluxoId) {
      where.id_fluxo = fluxoId
    }

    // Fetch docs with relations
    const [docs, total] = await Promise.all([
      prisma.doc.findMany({
        where,
        include: {
          fluxo: true,
          setor_doc_de_setor_idTosetor: true,
          setor_doc_para_setor_idTosetor: true,
          usuario_doc_de_usuario_idTousuario: true,
          _count: {
            select: {
              subdoc: true,
              anexo: true,
            },
          },
        },
        orderBy: { data: "desc" },
        skip,
        take: limit,
      }),
      prisma.doc.count({ where }),
    ])

    // Map to frontend format
    const processos = docs.map((doc) => ({
      id: doc.id,
      numero: `${doc.ano || ""}.${doc.mes || ""}.${doc.num || ""}`,
      tipo: doc.fluxo?.fluxo || "Documento",
      assunto: doc.assunto || "Sem assunto",
      status: "em_andamento", // Default status since schema doesn't have explicit status
      dataCriacao: doc.data || "",
      secretariaOrigemSigla: doc.setor_doc_de_setor_idTosetor?.sigla || "-",
      secretariaOrigemNome: doc.setor_doc_de_setor_idTosetor?.setor || "-",
      interessado: doc.setor_doc_para_setor_idTosetor?.setor || "-",
      criadorNome: doc.usuario_doc_de_usuario_idTousuario?.nome || "-",
      totalDocumentos: doc._count.subdoc,
      totalAnexos: doc._count.anexo,
      conteudo: doc.conteudo || "",
      codigo: doc.codigo || "",
      fluxoNome: doc.fluxo?.fluxo || "",
    }))

    return NextResponse.json({
      processos,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("[v0] Error fetching processos:", error)
    return NextResponse.json({ error: "Erro ao buscar processos" }, { status: 500 })
  }
}
