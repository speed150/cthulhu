"use client";
import { Character } from "@/app/generated/prisma/client";
import { useRouter } from "next/navigation";

export function CharacterCard({ character }: { character: Character }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/characters/${character.id}`);
  };
  return (
    <>
      <div onClick={() => handleClick()} key={character.id}>
        {character.name}
      </div>
    </>
  );
}
