import { JobStatus } from "@prisma/client";

export type JobItem = {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  description: string;
  createdAt: string;
};
