"use client";

import { ButtonMain } from "@/components/ButtonMain";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data } = useSession();
  console.log(data)
  if (!data) {
  }
  return (
    <>
      <div className="main-page">
        <h1>Call of Cthulhu Character Creator</h1>
        <div>Character creator for Call of Cthulhu RPG</div>
        <ButtonMain buttonText="Login" mainColor href="/login" />
        <ButtonMain buttonText="Register" href="/register" />
      </div>
    </>
  );
}
