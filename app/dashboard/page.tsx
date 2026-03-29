import { redirect } from "next/navigation";

import { OverviewCards } from "@/components/dashboard/overview-cards";
import { SimpleBarChart } from "@/components/dashboard/simple-chart";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireAuth } from "@/lib/auth";
import { buildStatusCounts, getUserJobs } from "@/lib/jobs";

export default async function DashboardPage() {
  const session = await requireAuth();
  if (!session?.user?.id) redirect("/auth/signin");

  const jobs = await getUserJobs(session.user.id);
  const counts = buildStatusCounts(jobs.map((job) => job.status));
  const responseRate = counts.total > 0 ? (counts.interviews / counts.total) * 100 : 0;

  const trendData = jobs
    .slice(0, 7)
    .reverse()
    .map((job) => ({ label: new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }), value: 1 }));

  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <OverviewCards
          total={counts.total}
          interviews={counts.interviews}
          rejections={counts.rejections}
          responseRate={responseRate}
        />
        <SimpleBarChart title="Recent Applications" data={trendData.length ? trendData : [{ label: "No data", value: 0 }]} />
      </div>
    </DashboardShell>
  );
}
