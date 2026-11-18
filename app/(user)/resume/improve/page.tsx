"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  FileText, Upload, X, CheckCircle2, AlertCircle, AlertTriangle, Info, Sparkles,
  TrendingUp, Tag, Target, ChevronDown, RotateCcw, Loader2, ArrowLeft,
  Zap, Brain, Copy, Check, LayoutTemplate, KeyRound, Briefcase, GraduationCap,
  Wrench, ScanSearch, ShieldCheck, Cpu, Rocket, ListChecks,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Severity = "high" | "medium" | "low";
type ExperienceLevel = "entry" | "mid" | "senior" | "executive";

interface ScoreBreakdown {
  formatting: number;
  keywords: number;
  experience: number;
  education: number;
  skills: number;
}

interface Weakness {
  issue: string;
  description: string;
  severity: Severity;
}

interface Improvement {
  category: string;
  suggestion: string;
  example?: string;
}

interface ResumeAnalysis {
  atsScore: number;
  summary: string;
  scoreBreakdown: ScoreBreakdown;
  strengths: string[];
  weaknesses: Weakness[];
  improvements: Improvement[];
  missingKeywords: string[];
  detectedRole: string;
  experienceLevel: ExperienceLevel;
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-500";
  if (score >= 60) return "text-amber-500";
  return "text-rose-500";
}
function getScoreRingColor(score: number) {
  if (score >= 80) return ["#10b981", "#34d399"];
  if (score >= 60) return ["#f59e0b", "#fbbf24"];
  return ["#f43f5e", "#fb7185"];
}
function getScoreLabel(score: number) {
  if (score >= 85) return "Recruiter-Ready";
  if (score >= 70) return "Strong Candidate";
  if (score >= 55) return "Getting There";
  return "Needs a Boost";
}
function getSeverityConfig(severity: Severity) {
  const map = {
    high: { icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", label: "Critical" },
    medium: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", label: "Moderate" },
    low: { icon: Info, color: "text-sky-500", bg: "bg-sky-500/10", border: "border-sky-500/20", label: "Minor" },
  };
  return map[severity] ?? map.low;
}

const METRICS: Record<keyof ScoreBreakdown, { label: string; sub: string; icon: React.ElementType }> = {
  formatting: { label: "ATS Formatting", sub: "Parser-friendly layout", icon: LayoutTemplate },
  keywords: { label: "Keyword Match", sub: "Role-relevant terms", icon: KeyRound },
  experience: { label: "Impact & Experience", sub: "Achievement-driven bullets", icon: Briefcase },
  education: { label: "Education", sub: "Credentials & coursework", icon: GraduationCap },
  skills: { label: "Skills Coverage", sub: "Tech & soft-skill depth", icon: Wrench },
};

/** Animates 0 → target for a satisfying count-up. */
function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const [drawn, setDrawn] = useState(false);
  const shown = useCountUp(score);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 50);
    return () => clearTimeout(t);
  }, []);
  const offset = drawn ? circumference - (score / 100) * circumference : circumference;
  const [c1, c2] = getScoreRingColor(score);
  return (
    <div className="relative flex items-center justify-center w-44 h-44 shrink-0">
      <div className="absolute inset-3 rounded-full blur-2xl opacity-30" style={{ background: c1 }} />
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 128 128" fill="none">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
        </defs>
        <circle cx="64" cy="64" r={radius} strokeWidth="9" className="stroke-muted" />
        <circle
          cx="64" cy="64" r={radius} strokeWidth="9"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          stroke="url(#ringGrad)"
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="relative flex flex-col items-center">
        <span className={cn("text-5xl font-black tabular-nums leading-none", getScoreColor(score))}>{shown}</span>
        <span className="text-[10px] mt-1.5 text-muted-foreground font-bold uppercase tracking-[0.14em]">ATS Score</span>
      </div>
    </div>
  );
}

function MetricTile({ k, value, delay }: { k: keyof ScoreBreakdown; value: number; delay: number }) {
  const m = METRICS[k];
  const Icon = m.icon;
  const pct = (value / 20) * 100;
  const tone = pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-rose-500";
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(pct), 200 + delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div className="rounded-xl border border-border bg-card p-4 hover:border-primary/40 hover:-translate-y-0.5 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-sm font-extrabold tabular-nums">
          {value}<span className="text-muted-foreground font-medium text-xs">/20</span>
        </span>
      </div>
      <p className="text-sm font-bold text-foreground leading-tight">{m.label}</p>
      <p className="text-[11px] text-muted-foreground mb-3">{m.sub}</p>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full", tone)}
          style={{ width: `${w}%`, transition: "width 1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </div>
    </div>
  );
}

function ImprovementCard({ item, index }: { item: Improvement; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-muted/40 transition-colors"
      >
        <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-black">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{item.category}</span>
          <p className="text-sm font-medium text-foreground mt-0.5">{item.suggestion}</p>
        </div>
        {item.example && (
          <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground mt-1 transition-transform", expanded && "rotate-180")} />
        )}
      </button>
      {expanded && item.example && (
        <div className="px-4 pb-4">
          <div className="ml-10 rounded-lg bg-primary/5 border border-primary/15 px-4 py-3">
            <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />AI-suggested rewrite
            </p>
            <p className="text-sm text-foreground leading-relaxed">{item.example}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const ANALYSIS_STEPS = [
  { icon: ScanSearch, label: "Parsing document structure & sections" },
  { icon: Cpu, label: "Simulating ATS pipelines (Workday, Greenhouse, Lever)" },
  { icon: KeyRound, label: "Benchmarking keywords against live job postings" },
  { icon: Brain, label: "Scoring impact, clarity & action verbs with AI" },
  { icon: Rocket, label: "Building your personalised action plan" },
];

function AnalyzingState() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (active >= ANALYSIS_STEPS.length - 1) return;
    const t = setTimeout(() => setActive((a) => a + 1), 1800);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="relative flex h-16 w-16 items-center justify-center mb-4">
          <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <span className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <ScanSearch className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-lg font-semibold">Analyzing your resume</h2>
        <p className="text-xs text-muted-foreground mt-1">Our AI is reviewing it the way a recruiter and an ATS would.</p>
      </div>
      <ul className="space-y-3">
        {ANALYSIS_STEPS.map((step, i) => {
          const done = i < active;
          const current = i === active;
          const Icon = step.icon;
          return (
            <li
              key={step.label}
              className={cn("flex items-center gap-3 text-sm transition-all duration-500", i > active ? "opacity-30" : "opacity-100")}
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                  done ? "bg-emerald-500/15 text-emerald-500" : current ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : current ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Icon className="h-3.5 w-3.5" />}
              </span>
              <span className={cn(current ? "font-medium text-foreground" : "text-muted-foreground")}>
                {step.label}{current && <span className="animate-pulse">…</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type Tab = "overview" | "issues" | "fixes" | "keywords";

function Results({ analysis, fileName, onReset }: { analysis: ResumeAnalysis; fileName?: string; onReset: () => void }) {
  const [tab, setTab] = useState<Tab>("overview");
  const [copied, setCopied] = useState(false);
  const critical = analysis.weaknesses.filter((w) => w.severity === "high");
  const quickWins = analysis.improvements.slice(0, 3);
  const potential = Math.min(100, analysis.atsScore + Math.max(5, Math.round((100 - analysis.atsScore) * 0.5)));
  const [c1] = getScoreRingColor(analysis.atsScore);

  const copyKeywords = async () => {
    try {
      await navigator.clipboard.writeText(analysis.missingKeywords.join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: "overview", label: "Overview", icon: Sparkles },
    { id: "issues", label: "Issues", icon: AlertCircle, count: analysis.weaknesses.length },
    { id: "fixes", label: "Action Plan", icon: ListChecks, count: analysis.improvements.length },
    { id: "keywords", label: "Keywords", icon: Tag, count: analysis.missingKeywords.length },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{ background: `radial-gradient(60% 80% at 15% 0%, ${c1}, transparent 70%), radial-gradient(50% 70% at 100% 100%, var(--primary), transparent 70%)` }}
        />
        <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8">
          <ScoreRing score={analysis.atsScore} />
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                <Brain className="h-3 w-3" />AI-Powered Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground capitalize">
                {analysis.experienceLevel}-level
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                <Target className="h-3 w-3" />{analysis.detectedRole}
              </span>
            </div>
            <h2 className={cn("text-2xl sm:text-3xl font-extrabold tracking-tight", getScoreColor(analysis.atsScore))}>
              {getScoreLabel(analysis.atsScore)}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2 max-w-xl">{analysis.summary}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-foreground bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2">
              <Rocket className="h-4 w-4 text-emerald-500" />
              Apply the fixes below to reach ~<span className="text-emerald-500 font-black tabular-nums">{potential}</span> ATS score
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-between gap-3 px-6 sm:px-8 py-3 border-t border-border bg-muted/30">
          <div className="flex items-center gap-2 min-w-0 text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{fileName}</span>
          </div>
          <button onClick={onReset} className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
            <RotateCcw className="h-3.5 w-3.5" />New analysis
          </button>
        </div>
      </div>

      {/* Metric tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {(Object.keys(METRICS) as (keyof ScoreBreakdown)[]).map((k, i) => (
          <MetricTile key={k} k={k} value={analysis.scoreBreakdown[k] ?? 0} delay={i * 120} />
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex-1 min-w-fit flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
                tab === t.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />{t.label}
              {t.count !== undefined && (
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-bold", tab === t.id ? "bg-primary/10 text-primary" : "bg-background/60")}>
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-300">
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <h3 className="font-bold">What&apos;s working</h3>
            </div>
            {analysis.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">{s}</p>
              </div>
            ))}
          </section>
          <section className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Zap className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold">Quick wins</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full">
                Highest impact
              </span>
            </div>
            {quickWins.map((q, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <div className="h-6 w-6 rounded-md bg-amber-500/10 text-amber-500 flex items-center justify-center text-xs font-black shrink-0">
                  {i + 1}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{q.category}</span>
                  <p className="text-sm text-foreground leading-relaxed mt-0.5">{q.suggestion}</p>
                </div>
              </div>
            ))}
            {critical.length > 0 && (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                <AlertCircle className="h-3.5 w-3.5 text-rose-500" />
                {critical.length} critical {critical.length === 1 ? "issue" : "issues"} flagged — see the Issues tab.
              </p>
            )}
          </section>
        </div>
      )}

      {tab === "issues" && (
        <div className="space-y-3 animate-in fade-in duration-300">
          {analysis.weaknesses.map((w, i) => {
            const cfg = getSeverityConfig(w.severity);
            const Icon = cfg.icon;
            return (
              <div key={i} className={cn("flex items-start gap-3 p-4 rounded-xl border", cfg.bg, cfg.border)}>
                <Icon className={cn("h-4 w-4 shrink-0 mt-0.5", cfg.color)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-semibold text-foreground">{w.issue}</span>
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full", cfg.bg, cfg.color)}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{w.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "fixes" && (
        <div className="space-y-2 animate-in fade-in duration-300">
          {analysis.improvements.map((item, i) => (
            <ImprovementCard key={i} item={item} index={i} />
          ))}
        </div>
      )}

      {tab === "keywords" && (
        <div className="animate-in fade-in duration-300 p-6 rounded-2xl border border-primary/20 bg-primary/5">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />High-impact keywords to add
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Weave these in naturally to boost ATS matching for {analysis.detectedRole} roles.
              </p>
            </div>
            <button
              onClick={copyKeywords}
              className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
            >
              {copied ? <><Check className="h-3.5 w-3.5 text-emerald-500" />Copied</> : <><Copy className="h-3.5 w-3.5" />Copy all</>}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((kw, i) => (
              <span
                key={i}
                className="text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/25 bg-card text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                + {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/60 border border-border">
        <Target className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Pro tip:</span> Tailor your resume for every application by mirroring the exact keywords from the job description.
        </p>
      </div>
      <div className="flex justify-center gap-3 pb-4 flex-wrap">
        <Link
          href="/resume/create"
          className="flex items-center gap-2 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors px-4 py-2.5 rounded-xl shadow-lg shadow-primary/20"
        >
          <Sparkles className="h-4 w-4" />Rebuild with AI
        </Link>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2.5 rounded-xl border border-border hover:bg-muted"
        >
          <RotateCcw className="h-4 w-4" />Analyze another resume
        </button>
      </div>
    </div>
  );
}

export default function ImproveResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(f.type)) { setError("Only PDF and Word (.docx) files are supported."); return; }
    if (f.size > 5 * 1024 * 1024) { setError("File must be under 5MB."); return; }
    setError(""); setFile(f); setAnalysis(null);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true); setError("");
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const res = await fetch("/api/resume/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Analysis failed."); return; }
      const a = data.analysis ?? {};
      setAnalysis({
        ...a,
        atsScore: Number(a.atsScore) || 0,
        scoreBreakdown: a.scoreBreakdown ?? {},
        strengths: a.strengths ?? [],
        weaknesses: a.weaknesses ?? [],
        improvements: a.improvements ?? [],
        missingKeywords: a.missingKeywords ?? [],
        detectedRole: a.detectedRole ?? "General",
        experienceLevel: a.experienceLevel ?? "entry",
        summary: a.summary ?? "",
      });
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const reset = () => { setFile(null); setAnalysis(null); setError(""); };

  return (
    <div className="flex flex-col min-h-full w-full p-6 sm:p-10 overflow-y-auto">
      <div className="mb-8">
        <Link href="/resume" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Resume Studio
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10">
            <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Improve Resume</h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mt-1 ml-1">Upload your resume for AI-powered ATS scoring and improvement suggestions.</p>
      </div>

      {!analysis && loading && (
        <div className="max-w-2xl w-full mx-auto"><AnalyzingState /></div>
      )}

      {!analysis && !loading && (
        <div className="max-w-2xl w-full mx-auto">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => !file && inputRef.current?.click()}
            className={cn("relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-200",
              file ? "border-primary/40 bg-primary/5 cursor-default" : dragOver ? "border-primary bg-primary/5 scale-[1.01] cursor-copy" : "border-border hover:border-primary/50 hover:bg-muted/40 cursor-pointer bg-card")}
          >
            <input ref={inputRef} type="file" accept=".pdf,.docx" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            {file ? (
              <>
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10"><FileText className="h-8 w-8 text-primary" /></div>
                <div><p className="font-semibold text-foreground text-lg">{file.name}</p><p className="text-sm text-muted-foreground mt-1">{(file.size / 1024).toFixed(1)} KB</p></div>
                <button onClick={(e) => { e.stopPropagation(); reset(); }} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><X className="h-4 w-4" /></button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted"><Upload className="h-8 w-8 text-muted-foreground" /></div>
                <div><p className="font-semibold text-foreground text-lg">Drop your resume here</p><p className="text-sm text-muted-foreground mt-1">or click to browse · PDF, DOCX · max 5MB</p></div>
              </>
            )}
          </div>
          {error && <p className="mt-3 text-sm text-destructive flex items-center gap-2"><AlertCircle className="h-4 w-4 shrink-0" />{error}</p>}
          {file && (
            <button onClick={handleAnalyze}
              className="mt-5 w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.99] transition-all shadow-lg shadow-primary/20">
              <Sparkles className="h-4 w-4" />Analyze Resume
            </button>
          )}
        </div>
      )}

      {analysis && <Results analysis={analysis} fileName={file?.name} onReset={reset} />}
    </div>
  );
}
