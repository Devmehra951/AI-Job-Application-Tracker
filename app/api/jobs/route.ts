import { JobStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const jobSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  status: z.nativeEnum(JobStatus),
  description: z.string().min(10)
});

export async function GET() {
  const session = await requireAuth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const jobs = await prisma.job.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const session = await requireAuth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = jobSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const job = await prisma.job.create({ data: { ...parsed.data, userId: session.user.id } });
  return NextResponse.json(job, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await requireAuth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const id = z.string().cuid().safeParse(body.id);
  const payload = jobSchema.safeParse(body);
  if (!id.success || !payload.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const existing = await prisma.job.findFirst({ where: { id: id.data, userId: session.user.id } });
  if (!existing) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  const job = await prisma.job.update({ where: { id: id.data }, data: payload.data });
  return NextResponse.json(job);
}

export async function DELETE(req: Request) {
  const session = await requireAuth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const id = z.string().cuid().safeParse(url.searchParams.get("id"));
  if (!id.success) return NextResponse.json({ error: "Invalid job id" }, { status: 400 });

  const existing = await prisma.job.findFirst({ where: { id: id.data, userId: session.user.id } });
  if (!existing) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  await prisma.job.delete({ where: { id: id.data } });
  return NextResponse.json({ ok: true });
}
