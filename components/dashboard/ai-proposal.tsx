"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function AIProposalGenerator() {
  const [description, setDescription] = useState("");
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateProposal() {
    setLoading(true);
    const res = await fetch("/api/ai/proposal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description })
    });

    const data = (await res.json()) as { proposal?: string; error?: string };
    if (res.ok && data.proposal) {
      setProposal(data.proposal);
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Proposal Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Paste a job description"
          className="min-h-36"
        />
        <Button onClick={generateProposal} disabled={loading || !description}>
          {loading ? "Generating..." : "Generate Proposal"}
        </Button>
        <Textarea
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          placeholder="Generated proposal appears here and stays editable"
          className="min-h-56"
        />
      </CardContent>
    </Card>
  );
}
