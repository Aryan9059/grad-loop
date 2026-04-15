"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Image as ImageIcon } from "lucide-react";

export default function PostBox({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!content.trim()) return;
    setIsSubmitting(true);
    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" }
    });
    setContent("");
    setIsSubmitting(false);
    onPostCreated();
  }

  return (
    <div className="bg-card border border-border p-4 rounded-xl shadow-sm mb-6">
      <textarea
        placeholder="Share an achievement, ask a question, or post an update..."
        className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground p-2"
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center justify-between mt-3 border-t border-border pt-3">
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors px-2 py-1 rounded-md hover:bg-muted">
          <ImageIcon className="h-4 w-4" /> Media
        </button>
        <Button onClick={handleSubmit} disabled={isSubmitting || !content.trim()} size="sm" className="rounded-full px-4">
          <Send className="h-4 w-4 mr-2" /> Post
        </Button>
      </div>
    </div>
  );
}
