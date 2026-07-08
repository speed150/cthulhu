"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError("Incorrect username or password");
      return;
    }
    router.push("/characters");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 p-6 border rounded-lg"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="w-full flex justify-around my-5">
          <button
            type="submit"
            disabled={loading}
            className="button-secondary w-8/10 py-1"
          >
            {loading ? "Logging..." : "Login"}
          </button>
        </div>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
