import Link from "next/link";

import { SignInForm } from "@/components/forms/sign-in-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Use Google OAuth or email/password authentication.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
          <p className="mt-6 text-sm text-muted-foreground">
            New here? <Link className="font-medium text-primary" href="/auth/signup">Create an account</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
