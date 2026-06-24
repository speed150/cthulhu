"use client";

import { useRouter } from "next/navigation";

export function ButtonNewCharacter() {
  const router = useRouter();

  return (
    <>
      <div
        className={`button-secondary p-2 flex justify-center`}
        onClick={() => {
          router.push("/characters/new");
          router.refresh();
        }}
      >
        Create new investigator
      </div>
    </>
  );
}
