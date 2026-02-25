"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import type { ProcessStatus, DocumentType } from "@/lib/types"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "../ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface ProcessFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: ProcessStatus | "all"
  onStatusChange: (value: ProcessStatus | "all") => void
  typeFilter: DocumentType | "all"
  onTypeChange: (value: DocumentType | "all") => void
}

export function ProcessFilters({
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange,
}: ProcessFiltersProps) {
  const [open, setOpen] = useState(false)

  const [numero, setNumero] = useState("")
  const [assunto, setAssunto] = useState("")
  const [ano, setAno] = useState("")
  const [fluxo, setFluxo] = useState("")

  const [useNumero, setUseNumero] = useState(false)
  const [useAssunto, setUseAssunto] = useState(false)
  const [useAno, setUseAno] = useState(false)
  const [useFluxo, setUseFluxo] = useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold">Filtros</h3>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            {open ? "Ocultar" : "Mostrar"}
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent
        className="
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0
          data-[state=open]:fade-in-0
          data-[state=open]:slide-in-from-top-2
          data-[state=closed]:slide-out-to-top-2
          duration-200
        "
      >
        <div className="grid gap-6">

          {/* GRID DE INPUTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Nº Processo */}
            <div className="space-y-2">
              <Label htmlFor="numero">Nº do Processo</Label>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={useNumero}
                  onCheckedChange={(v) => setUseNumero(!!v)}
                />
                <Input
                  id="numero"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  disabled={!useNumero}
                  placeholder="Buscar pelo número do processo"
                />
              </div>
            </div>

            {/* Assunto */}
            <div className="space-y-2">
              <Label htmlFor="assunto">Assunto</Label>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={useAssunto}
                  onCheckedChange={(v) => setUseAssunto(!!v)}
                />
                <Input
                  id="assunto"
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  disabled={!useAssunto}
                  placeholder="Buscar pelo assunto"
                />
              </div>
            </div>

            {/* Ano */}
            <div className="space-y-2">
              <Label htmlFor="ano">Ano</Label>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={useAno}
                  onCheckedChange={(v) => setUseAno(!!v)}
                />
                <Input
                  id="ano"
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  disabled={!useAno}
                  placeholder="Buscar pelo ano"
                />
              </div>
            </div>

            {/* Fluxo */}
            <div className="space-y-2">
              <Label htmlFor="fluxo">Fluxo</Label>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={useFluxo}
                  onCheckedChange={(v) => setUseFluxo(!!v)}
                />

                <Select
                  value={fluxo}
                  onValueChange={setFluxo}
                  disabled={!useFluxo}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">Memorando</SelectItem>
                    <SelectItem value="2">Circular</SelectItem>
                    <SelectItem value="3">Proc. Administrativo</SelectItem>
                    <SelectItem value="4">Ofício</SelectItem>
                    <SelectItem value="5">Protocolo</SelectItem>
                    <SelectItem value="6">Ouvidoria</SelectItem>
                    <SelectItem value="7">Pedido de e-SIC</SelectItem>
                    <SelectItem value="8">Selo de Aprovação</SelectItem>
                    <SelectItem value="9">Análise de Projeto</SelectItem>
                    <SelectItem value="10">Documento - Urbanismo</SelectItem>
                    <SelectItem value="11">Licenciamento Ambiental</SelectItem>
                    <SelectItem value="12">Fiscalização</SelectItem>
                    <SelectItem value="13">Protocolo Servidor</SelectItem>
                    <SelectItem value="14">Proc E-Doc</SelectItem>
                    <SelectItem value="15">Ato Oficial</SelectItem>
                    <SelectItem value="16">Chamado técnico</SelectItem>
                    <SelectItem value="17">Ato de Comunicação Externa</SelectItem>
                    <SelectItem value="18">De Olho na Cidade</SelectItem>
                    <SelectItem value="19">Processo Seletivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {/* Selects + Botão */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-end">

            <div className="flex flex-col sm:flex-row gap-3 flex-1">

              <Select
                value={statusFilter}
                onValueChange={(v) =>
                  onStatusChange(v as ProcessStatus | "all")
                }
              >
                <SelectTrigger className="w-full sm:w-[180px] h-10">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="concluido">Concluído</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="arquivado">Arquivado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={typeFilter}
                onValueChange={(v) =>
                  onTypeChange(v as DocumentType | "all")
                }
              >
                <SelectTrigger className="w-full sm:w-[180px] h-10">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="oficio">Ofício</SelectItem>
                  <SelectItem value="memorando">Memorando</SelectItem>
                  <SelectItem value="portaria">Portaria</SelectItem>
                  <SelectItem value="decreto">Decreto</SelectItem>
                  <SelectItem value="requerimento">Requerimento</SelectItem>
                  <SelectItem value="parecer">Parecer</SelectItem>
                  <SelectItem value="despacho">Despacho</SelectItem>
                  <SelectItem value="nota_tecnica">Nota Técnica</SelectItem>
                </SelectContent>
              </Select>

            </div>

            <Button className="h-10 px-6 gap-2">
              <Search className="h-4 w-4" />
              Buscar
            </Button>

          </div>

        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}