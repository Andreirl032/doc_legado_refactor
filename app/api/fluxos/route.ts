import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { findFluxos } from "@/lib/querys/findmany"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Nao autenticado" }, { status: 401 })
    }

  const fluxos = await findFluxos();
  return NextResponse.json(fluxos);
  } catch (error) {
    console.error("[v0] Error fetching fluxos:", error)
    return NextResponse.json({ error: "Erro ao buscar fluxos" }, { status: 500 })
  }
}
