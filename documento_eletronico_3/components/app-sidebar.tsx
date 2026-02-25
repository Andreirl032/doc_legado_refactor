"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useState, useEffect, use } from "react";
import { toast } from "sonner";

const navItems = [
  { href: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { href: "/dashboard/processos", label: "Processos", icon: FileText},
  // { href: "/dashboard/Ano", label: "Ano", icon: FileText },
  // { href: "/dashboard/Fluxo", label: "Fluxo", icon: FileText },
  // { href: "/dashboard/Assunto", label: "Assunto", icon: FileText },
];

type User = {
  name: string;
  email: string;
  role: string;
  secretariaSigla: string;
};

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  //const [user, setUser] = useState(dataUser);

  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    role: "",
    secretariaSigla: "",
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {
        // fallback to mock user
      });
  }, []);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    toast.info("Sessao encerrada");
    router.push("/");
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex h-screen flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-[68px]" : "w-[260px]",
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center border-b border-sidebar-border p-4",
            collapsed ? "justify-center" : "gap-3",
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
            <FileText className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-sidebar-primary-foreground truncate">
                Conecta SLZ
              </span>
              <span className="text-[10px] text-sidebar-foreground/50 truncate">
                Documento Eletronico
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            const linkContent = (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center px-0",
                )}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return linkContent;
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3 flex flex-col gap-2">
          {/* Collapse toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "h-8 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              collapsed ? "w-full justify-center px-0" : "w-full justify-start",
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span className="text-xs">Recolher</span>
              </>
            )}
          </Button>

          {/* Theme toggle */}
          <div
            className={cn(
              "flex",
              collapsed ? "justify-center" : "justify-start px-1",
            )}
          >
            <ThemeToggle />
          </div>

          {/* User info */}
          <div
            className={cn(
              "flex items-center rounded-lg p-2",
              collapsed ? "justify-center" : "gap-3",
            )}
          >
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-semibold text-sidebar-primary-foreground truncate">
                  {user.name}
                </span>
                <span className="text-[10px] text-sidebar-foreground/50 truncate flex items-center gap-1">
                  <Building2 className="h-2.5 w-2.5" />
                  {user.secretariaSigla}
                </span>
              </div>
            )}
            {!collapsed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="h-7 w-7 text-sidebar-foreground/50 hover:text-destructive hover:bg-sidebar-accent"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Sair</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
