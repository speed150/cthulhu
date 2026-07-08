import InvestigatorSheet from "@/components/InvestigatorSheet";
import { prisma } from "@/lib/prisma";

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const character = await prisma.character.findUnique({
    where: {
      id,
    },
  });

  if (!character) {
    return <div>Character not found</div>;
  }

  return <InvestigatorSheet character={character} />;
}