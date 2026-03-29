import { redirect } from "next/navigation";

import { AIProposalGenerator } from "@/components/dashboard/ai-proposal";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireAuth } from "@/lib/auth";

export default async function AIPage() {
  const session = await requireAuth();
  if (!session?.user?.id) redirect("/auth/signin");

  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">AI Proposal Generator</h1>
        <AIProposalGenerator />
      </div>
    </DashboardShell>
  );
}
