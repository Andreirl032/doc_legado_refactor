import { getDashboardStats } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  const stats = getDashboardStats()

  return (
    <div className="p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <span>Painel</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Painel</h1>
        <p className="text-sm text-muted-foreground mt-1">Visao geral do sistema de processos</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FileText} label="Total de Processos" value={stats.totalProcessos} color="text-sidebar-primary" />
        <StatCard icon={Clock} label="Em Andamento" value={stats.emAndamento} color="text-emerald-400" />
        <StatCard icon={CheckCircle} label="Concluidos" value={stats.concluidos} color="text-sky-400" />
        <StatCard icon={AlertCircle} label="Pendentes" value={stats.pendentes} color="text-amber-400" />
      </div>

      {/* Recent processes */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">Processos Recentes</h2>
        <div className="space-y-3">
          {stats.processosRecentes.map((p) => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="min-w-0">
                <p className="text-sm font-mono font-semibold text-sidebar-primary">{p.numero}</p>
                <p className="text-xs text-muted-foreground truncate">{p.assunto}</p>
              </div>
              <Badge variant="secondary" className="text-[10px] shrink-0 ml-4">
                {p.secretariaOrigemSigla}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  )
}
