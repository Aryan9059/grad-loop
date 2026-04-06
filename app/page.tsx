"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/react";
import { useClerkOnboardCheck } from "@/hooks/useClerkOnboardCheck";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function Home() {
  const { userId, isLoaded } = useAuth();
  const { status } = useClerkOnboardCheck();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4 text-center selection:bg-primary/30">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      <div className="z-10 flex w-full max-w-4xl flex-col items-center gap-8 rounded-3xl border border-border bg-card p-8 shadow-2xl sm:p-16">
        <div className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm font-medium text-primary shadow-sm">
          <Sparkles className="size-4" />
          <span>The Ultimate Alumni Network</span>
        </div>

        <div className="space-y-4">
          <h1 className="bg-linear-to-br from-foreground to-foreground/60 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl">
            Grad Loop
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground sm:text-xl">
            Connect, grow, and thrive with your college alumni network. Join the community to unlock exclusive opportunities.
          </p>
        </div>

        {!isLoaded ? (
          <div className="flex h-12 items-center justify-center">
            <div className="size-6 animate-spin rounded-full border-b-2 border-primary" />
          </div>
        ) : !userId ? (
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full px-8 text-base shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              <Link href="/sign-up">
                Get Started <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-8 text-base transition-all hover:bg-muted active:scale-95">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center gap-4 rounded-full border bg-background/80 p-2 pr-6 shadow-sm backdrop-blur-md transition-all hover:shadow-md">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "size-10 shadow-inner" } }} />
              <div className="flex flex-col items-start text-sm">
                <span className="font-semibold text-foreground">Welcome back</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ShieldCheck className="size-3 text-emerald-500" />
                  {status === "redirecting" ? "Heading to dashboard..." : "Verifying profile..."}
                </span>
              </div>
            </div>
            {status !== "redirecting" && (
               <div className="flex items-center justify-center gap-2 text-primary">
                 <div className="size-4 animate-spin rounded-full border-b-2 border-primary" />
                 <span className="text-sm font-medium">Checking profile details</span>
               </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
