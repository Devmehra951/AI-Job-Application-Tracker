import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Track Every Application",
    description: "Stay organized with structured workflows for each role, company, and application stage."
  },
  {
    title: "Generate AI Proposals",
    description: "Turn job descriptions into tailored proposals and cover letter drafts in seconds."
  },
  {
    title: "Measure What Works",
    description: "Analyze response trends, interview conversion rates, and hiring momentum over time."
  }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container py-20">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-block rounded-full border px-4 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            AI Job Application Tracker
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Track Jobs. Get Hired Faster.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A focused SaaS workspace to manage your job pipeline, generate personalized proposals, and optimize your search.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link href="/auth/signup">
              <Button size="lg">Sign up</Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="lg" variant="outline">
                Login <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </header>

        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-slate-200">
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{feature.description}</CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
