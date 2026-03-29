"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onEmailSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const result = await signIn("credentials", { email, password, redirect: false, callbackUrl: "/dashboard" });
    if (result?.ok) {
      window.location.href = "/dashboard";
    } else {
      setMessage("Invalid email or password.");
    }
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <Button className="w-full" variant="outline" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        Continue with Google
      </Button>

      <form onSubmit={onEmailSignIn} className="space-y-3">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          required
        />
        <Button className="w-full" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Continue with Email"}
        </Button>
      </form>

      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </div>
  );
}
