import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

const SYSTEM_PROMPT = `You are an expert ATS analyst and resume coach with 15+ years of experience.

Analyze the resume using a strict, repeatable scoring system and return ONLY JSON.

Evaluation Steps:

1) Detect Context
- Infer target role/domain from skills, projects, experience
- Infer experience level:
  entry (student/recent grad), mid (1–5 yrs), senior (5+), executive

2) ATS Score (0–100) = sum of 5 categories (each 0–20)

Formatting (0–20):
- ATS-friendly, no tables/graphics, clear sections, consistent bullets

Keywords (0–20):
- Role-relevant keywords, tools/tech, aligned with job descriptions, no stuffing

Experience (0–20):
- Relevance, quantified impact, action verbs (projects count for freshers)

Education (0–20):
- Degree relevance, clarity, graduation year, certifications

Skills (0–20):
- Relevant, categorized, non-generic, aligned with experience

3) Scoring Rules
- Be strict and realistic
- Penalize: no metrics, poor formatting, low relevance, missing keywords
- Reward: impact, clarity, alignment, strong tech stack

4) Weaknesses & Improvements
- Weakness: specific issue + why it hurts ATS + severity (high/medium/low)
- Improvements: directly fix issues, pinpointed, actionable, include examples

5) Keywords
- List missing role-specific keywords (tools, frameworks, concepts)

Output Rules:
- Return pure JSON only
- No extra text
- Follow schema exactly

{
  "atsScore": <number 0-100>,
  "summary": "<2-3 sentence overview>",
  "scoreBreakdown": {
    "formatting": <0-20>,
    "keywords": <0-20>,
    "experience": <0-20>,
    "education": <0-20>,
    "skills": <0-20>
  },
  "strengths": [
    "<strength 1>",
    "<strength 2>",
    "<strength 3>"
  ],
  "weaknesses": [
    {
      "issue": "<title>",
      "description": "<why it hurts ATS>",
      "severity": "high" | "medium" | "low"
    }
  ],
  "improvements": [
    {
      "category": "<Keywords | Formatting | Experience | Skills | Summary>",
      "suggestion": "<actionable fix>",
      "example": "<before/after or sample>"
    }
  ],
  "missingKeywords": ["<k1>", "<k2>", "<k3>"],
  "detectedRole": "<role>",
  "experienceLevel": "entry" | "mid" | "senior" | "executive"
}`;

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "Mistral API key not configured" }, { status: 500 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("resume") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Only PDF and Word documents (.doc, .docx) are supported" },
                { status: 400 }
            );
        }

        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "File size must be under 5MB" }, { status: 400 });
        }

        const mistralFormData = new FormData();
        mistralFormData.append("file", file);
        mistralFormData.append("purpose", "ocr");

        const uploadRes = await fetch("https://api.mistral.ai/v1/files", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
            },
            body: mistralFormData,
        });

        if (!uploadRes.ok) {
            const errorText = await uploadRes.text();
            console.error("Mistral Direct Upload Error:", errorText);
            return NextResponse.json({ error: "Failed to upload file to Mistral" }, { status: 500 });
        }

        const uploaded = await uploadRes.json();
        const client = new Mistral({ apiKey });
        const signedUrl = await client.files.getSignedUrl({ fileId: uploaded.id });

        const response = await client.chat.complete({
            model: "mistral-small-latest",
            responseFormat: { type: "json_object" },
            temperature: 0.3,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: [
                        {
                            type: "document_url",
                            documentUrl: signedUrl.url,
                        },
                        {
                            type: "text",
                            text: "Analyze this resume and return only valid JSON following the structure in the system prompt.",
                        },
                    ],
                },
            ],
        });

        const rawText = response.choices?.[0]?.message?.content ?? "";

        const textContent = Array.isArray(rawText)
            ? rawText.map((c: { type: string; text?: string }) => (c.type === "text" ? c.text ?? "" : "")).join("")
            : rawText;

        const cleaned = textContent
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/```\s*$/i, "")
            .trim();

        let analysis;
        try {
            analysis = JSON.parse(cleaned);
        } catch {
            console.error("Failed to parse Mistral response:", textContent);

            await client.files.delete({ fileId: uploaded.id }).catch(() => { });
            return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
        }

        await client.files.delete({ fileId: uploaded.id }).catch(() => { });
        return NextResponse.json({ success: true, analysis });

    } catch (error) {
        console.error("Resume analysis error:", error);
        return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
    }
}