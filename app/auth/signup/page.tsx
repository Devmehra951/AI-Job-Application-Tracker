import Link from "next/link";

import { SignUpForm } from "@/components/forms/sign-up-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Start tracking your applications with AI support.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
          <p className="mt-6 text-sm text-muted-foreground">
            Already have an account? <Link className="font-medium text-primary" href="/auth/signin">Login</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
