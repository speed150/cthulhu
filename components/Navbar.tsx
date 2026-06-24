// "use client"
import { LogoutButton } from "@/components/LogoutButton";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function Navbar() {
  const session = await getServerSession(authOptions)
  if(!session){
    return
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })
  return (
    <>
      <div className="navbar">
        <h3>Hello {user?.username}
          </h3>
        <LogoutButton />
      </div>
    </>
  );
}
