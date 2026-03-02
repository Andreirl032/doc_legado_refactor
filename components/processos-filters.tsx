"use client"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SlidersHorizontal, Search, Loader2 } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface ProcessosFiltersProps {
  onSearch: (filters: FilterValues) => void
  loading: boolean
}

export interface FilterValues {
  numero: string
  assunto: string
  ano: string
  fluxo: string
  status: string
  tipo: string
}

export function ProcessosFilters({ onSearch, loading }: ProcessosFiltersProps) {
  const [showFilters, setShowFilters] = useState(true)
  const [filters, setFilters] = useState<FilterValues>({
    numero: "",
    assunto: "",
    ano: "",
    fluxo: "",
    status: "",
    tipo: "",
  })

  const { data: fluxosData } = useSWR("/api/fluxos", fetcher, {
    revalidateOnFocus: false,
  })

  const fluxos = fluxosData || []

  const handleChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = useCallback(() => {
    onSearch(filters)
  }, [filters, onSearch])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-sidebar-primary">Filtros</h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-xs"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          {showFilters ? "Ocultar" : "Mostrar"}
        </Button>
      </div>

      {showFilters && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-4">
          {/* Top row: 4 text/select fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">N do Processo</Label>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border-2 border-sidebar-primary shrink-0" />
                <Input
                  placeholder="Buscar pelo numero do processo"
                  value={filters.numero}
                  onChange={(e) => handleChange("numero", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-9 bg-input border-border text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Assunto</Label>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border-2 border-sidebar-primary shrink-0" />
                <Input
                  placeholder="Buscar pelo assunto"
                  value={filters.assunto}
                  onChange={(e) => handleChange("assunto", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-9 bg-input border-border text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Ano</Label>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border-2 border-sidebar-primary shrink-0" />
                <Input
                  placeholder="Buscar pelo ano"
                  value={filters.ano}
                  onChange={(e) => handleChange("ano", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-9 bg-input border-border text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">Fluxo</Label>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full border-2 border-sidebar-primary shrink-0" />
                <Select
                  value={filters.fluxo}
                  onValueChange={(v) => handleChange("fluxo", v)}
                >
                  <SelectTrigger className="h-9 bg-input border-border text-sm text-foreground">
                    <SelectValue placeholder="Selecione uma opcao" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">Todos os Fluxos</SelectItem>
                    {fluxos.map((f: { id: string; fluxo: string }) => (
                      <SelectItem key={f.id} value={f.id}>
                        {f.fluxo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Bottom row: dropdowns + search */}
          <div className="flex flex-wrap items-end gap-3">
            <Select
              value={filters.status}
              onValueChange={(v) => handleChange("status", v)}
            >
              <SelectTrigger className="w-[160px] h-9 bg-input border-border text-sm text-foreground">
                <SelectValue placeholder="Todos os Status" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluido">Concluido</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="arquivado">Arquivado</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.tipo}
              onValueChange={(v) => handleChange("tipo", v)}
            >
              <SelectTrigger className="w-[160px] h-9 bg-input border-border text-sm text-foreground">
                <SelectValue placeholder="Todos os Tipos" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="oficio">Oficio</SelectItem>
                <SelectItem value="memorando">Memorando</SelectItem>
                <SelectItem value="requerimento">Requerimento</SelectItem>
                <SelectItem value="parecer">Parecer</SelectItem>
                <SelectItem value="portaria">Portaria</SelectItem>
                <SelectItem value="nota_tecnica">Nota Tecnica</SelectItem>
                <SelectItem value="despacho">Despacho</SelectItem>
                <SelectItem value="decreto">Decreto</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto">
              <Button
                onClick={handleSearch}
                disabled={loading}
                className="h-9 gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground text-sm font-semibold px-5"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Buscar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
