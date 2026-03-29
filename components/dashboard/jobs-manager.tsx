"use client";

import { useMemo, useState } from "react";
import type { JobStatus } from "@prisma/client";

import type { JobItem } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const statuses: JobStatus[] = ["APPLIED", "INTERVIEW", "OFFER", "REJECTED"];

type JobInput = {
  company: string;
  role: string;
  status: JobStatus;
  description: string;
};

const emptyForm: JobInput = { company: "", role: "", status: "APPLIED", description: "" };

export function JobsManager({ initialJobs }: { initialJobs: JobItem[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [form, setForm] = useState<JobInput>(emptyForm);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const statusCount = useMemo(() => {
    return statuses.reduce(
      (acc, status) => {
        acc[status] = jobs.filter((job) => job.status === status).length;
        return acc;
      },
      {} as Record<JobStatus, number>
    );
  }, [jobs]);

  async function saveJob() {
    setLoading(true);
    const method = editingJobId ? "PUT" : "POST";
    const payload = editingJobId ? { ...form, id: editingJobId } : form;

    const res = await fetch("/api/jobs", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = (await res.json()) as JobItem;
      setJobs((prev) => (editingJobId ? prev.map((job) => (job.id === data.id ? data : job)) : [data, ...prev]));
      setForm(emptyForm);
      setEditingJobId(null);
    }

    setLoading(false);
  }

  async function deleteJob(id: string) {
    const res = await fetch(`/api/jobs?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  }

  function startEdit(job: JobItem) {
    setEditingJobId(job.id);
    setForm({ company: job.company, role: job.role, status: job.status, description: job.description });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingJobId ? "Edit Job" : "Add Job"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <Input placeholder="Company Name" value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} />
            <Input placeholder="Role" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
          </div>
          <Select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as JobStatus }))}>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
          <Textarea
            placeholder="Job Description"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
          <div className="flex gap-2">
            <Button onClick={saveJob} disabled={loading || !form.company || !form.role || !form.description}>
              {loading ? "Saving..." : editingJobId ? "Update Job" : "Add Job"}
            </Button>
            {editingJobId ? (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingJobId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Tracker ({jobs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2 text-xs">
            {statuses.map((status) => (
              <Badge key={status} variant="outline">
                {status}: {statusCount[status]}
              </Badge>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="p-2">Company</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Created</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b">
                    <td className="p-2 font-medium">{job.company}</td>
                    <td className="p-2">{job.role}</td>
                    <td className="p-2">
                      <Badge>{job.status}</Badge>
                    </td>
                    <td className="p-2">{new Date(job.createdAt).toLocaleDateString()}</td>
                    <td className="space-x-2 p-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit(job)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteJob(job.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
