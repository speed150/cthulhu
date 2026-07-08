import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  const { username, password } = await request.json()
  if (!username || !password) {
    return Response.json({ error: "Username and password cannot be empty" }, { status: 400 })
  }
  const existing = await prisma.user.findUnique({ where: { username } })
  if (existing) {
    return Response.json({ error: "E-mail already taken" }, { status: 400 })
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { username, password: hashedPassword }
  })
  return Response.json({ id: user.id, email: user.username })
}