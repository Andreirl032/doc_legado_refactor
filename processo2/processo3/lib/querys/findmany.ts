import { prisma } from "../prisma";

export const findFluxos = () => prisma.fluxo.findMany();
export const findAssuntos = () => prisma.assunto.findMany();
export const findContatos = () => prisma.contato.findMany();
export const findSetores = () => prisma.setor.findMany();
export const findUsuarios = () => prisma.usuario.findMany();
export const findDocs = () => prisma.doc.findMany();
export const findSubdocs = () => prisma.subdoc.findMany();
export const findAnexos = () => prisma.anexo.findMany();
export const findAssinaturas = () => prisma.assinatura.findMany();
export const findDocMetas = () => prisma.doc_meta.findMany();
export const findDocSetores = () => prisma.doc_setor.findMany();
export const findDocAssuntos = () => prisma.doc_assunto.findMany();
export const findUsuarioSetores = () => prisma.usuario_setor.findMany();