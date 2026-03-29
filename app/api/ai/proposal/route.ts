import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAuth } from "@/lib/auth";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const schema = z.object({ description: z.string().min(20) });

export async function POST(req: Request) {
  const session = await requireAuth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Description too short" }, { status: 400 });

  const completion = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      { role: "system", content: "You are a professional career assistant. Write concise, high-quality proposals for job applications." },
      {
        role: "user",
        content: `Write a tailored job proposal for this role:\n\n${parsed.data.description}\n\nInclude:\n- Why I am a strong fit\n- Relevant strengths\n- Action-oriented closing`
      }
    ]
  });

  const proposal = completion.output_text;
  return NextResponse.json({ proposal });
}
