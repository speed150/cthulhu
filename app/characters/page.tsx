import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ButtonNewCharacter } from "@/components/ButtonNewCharacter";
import { CharacterCard } from "@/components/CharacterCard";

export default async function CharactersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const characters = await prisma.character.findMany({
    where: { userId: session.user.id },
  });
  console.log(characters)
  return (
    <div className="flex justify-center flex-col gap-5">
      <h1>Your invesigators</h1>
      <ButtonNewCharacter />
      {characters.length == 0 ? (
        <>
          <div className="text-center">You don't have any invesigators yet</div>
        </>
      ) : (
        characters.map((c) => <CharacterCard key={c.id} character={c}/>)
      )}
    </div>
  );
}
