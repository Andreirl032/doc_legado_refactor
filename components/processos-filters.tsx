"use client"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
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

  const [useNumero, setUseNumero] = useState(false)
  const [useAssunto, setUseAssunto] = useState(false)
  const [useAno, setUseAno] = useState(false)

  const { data: fluxosData } = useSWR("/api/fluxos", fetcher, {
    revalidateOnFocus: false,
  })

  const fluxos = fluxosData || []

  const handleChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = useCallback(() => {
    const finalFilters: FilterValues = {
      numero: useNumero ? filters.numero : "",
      assunto: useAssunto ? filters.assunto : "",
      ano: useAno ? filters.ano : "",
      fluxo: filters.fluxo, // sempre ativo
      status: filters.status,
      tipo: filters.tipo,
    }

    onSearch(finalFilters)
  }, [filters, onSearch, useNumero, useAssunto, useAno])

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
        <div className="rounded-lg border border-border/60 bg-card p-4 space-y-4 shadow-sm">

          {/* GRID SUPERIOR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Nº Processo */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">
                N do Processo
              </Label>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={useNumero}
                  onCheckedChange={(v) => setUseNumero(!!v)}
                  className="border-white/10"
                />
                <Input
                  placeholder="Buscar pelo numero do processo"
                  value={filters.numero}
                  onChange={(e) => handleChange("numero", e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={!useNumero}
                  className="h-9 bg-input border-white/10 text-sm"
                />
              </div>
            </div>

            {/* Assunto */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">
                Assunto
              </Label>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={useAssunto}
                  onCheckedChange={(v) => setUseAssunto(!!v)}
                  className="border-white/10"
                />
                <Input
                  placeholder="Buscar pelo assunto"
                  value={filters.assunto}
                  onChange={(e) => handleChange("assunto", e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={!useAssunto}
                  className="h-9 bg-input border-white/10 text-sm"
                />
              </div>
            </div>

            {/* Ano */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-foreground">
                Ano
              </Label>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={useAno}
                  onCheckedChange={(v) => setUseAno(!!v)}
                  className="border-white/10"
                />
                <Input
                  placeholder="Buscar pelo ano"
                  value={filters.ano}
                  onChange={(e) => handleChange("ano", e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={!useAno}
                  className="h-9 bg-input border-white/10 text-sm"
                />
              </div>
            </div>
          </div>

          {/* LINHA INFERIOR */}
          <div className="flex flex-wrap items-end gap-3">

            {/* Fluxo */}
            <Select
              value={filters.fluxo}
              onValueChange={(v) => handleChange("fluxo", v)}
            >
              <SelectTrigger className="w-[160px] h-9 border-white/10">
                <SelectValue placeholder="Todos os Fluxos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Fluxos</SelectItem>
                {fluxos.map((f: { id: string; fluxo: string }) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.fluxo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status */}
            {/* <Select
              value={filters.status}
              onValueChange={(v) => handleChange("status", v)}
            >
              <SelectTrigger className="w-[160px] h-9 border-white/10">
                <SelectValue placeholder="Todos os Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluido">Concluido</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="arquivado">Arquivado</SelectItem>
              </SelectContent>
            </Select> */}

            {/* Tipo */}
            {/* <Select
              value={filters.tipo}
              onValueChange={(v) => handleChange("tipo", v)}
            >
              <SelectTrigger className="w-[160px] h-9 border-white/10">
                <SelectValue placeholder="Todos os Tipos" />
              </SelectTrigger>
              <SelectContent>
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
            </Select> */}

            <div className="ml-auto">
              <Button
                onClick={handleSearch}
                disabled={loading}
                className="h-9 gap-2 px-5"
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