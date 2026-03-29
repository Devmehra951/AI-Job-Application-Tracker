import { redirect } from "next/navigation";

import { JobsManager } from "@/components/dashboard/jobs-manager";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireAuth } from "@/lib/auth";
import { getUserJobs } from "@/lib/jobs";

export default async function JobsPage() {
  const session = await requireAuth();
  if (!session?.user?.id) redirect("/auth/signin");

  const jobs = (await getUserJobs(session.user.id)).map((job) => ({ ...job, createdAt: job.createdAt.toISOString() }));

  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Job Tracker</h1>
        <JobsManager initialJobs={jobs} />
      </div>
    </DashboardShell>
  );
}
