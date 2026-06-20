
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !password) {
    return Response.json({ error: "E-mail and password cannot be empty" }, { status: 400 })
  }

  if (!emailRegex.test(email)) {
    return Response.json({ error: "Wrong e-mail format" }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return Response.json({ error: "E-mail already taken" }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, password: hashedPassword }
  })

  return Response.json({ id: user.id, email: user.email })
}