"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, FileText } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface ProcessoRow {
  id: string
  numero: string
  tipo: string
  assunto: string
  status: string
  dataCriacao: string
  secretariaOrigemSigla: string
  interessado: string
  totalDocumentos: number
  [key: string]: unknown
}

interface ProcessTableProps {
  processos: ProcessoRow[]
  onViewProcess: (processo: ProcessoRow) => void
}

export function ProcessTable({ processos, onViewProcess }: ProcessTableProps) {
  if (processos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-4">
          <FileText className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Nenhum processo encontrado</h3>
        <p className="text-xs text-muted-foreground max-w-xs">
          Tente ajustar os filtros de busca para encontrar os processos desejados.
        </p>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-xs font-semibold text-muted-foreground w-[160px]">ID</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">Fluxo</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground w-[130px]">Tipo</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground w-[120px]">Grupo</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground w-[80px]">Status</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground w-[60px] text-center">Docs</TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {processos.map((processo) => (
              <TableRow key={processo.id} className="hover:bg-muted/30 transition-colors">
                <TableCell>
                  <span className="text-sm font-semibold text-sidebar-primary font-mono">{processo.numero}</span>
                </TableCell>
                <TableCell>
                  <div className="min-w-0">
                    <p className="text-sm text-foreground truncate max-w-[300px]">{processo.assunto}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{processo.interessado}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-sky-500/40 text-sky-400 bg-sky-500/10">
                    {processo.tipo}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
                    {processo.status === "em_andamento" ? "Em Andamento" : processo.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px] font-semibold">
                    {processo.secretariaOrigemSigla}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {processo.dataCriacao || "-"}
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-xs font-medium text-muted-foreground">{processo.totalDocumentos}</span>
                </TableCell>
                <TableCell>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-sidebar-primary"
                        onClick={() => onViewProcess(processo)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Ver arvore do processo</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  )
}
