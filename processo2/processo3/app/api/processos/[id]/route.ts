import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Nao autenticado" }, { status: 401 })
    }

    const { id } = await params

    const doc = await prisma.doc.findUnique({
      where: { id },
      include: {
        fluxo: true,
        setor_doc_de_setor_idTosetor: true,
        setor_doc_para_setor_idTosetor: true,
        usuario_doc_de_usuario_idTousuario: true,
        anexo: true,
        subdoc: {
          include: {
            anexo: true,
            setor_subdoc_de_setor_idTosetor: true,
            usuario_subdoc_de_usuario_idTousuario: true,
            assinatura: {
              include: {
                usuario: true,
                contato: true,
              },
            },
          },
          orderBy: { data: "asc" },
        },
        assinatura: {
          include: {
            usuario: true,
            contato: true,
          },
        },
        doc_assunto: {
          include: {
            assunto: true,
          },
        },
      },
    })

    if (!doc) {
      return NextResponse.json({ error: "Processo nao encontrado" }, { status: 404 })
    }

    // Build tree structure
    const tree = {
      id: doc.id,
      numero: `${doc.ano || ""}.${doc.mes || ""}.${doc.num || ""}`,
      tipo: doc.fluxo?.fluxo || "Documento",
      assunto: doc.assunto || "Sem assunto",
      conteudo: doc.conteudo || "",
      codigo: doc.codigo || "",
      data: doc.data || "",
      hora: doc.hora || "",
      setorOrigem: doc.setor_doc_de_setor_idTosetor?.sigla || "-",
      setorOrigemNome: doc.setor_doc_de_setor_idTosetor?.setor || "-",
      setorDestino: doc.setor_doc_para_setor_idTosetor?.sigla || "-",
      criador: doc.usuario_doc_de_usuario_idTousuario?.nome || "-",
      anexos: doc.anexo.map((a) => ({
        id: a.id_anexo,
        nome: a.anexo || "Arquivo sem nome",
      })),
      assinaturas: doc.assinatura.map((a) => ({
        id: a.id,
        signatario: a.usuario?.nome || a.contato?.nome || "-",
        data: a.data || "",
        hora: a.hora || "",
        tipo: a.tipo || "",
        arquivo: a.arquivo_assinado || "",
      })),
      subdocs: doc.subdoc.map((s) => ({
        id: s.id,
        numero: `${s.ano || ""}.${s.mes || ""}.${s.num || ""}`,
        conteudo: s.conteudo || "",
        codigo: s.codigo || "",
        data: s.data || "",
        hora: s.hora || "",
        setorOrigem: s.setor_subdoc_de_setor_idTosetor?.sigla || "-",
        criador: s.usuario_subdoc_de_usuario_idTousuario?.nome || "-",
        anexos: s.anexo.map((a) => ({
          id: a.id_anexo,
          nome: a.anexo || "Arquivo sem nome",
        })),
        assinaturas: s.assinatura.map((a) => ({
          id: a.id,
          signatario: a.usuario?.nome || a.contato?.nome || "-",
          data: a.data || "",
          hora: a.hora || "",
          tipo: a.tipo || "",
          arquivo: a.arquivo_assinado || "",
        })),
      })),
      assuntos: doc.doc_assunto.map((da) => da.assunto?.assunto || "").filter(Boolean),
    }

    return NextResponse.json(tree)
  } catch (error) {
    console.error("[v0] Error fetching processo:", error)
    return NextResponse.json({ error: "Erro ao buscar processo" }, { status: 500 })
  }
}
