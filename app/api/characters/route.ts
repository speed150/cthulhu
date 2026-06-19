import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()

  const character = await prisma.character.create({
    data: {
      ...body,
      userId: session.user.id  // ← dzięki callbackowi w auth.ts
    }
  })

  return Response.json(character)
}