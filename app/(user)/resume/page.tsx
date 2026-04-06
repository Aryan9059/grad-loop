import { FileText, Upload } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="flex flex-col h-full w-full p-6 sm:p-10 overflow-y-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10">
            <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Resume Analysis
          </h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mt-1 ml-1">
          Get AI-powered insights on your resume.
        </p>
      </div>

      {/* Empty state */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Upload className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Upload your resume</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Upload your resume to get detailed, AI-powered analysis and improvement suggestions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
