"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Wand2, TrendingUp } from "lucide-react";
import { CreateIllustration, AnalyzeIllustration } from "@/components/resume/ResumeIllustrations";
import { cn } from "@/lib/utils";

const options = [
  {
    href: "/resume/create",
    step: "01",
    title: "Create a resume",
    description:
      "Turn your Grad Loop profile into a polished LaTeX resume. Fine-tune it in a live editor and export a pixel-perfect PDF.",
    tags: ["LaTeX editor", "Live preview", "PDF export"],
    cta: "Start building",
    icon: Wand2,
    Illustration: CreateIllustration,
    theme: {
      panel:
        "from-violet-100/80 via-white to-indigo-50 dark:from-violet-500/[0.12] dark:via-[#1e1a2e] dark:to-indigo-500/[0.06]",
      border: "hover:border-violet-400/50 dark:hover:border-violet-400/40",
      glow: "group-hover:shadow-violet-500/15",
      iconBg: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
      tag: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20",
      cta: "bg-violet-600 hover:bg-violet-500 shadow-violet-600/30",
      step: "text-violet-500/15 dark:text-violet-300/10",
    },
  },
  {
    href: "/resume/improve",
    step: "02",
    title: "Analyze my resume",
    description:
      "Upload the resume you already have. Get an ATS score, find weak spots, and see exactly which keywords you're missing.",
    tags: ["ATS score", "Weakness scan", "Keyword gaps"],
    cta: "Upload & analyze",
    icon: TrendingUp,
    Illustration: AnalyzeIllustration,
    theme: {
      panel:
        "from-amber-100/80 via-white to-orange-50 dark:from-amber-500/[0.12] dark:via-[#1e1a2e] dark:to-orange-500/[0.06]",
      border: "hover:border-amber-400/60 dark:hover:border-amber-400/40",
      glow: "group-hover:shadow-amber-500/15",
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
      tag: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
      cta: "bg-amber-500 hover:bg-amber-400 shadow-amber-500/30",
      step: "text-amber-500/15 dark:text-amber-300/10",
    },
  },
];

export default function ResumePage() {
  return (
    <div className="flex flex-col w-full min-h-[calc(100dvh-3.5rem)] md:h-dvh md:min-h-[640px] p-4 sm:p-6 gap-4 sm:gap-5">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4 px-1"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-linear-to-br from-violet-500/15 to-amber-500/15">
            <FileText className="h-5 w-5 text-violet-600 dark:text-violet-300" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Resume Studio</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">How would you like to get started?</p>
          </div>
        </div>
      </motion.header>

      {/* Two options */}
      <div className="grid flex-1 min-h-0 grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {options.map((opt, i) => {
          const Icon = opt.icon;
          return (
            <motion.div
              key={opt.href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[520px] lg:min-h-0"
            >
            <Link href={opt.href} className="group block h-full outline-none">
              <motion.div
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileTap={{ scale: 0.99 }}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.06] dark:border-white/[0.06]",
                  "bg-linear-to-br shadow-sm transition-[border-color,box-shadow] duration-300 group-hover:shadow-2xl",
                  "group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background",
                  opt.theme.panel,
                  opt.theme.border,
                  opt.theme.glow,
                )}
              >
                {/* Big step number */}
                <span
                  className={cn(
                    "pointer-events-none absolute right-6 top-3 select-none text-[7rem] font-black leading-none tracking-tighter",
                    opt.theme.step,
                  )}
                >
                  {opt.step}
                </span>

                {/* Illustration */}
                <div className="relative flex flex-1 min-h-0 items-center justify-center px-6 pt-8 sm:px-10">
                  <motion.div
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="h-full w-full max-w-[520px] max-h-[380px]"
                  >
                    <opt.Illustration className="h-full w-full" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative flex flex-col gap-4 p-6 sm:p-8 pt-2">
                  <div className="flex items-center gap-3">
                    <div className={cn("rounded-xl p-2.5", opt.theme.iconBg)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-2xl sm:text-[1.7rem] font-bold tracking-tight text-foreground">{opt.title}</h2>
                  </div>
                  <p className="max-w-md text-sm sm:text-[0.95rem] leading-relaxed text-muted-foreground">
                    {opt.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <div className="flex flex-wrap gap-2">
                      {opt.tags.map((tag) => (
                        <span key={tag} className={cn("rounded-full border px-2.5 py-1 text-xs font-medium", opt.theme.tag)}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors",
                        opt.theme.cta,
                      )}
                    >
                      {opt.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
