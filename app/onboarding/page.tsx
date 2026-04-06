"use client";

import OnboardingForm from "@/components/OnboardingForm";

export default function OnboardingPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4 sm:p-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      <div className="z-10 w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
            Complete your profile
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Tell us a bit about yourself to personalize your experience.
          </p>
        </div>
        
        <OnboardingForm />
      </div>
    </main>
  );
}