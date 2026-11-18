import { extractText, getDocumentProxy } from "unpdf";
import mammoth from "mammoth";

const PDF = "application/pdf";
const DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const SUPPORTED_RESUME_TYPES = [PDF, DOCX];

/** Extracts plain text from an uploaded PDF or DOCX resume. */
export async function extractResumeText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  let text = "";
  if (file.type === PDF) {
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const result = await extractText(pdf, { mergePages: true });
    text = result.text;
  } else if (file.type === DOCX) {
    const result = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
    text = result.value;
  } else {
    throw new Error("Unsupported file type");
  }
  // Keep prompts within Groq's context/token limits
  return text.trim().slice(0, 24000);
}
