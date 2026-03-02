import { prisma } from "./prisma"
import { compare } from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const SESSION_COOKIE = "conecta-session"
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "conecta-slz-secret-key-change-in-prod"
)

export async function authenticate(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) {
    return { error: "Credenciais invalidas" }
  }

  const valid = await compare(password, user.password)
  if (!valid) {
    return { error: "Credenciais invalidas" }
  }

  // Create session token
  const token = await new SignJWT({ userId: user.id, email: user.email, name: user.name, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET)

  // Store session in database
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  await prisma.session.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  })

  // Set HTTP-only cookie
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  })

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  }
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)

    // Verify session exists in DB (not blacklisted)
    const session = await prisma.session.findUnique({ where: { token } })
    if (!session || session.expiresAt < new Date()) {
      // Session expired or blacklisted (deleted)
      cookieStore.delete(SESSION_COOKIE)
      return null
    }

    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string | null,
      role: payload.role as string | null,
    }
  } catch {
    cookieStore.delete(SESSION_COOKIE)
    return null
  }
}

export async function logout() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (token) {
    // Delete session from DB (blacklist)
    await prisma.session.deleteMany({ where: { token } })
    cookieStore.delete(SESSION_COOKIE)
  }
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    throw new Error("UNAUTHORIZED")
  }
  return session
}
