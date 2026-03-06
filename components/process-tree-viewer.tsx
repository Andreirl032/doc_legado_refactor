"use client"

import { useState, useMemo } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  ChevronDown,
  FolderOpen,
  Folder,
  FileText,
  Paperclip,
  File,
  ChevronsUpDown,
  ChevronsDownUp,
  FileSpreadsheet,
  FileArchive,
  FileImage,
  Download,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import useSWR from "swr"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import "@react-pdf/renderer"
import { pdf } from "@react-pdf/renderer"
import {SimplePdfTemplate,ProcessoPdfTemplate} from "../components/PdfTemplates"
import { Anexo, ProcessoTree, ProcessTreeViewerProps, SubDoc } from "./types"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function getFileIcon(nome: string) {
  const ext = nome.split(".").pop()?.toLowerCase()
  switch (ext) {
    case "pdf":
      return <FileText className="h-4 w-4 text-red-400" />
    case "xlsx":
    case "xls":
    case "csv":
      return <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
    case "zip":
    case "rar":
    case "7z":
      return <FileArchive className="h-4 w-4 text-amber-400" />
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
      return <FileImage className="h-4 w-4 text-sky-400" />
    case "docx":
    case "doc":
      return <FileText className="h-4 w-4 text-sky-400" />
    default:
      return <File className="h-4 w-4 text-muted-foreground" />
  }
}

// Função auxiliar para baixar o blob
const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

async function generatePdf(title: string, content: string) {
  const doc = <SimplePdfTemplate title={title} content={content} />
  const blob = await pdf(doc).toBlob()
  downloadBlob(blob, `${title.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 50)}.pdf`)
}

async function generateProcessoPdf(tree: ProcessoTree) {
  const doc = <ProcessoPdfTemplate tree={tree} />
  const blob = await pdf(doc).toBlob()
  downloadBlob(blob, `Processo_${tree.numero.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`)
}


export function ProcessTreeViewer({ processoId, open, onOpenChange }: ProcessTreeViewerProps) {
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set())
  const [processExpanded, setProcessExpanded] = useState(true)
  const [generatingPdf, setGeneratingPdf] = useState<string | null>(null)

  const { data: tree, isLoading } = useSWR<ProcessoTree>(
    processoId && open ? `/api/processos/${processoId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        if (data?.subdocs) {
          setExpandedDocs(new Set(data.subdocs.map((d) => d.id)))
          setProcessExpanded(true)
        }
      },
    }
  )

  const totalAnexos = useMemo(() => {
    if (!tree) return 0
    return (tree.anexos?.length || 0) + (tree.subdocs?.reduce((sum, s) => sum + (s.anexos?.length || 0), 0) || 0)
  }, [tree])

  const toggleDoc = (docId: string) => {
    setExpandedDocs((prev) => {
      const next = new Set(prev)
      if (next.has(docId)) {
        next.delete(docId)
      } else {
        next.add(docId)
      }
      return next
    })
  }

  const expandAll = () => {
    if (tree?.subdocs) {
      setExpandedDocs(new Set(tree.subdocs.map((d) => d.id)))
    }
    setProcessExpanded(true)
  }

  const collapseAll = () => {
    setExpandedDocs(new Set())
    setProcessExpanded(false)
  }

  const handleGenerateProcessoPdf = async () => {
    if (!tree) return
    setGeneratingPdf("processo")
    try {
      await generateProcessoPdf(tree)
    } finally {
      setGeneratingPdf(null)
    }
  }

  const handleGenerateSubdocPdf = async (subdoc: SubDoc) => {
    setGeneratingPdf(subdoc.id)
    try {
      await generatePdf(
        `${subdoc.codigo || subdoc.numero || subdoc.id} - ${subdoc.setorOrigem}`,
        subdoc.conteudo
      )
    } finally {
      setGeneratingPdf(null)
    }
  }

  const handleGenerateAnexoPdf = async (anexo: Anexo) => {
    setGeneratingPdf(anexo.id) 
    try {
      await generatePdf(anexo.nome, `Arquivo: ${anexo.nome}\nID: ${anexo.id}`)
    } finally {
      setGeneratingPdf(null)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[600px] lg:max-w-[700px] p-0 flex flex-col bg-background border-l border-border"
      >
        <SheetTitle>Detalhes do processo</SheetTitle>
        {isLoading || !tree ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-sidebar-primary" />
          </div>
        ) : (
          <>
            {/* Header */}
            <SheetHeader className="px-5 pt-5 pb-4 border-b border-border space-y-3">
              <div className="flex items-start justify-between gap-4 pr-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <SheetTitle className="text-base font-bold font-mono text-foreground">
                      {tree.numero}
                    </SheetTitle>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-sky-500/40 text-sky-400 bg-sky-500/10">
                      {tree.tipo}
                    </Badge>
                  </div>
                  <SheetDescription className="text-sm text-foreground font-medium">
                    {tree.assunto}
                  </SheetDescription>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  <span className="font-semibold text-foreground">{tree.subdocs?.length || 0}</span>
                  <span>Documentos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Paperclip className="h-3.5 w-3.5" />
                  <span className="font-semibold text-foreground">{totalAnexos}</span>
                  <span>Anexos</span>
                </div>
                <span className="text-muted-foreground">Origem: {tree.setorOrigem}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={expandAll} className="text-xs gap-1.5 h-7">
                  <ChevronsUpDown className="h-3 w-3" />
                  Expandir tudo
                </Button>
                <Button variant="outline" size="sm" onClick={collapseAll} className="text-xs gap-1.5 h-7">
                  <ChevronsDownUp className="h-3 w-3" />
                  Recolher tudo
                </Button>
                <div className="ml-auto">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleGenerateProcessoPdf}
                          disabled={generatingPdf === "processo"}
                          className="text-xs gap-1.5 h-7"
                        >
                          {generatingPdf === "processo" ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Download className="h-3 w-3" />
                          )}
                          Gerar PDF Completo
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Gerar PDF de todo o processo</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </SheetHeader>

            {/* Tree Content */}
            <ScrollArea className="flex-1 overflow-auto">
              <TooltipProvider>
                <div className="p-5">
                  {/* Process root node */}
                  <div className="select-none">
                    {/* Process level */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setProcessExpanded(!processExpanded)}
                        className="flex items-center gap-2 flex-1 text-left group hover:bg-muted/50 rounded-md px-2 py-1.5 transition-colors"
                      >
                        {processExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                        {processExpanded ? (
                          <FolderOpen className="h-4 w-4 text-amber-400 shrink-0" />
                        ) : (
                          <Folder className="h-4 w-4 text-amber-400 shrink-0" />
                        )}
                        <span className="text-sm font-semibold text-foreground truncate">
                          {tree.numero} - PROCESSO
                        </span>
                      </button>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 shrink-0 text-muted-foreground hover:text-sidebar-primary"
                            onClick={handleGenerateProcessoPdf}
                            disabled={generatingPdf === "processo"}
                          >
                            {generatingPdf === "processo" ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Download className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Gerar PDF da pasta</TooltipContent>
                      </Tooltip>
                    </div>

                    {/* Process-level anexos */}
                    {processExpanded && tree.anexos && tree.anexos.length > 0 && (
                      <div className="ml-4 border-l border-border/50">
                        {tree.anexos.map((anexo) => (
                          <AnexoNode
                            key={anexo.id}
                            anexo={anexo}
                            onGeneratePdf={() => handleGenerateAnexoPdf(anexo)}
                            generating={generatingPdf === anexo.id}
                          />
                        ))}
                      </div>
                    )}

                    {/* Subdocuments level */}
                    {processExpanded && (
                      <div className="ml-4 border-l border-border/50">
                        {(!tree.subdocs || tree.subdocs.length === 0) ? (
                          <div className="ml-4 py-3 text-xs text-muted-foreground italic">
                            Nenhum documento vinculado a este processo.
                          </div>
                        ) : (
                          tree.subdocs.map((subdoc, docIndex) => (
                            <SubDocNode
                              key={subdoc.id}
                              subdoc={subdoc}
                              expanded={expandedDocs.has(subdoc.id)}
                              onToggle={() => toggleDoc(subdoc.id)}
                              onGeneratePdf={() => handleGenerateSubdocPdf(subdoc)}
                              onGenerateAnexoPdf={handleGenerateAnexoPdf}
                              generatingPdf={generatingPdf}
                              isLast={docIndex === tree.subdocs.length - 1}
                            />
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </TooltipProvider>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

function SubDocNode({
  subdoc,
  expanded,
  onToggle,
  onGeneratePdf,
  onGenerateAnexoPdf,
  generatingPdf,
  isLast,
}: {
  subdoc: SubDoc
  expanded: boolean
  onToggle: () => void
  onGeneratePdf: () => void
  onGenerateAnexoPdf: (anexo: Anexo) => void
  generatingPdf: string | null
  isLast: boolean
}) {
  const hasAnexos = subdoc.anexos && subdoc.anexos.length > 0

  return (
    <div className="relative">
      {/* Connector line */}
      <div className="absolute left-0 top-0 w-4 h-5 border-b border-border/50" />

      <div className="ml-4">
        {/* SubDoc header */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggle}
            className="flex items-start gap-2 flex-1 text-left group hover:bg-muted/50 rounded-md px-2 py-1.5 transition-colors"
          >
            <div className="mt-0.5 shrink-0">
              {hasAnexos ? (
                expanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )
              ) : (
                <div className="w-4" />
              )}
            </div>
            {expanded && hasAnexos ? (
              <FolderOpen className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
            ) : (
              <FileText className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
            )}
            <div className="min-w-0 flex-1">
              <span className="text-sm font-medium text-foreground leading-tight block truncate">
                {subdoc.codigo || subdoc.numero || subdoc.id}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-muted-foreground">{subdoc.criador}</span>
                <span className="text-[11px] text-muted-foreground">-</span>
                <span className="text-[11px] text-muted-foreground">{subdoc.data} {subdoc.hora}</span>
                {hasAnexos && (
                  <>
                    <span className="text-[11px] text-muted-foreground">-</span>
                    <span className="text-[11px] text-muted-foreground">
                      {subdoc.anexos.length} anexo{subdoc.anexos.length > 1 ? "s" : ""}
                    </span>
                  </>
                )}
              </div>
            </div>
          </button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 text-muted-foreground hover:text-sidebar-primary"
                onClick={onGeneratePdf}
                disabled={generatingPdf === subdoc.id}
              >
                {generatingPdf === subdoc.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Download className="h-3.5 w-3.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Gerar PDF</TooltipContent>
          </Tooltip>
        </div>

        {/* Anexos level */}
        {expanded && hasAnexos && (
          <div className="ml-4 border-l border-border/50">
            {subdoc.anexos.map((anexo) => (
              <AnexoNode
                key={anexo.id}
                anexo={anexo}
                onGeneratePdf={() => onGenerateAnexoPdf(anexo)}
                generating={generatingPdf === anexo.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function AnexoNode({
  anexo,
  onGeneratePdf,
  generating,
}: {
  anexo: Anexo
  onGeneratePdf: () => void
  generating: boolean
}) {
  return (
    <div className="relative">
      {/* Connector line */}
      <div className="absolute left-0 top-0 w-4 h-4 border-b border-border/50" />

      <div className="ml-4">
        <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted/50 rounded-md transition-colors group">
          {getFileIcon(anexo.nome)}
          <span className="text-[13px] text-foreground group-hover:text-sidebar-primary transition-colors truncate flex-1 min-w-0">
            {anexo.nome}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 text-muted-foreground hover:text-sidebar-primary opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={onGeneratePdf}
                disabled={generating}
              >
                {generating ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Download className="h-3 w-3" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Gerar PDF</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
