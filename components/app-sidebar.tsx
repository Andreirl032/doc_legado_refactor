"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, FileText, ChevronLeft, ChevronRight, LogOut, Power } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const navItems = [
  { href: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { href: "/dashboard/processos", label: "Processos", icon: FileText },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const { data } = useSWR("/api/auth/me", fetcher, {
    revalidateOnFocus: false,
    errorRetryCount: 1,
  })

  const user = data?.user

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch {
      setLoggingOut(false)
    }
  }

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"
  const userName = user?.name || user?.email?.split("@")[0] || "Usuario"

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex flex-col bg-sidebar border-r border-sidebar-border h-screen sticky top-0 transition-all duration-300",
          collapsed ? "w-[68px]" : "w-[220px]"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <FileText className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-sidebar-foreground truncate">Conecta SLZ</h2>
              <p className="text-[10px] text-muted-foreground truncate">Documento Eletronico</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"))
            const Icon = item.icon

            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              )
            }

            return <div key={item.href}>{linkContent}</div>
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="px-3 py-2 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors w-full"
          >
            {collapsed ? <ChevronRight className="h-5 w-5 shrink-0" /> : <ChevronLeft className="h-5 w-5 shrink-0" />}
            {!collapsed && <span>Recolher</span>}
          </button>
        </div>

        {/* Power/Logout */}
        <div className="px-3 py-2 border-t border-sidebar-border">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors w-full"
              >
                <Power className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{loggingOut ? "Saindo..." : "Sair"}</span>}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Sair do sistema</TooltipContent>
          </Tooltip>
        </div>

        {/* User */}
        <div className="px-3 py-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex items-center justify-between flex-1 min-w-0">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-sidebar-foreground truncate">{userName}</p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="text-muted-foreground hover:text-sidebar-foreground transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Sair do sistema</TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  )
}
