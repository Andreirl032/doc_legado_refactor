"use client"

import { useState, useCallback, useMemo } from "react"
import { ProcessTable } from "@/components/process-table"
import { ProcessTreeViewer } from "@/components/process-tree-viewer"
import { ProcessosFilters, type FilterValues } from "@/components/processos-filters"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button" // <- Adicionado
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react" // <- Ícones de navegação
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function FluxosPage() {
  const [selectedProcessoId, setSelectedProcessoId] = useState<string | null>(null)
  const [viewerOpen, setViewerOpen] = useState(false)
  
  // 1. Estados separados para filtros e página
  const [filters, setFilters] = useState<FilterValues>({
  numero: "",
  assunto: "",
  ano: "",
  fluxo: "all",
  status: "",
  tipo: ""
})
  const [page, setPage] = useState(1)

  // 2. Construção dinâmica da URL baseada nos filtros e na página atual
  const url = useMemo(() => {
    const params = new URLSearchParams()

    if (filters.numero) params.set("numero", filters.numero)
    if (filters.assunto) params.set("assunto", filters.assunto)
    if (filters.ano) params.set("ano", filters.ano)
    if (filters.fluxo && filters.fluxo !== "all") params.set("fluxo", filters.fluxo)
    
    // Adiciona a página atual aos parâmetros
    params.set("page", page.toString())

    return `/api/processos?${params.toString()}`
  }, [filters, page])

  const { data, isLoading } = useSWR(
    url,
    fetcher,
    { revalidateOnFocus: false }
  )
  
  const { data: fluxosData } = useSWR(
    "/api/fluxos",
    fetcher
  )

  const processos = data?.processos || []
  const total = data?.total || 0
  const totalPages = data?.totalPages || 1
  const currentPage = data?.page || 1
  const fluxos = fluxosData || []

  // 3. Atualiza os filtros e volta para a página 1 ao fazer uma nova busca
  const handleSearch = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters)
    setPage(1) 
  }, [])

  const handleViewProcess = (processo: { id: string }) => {
    setSelectedProcessoId(processo.id)
    setViewerOpen(true)
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <span>Painel</span>
        <span>{">"}</span>
        <span className="text-foreground font-medium">Processos</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Processos</h1>
          <p className="text-sm text-muted-foreground mt-1">Consulte e acompanhe todos os processos registrados</p>
        </div>
        <Badge className="bg-sidebar-primary text-sidebar-primary-foreground text-sm px-3 py-1">
          {isLoading ? "..." : `${total} processos`}
        </Badge>
      </div>

      {/* Filters */}
      <ProcessosFilters onSearch={handleSearch} loading={isLoading} />

      {/* Table & Pagination */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-sidebar-primary" />
        </div>
      ) : (
        <>
          <ProcessTable processos={processos} onViewProcess={handleViewProcess} />
          
          {/* Controles de Paginação */}
          {totalPages > 0 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Página <span className="font-medium text-foreground">{currentPage}</span> de <span className="font-medium text-foreground">{totalPages}</span>
              </p>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1 || isLoading}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || isLoading}
                >
                  Próxima
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Tree Viewer Sheet */}
      <ProcessTreeViewer
        processoId={selectedProcessoId}
        open={viewerOpen}
        onOpenChange={setViewerOpen}
      />
    </div>
  )
}