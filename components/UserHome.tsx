"use client";
import { User } from "@/app/generated/prisma/client";

import { useRouter } from "next/navigation";

export function UserHome({ user }: { user: User }) {
  const router = useRouter();
  function handleClick() {
    router.push("/characters");
  }
  return (
    <div onClick={() => handleClick()}>
      <h3>Hello {user?.username}</h3>
    </div>
  );
}
