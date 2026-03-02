"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, LogIn, Eye, EyeOff, FolderOpen, ArrowRightLeft, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Erro ao fazer login")
        setLoading(false)
        return
      }

      router.push("/dashboard/processos")
    } catch {
      setError("Erro de conexao. Tente novamente.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Branding */}
      <div className="flex-1 flex flex-col justify-between p-8 lg:p-12">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground">Conecta SLZ</h1>
            <p className="text-[11px] text-muted-foreground">Biblioteca eletronica</p>
          </div>
        </div>

        {/* Hero text */}
        <div className="max-w-md">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 text-balance">
            Visualizador de processos-Semit
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            Visualize processos, tramitacoes, documentos.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <FolderOpen className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Documentos Centralizados</p>
                <p className="text-xs text-muted-foreground">Acesse oficios, memorandos, portarias e todos os tipos documentais.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <ArrowRightLeft className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Tramitacao Transparente</p>
                <p className="text-xs text-muted-foreground">Acompanhe todo o seu fluxo de movimentacao entre setores.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground">
          Prefeitura Municipal de Sao Luis - Maranhao
        </p>
      </div>

      {/* Right side - Login form */}
      <div className="flex items-center justify-center w-full max-w-md lg:max-w-lg p-8">
        <div className="w-full max-w-sm">
          <h3 className="text-xl font-bold text-foreground mb-1">Acessar Sistema</h3>
          <p className="text-sm text-sidebar-primary mb-6">Entre com suas credenciais institucionais</p>

          {error && (
            <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                E-mail institucional
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@saoluis.ma.gov.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-foreground">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-10 bg-input border-border text-foreground placeholder:text-muted-foreground pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground font-semibold gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Entrar no Sistema
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-sidebar-primary text-center mt-4">
            Acesso restrito a servidores da Prefeitura de Sao Luis
          </p>
        </div>
      </div>
    </div>
  )
}
