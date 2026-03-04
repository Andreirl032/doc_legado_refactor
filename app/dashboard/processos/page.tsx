"use client"

import { useState, useCallback } from "react"
import { ProcessTable } from "@/components/process-table"
import { ProcessTreeViewer } from "@/components/process-tree-viewer"
import { ProcessosFilters, type FilterValues } from "@/components/processos-filters"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function FluxosPage() {
  const [selectedProcessoId, setSelectedProcessoId] = useState<string | null>(null)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [url, setUrl] = useState("/api/processos")


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
  const fluxos = fluxosData || []


const handleSearch = useCallback((filters: FilterValues) => {
  const params = new URLSearchParams()

  if (filters.numero) params.set("numero", filters.numero)
  if (filters.assunto) params.set("assunto", filters.assunto)
  if (filters.ano) params.set("ano", filters.ano)
  if (filters.fluxo && filters.fluxo !== "all") params.set("fluxo", filters.fluxo)

  const queryString = params.toString()

  setUrl(`/api/processos${queryString ? `?${queryString}` : ""}`)
}, [])



  const handleViewProcess = (processo: { id: string }) => {
    setSelectedProcessoId(processo.id)
    setViewerOpen(true)
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <span
        // className="hover:text-foreground cursor-pointer transition-colors"
        >Painel</span>
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

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-sidebar-primary" />
        </div>
      ) : (
        <ProcessTable processos={processos} onViewProcess={handleViewProcess} />
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
