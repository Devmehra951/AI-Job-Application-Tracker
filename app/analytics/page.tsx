import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { SimpleBarChart } from "@/components/dashboard/simple-chart";
import { requireAuth } from "@/lib/auth";
import { getUserJobs } from "@/lib/jobs";

export default async function AnalyticsPage() {
  const session = await requireAuth();
  if (!session?.user?.id) redirect("/auth/signin");

  const jobs = await getUserJobs(session.user.id);
  const total = jobs.length;
  const successful = jobs.filter((job) => job.status === "INTERVIEW" || job.status === "OFFER").length;
  const failed = jobs.filter((job) => job.status === "REJECTED").length;

  const monthMap = new Map<string, number>();
  jobs.forEach((job) => {
    const key = new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    monthMap.set(key, (monthMap.get(key) ?? 0) + 1);
  });

  const overTimeData = [...monthMap.entries()].map(([label, value]) => ({ label, value }));

  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <div className="grid gap-6 lg:grid-cols-2">
          <SimpleBarChart title="Applications Over Time" data={overTimeData.length ? overTimeData : [{ label: "No data", value: 0 }]} />
          <SimpleBarChart
            title="Success Rate"
            data={[
              { label: "Successful", value: successful },
              { label: "Rejected", value: failed },
              { label: "Open", value: Math.max(total - successful - failed, 0) }
            ]}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
