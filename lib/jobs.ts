import { JobStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function getUserJobs(userId: string) {
  return prisma.job.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
}

export function buildStatusCounts(statuses: JobStatus[]) {
  return {
    total: statuses.length,
    interviews: statuses.filter((status) => status === JobStatus.INTERVIEW || status === JobStatus.OFFER).length,
    rejections: statuses.filter((status) => status === JobStatus.REJECTED).length
  };
}
