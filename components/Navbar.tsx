import { LogoutButton } from "@/components/LogoutButton";
import { UserHome } from "@/components/UserHome";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function Navbar() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  return (
    <>
      <div className="navbar">
        <UserHome user={user!} />
        <LogoutButton />
      </div>
    </>
  );
}
