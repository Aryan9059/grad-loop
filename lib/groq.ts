import OpenAI from "openai";

export const GROQ_MODEL = "openai/gpt-oss-120b";

let _groq: OpenAI | null = null;

/** Groq exposes an OpenAI-compatible API, so we reuse the `openai` SDK. */
export function getGroq(): OpenAI | null {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  if (!_groq) {
    _groq = new OpenAI({ apiKey, baseURL: "https://api.groq.com/openai/v1" });
  }
  return _groq;
}
