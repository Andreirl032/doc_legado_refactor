import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Nao autenticado" }, { status: 401 })
    }
    return NextResponse.json({ user: session })
  } catch (error) {
    console.error("[v0] Session check error:", error)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
