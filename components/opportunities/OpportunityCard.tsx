"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, MapPin, DollarSign, Calendar, Sparkles, 
  Target, Zap, Loader2, CheckCircle2, ChevronRight,
  ExternalLink, Globe, Building2, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OpportunityCardProps {
  opportunity: any;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleQuickApply = async () => {
    if (opportunity.applicationLink) {
      window.open(opportunity.applicationLink, "_blank", "noopener,noreferrer");
      setApplied(true);
      return;
    }

    setIsApplying(true);
    try {
      const res = await fetch("/api/opportunities/apply", {
        method: "POST",
        body: JSON.stringify({ opportunityId: opportunity.id }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setApplied(true);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to apply");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setIsApplying(false);
    }
  };

  const authorInitials = `${opportunity.author?.firstName?.[0] || ""}${opportunity.author?.lastName?.[0] || ""}`;

  return (
    <div className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/30 rounded-[2.5rem] p-1 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.05)]">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
      
      <div className="relative z-10 p-8 flex flex-col gap-8">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex gap-5">
            <Link href={`/u/${opportunity.author?.clerkId}`} className="relative shrink-0 group/avatar">
              <div className="size-16 rounded-[1.25rem] bg-linear-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover/avatar:scale-105 group-hover/avatar:rotate-2 shadow-sm">
                {opportunity.author?.profile_photo ? (
                  <Image src={opportunity.author.profile_photo} alt="Avatar" width={64} height={64} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-primary font-black text-xl">{authorInitials}</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 size-5 bg-emerald-500 border-2 border-card rounded-full shadow-sm" />
            </Link>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                  {opportunity.title}
                </h3>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-transparent rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  {opportunity.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-4 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  <User className="size-2 text-muted-foreground" />
                </div>
                <span className="text-xs font-bold text-muted-foreground">
                  Posted by <span className="text-foreground hover:text-primary transition-colors cursor-pointer">{opportunity.author?.firstName} {opportunity.author?.lastName}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="size-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground overflow-hidden ring-1 ring-black/5">
                     <Image src={`https://i.pravatar.cc/100?u=${opportunity.id + i}`} alt="User" width={32} height={32} unoptimized />
                  </div>
                ))}
             </div>
             <p className="text-[11px] font-black uppercase text-muted-foreground tracking-widest">
               12+ Applicants
             </p>
          </div>
        </div>

        {/* Info Grid - The "Specs" of the job */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-[2rem] bg-muted/30 border border-border/40">
          <div className="flex items-center gap-4 px-2">
            <div className="size-11 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-500">
              <DollarSign className="size-5" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-tight">Salary</span>
              <span className="text-sm font-extrabold text-foreground truncate">{opportunity.salary || "Negotiable"}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 px-2 lg:border-l lg:border-border/50">
            <div className="size-11 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-500">
              <MapPin className="size-5" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-tight">Location</span>
              <span className="text-sm font-extrabold text-foreground truncate">{opportunity.location || "Remote"}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 px-2 lg:border-l lg:border-border/50">
            <div className="size-11 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Building2 className="size-5" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-tight">Env</span>
              <span className="text-sm font-extrabold text-foreground truncate">Hybrid/Onsite</span>
            </div>
          </div>

          <div className="flex items-center gap-4 px-2 lg:border-l lg:border-border/50">
            <div className="size-11 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-500">
              <Calendar className="size-5" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-tight">Deadline</span>
              <span className="text-sm font-extrabold text-foreground truncate">{opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : "Rolling"}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-primary" />
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">The Role</h4>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                {opportunity.description}
              </p>
            </div>

            {opportunity.outcomes && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-primary" />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Learning Outcomes</h4>
                </div>
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 relative overflow-hidden group/outcomes">
                  <Target className="absolute -bottom-4 -right-4 size-20 text-primary/5 group-hover/outcomes:scale-110 transition-transform duration-500" />
                  <p className="text-xs text-foreground/80 leading-relaxed italic font-medium relative z-10">
                    "{opportunity.outcomes}"
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-4 space-y-6">
            <div className="space-y-4">
               <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">Tech Stack</h4>
               <div className="flex flex-wrap gap-2">
                {opportunity.skills?.map((skill: string) => (
                  <div key={skill} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border/60 hover:border-primary/30 transition-colors duration-300">
                    <Sparkles className="size-3 text-primary/60" />
                    <span className="text-[10px] font-bold text-foreground">{skill}</span>
                  </div>
                ))}
                {!opportunity.skills?.length && <span className="text-[10px] font-medium text-muted-foreground italic">No specific skills listed</span>}
               </div>
            </div>

            <div className="p-4 rounded-2xl bg-muted/20 border border-border/40 space-y-3">
               <div className="flex items-center gap-2 text-primary">
                 <Zap className="size-3 fill-current" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">Quick Highlight</span>
               </div>
               <p className="text-[11px] font-semibold text-muted-foreground leading-relaxed">
                 High priority role. {opportunity.type} positions at this level are currently in high demand.
               </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-border/30">
          <Link href={`/opportunities/${opportunity.id}`} className="group/link flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all duration-300">
            View Details
            <ChevronRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex gap-4">
            {opportunity.applicationLink && (
               <Button variant="outline" onClick={() => window.open(opportunity.applicationLink, "_blank")} className="rounded-2xl border-border hover:bg-muted text-xs font-bold gap-2 px-5 h-12 shadow-sm transition-all active:scale-95">
                 <Globe className="size-4" />
                 Company Site
               </Button>
            )}
            <Button
              onClick={handleQuickApply}
              disabled={isApplying || applied}
              className={cn(
                "rounded-2xl px-10 h-12 font-black text-xs uppercase tracking-widest transition-all duration-500 shadow-xl active:scale-95 group/btn overflow-hidden relative",
                applied 
                  ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                  : "bg-primary hover:bg-primary/95 text-white shadow-primary/20 hover:shadow-primary/40"
              )}
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              
              {isApplying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : applied ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Link Opened
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 fill-current" />
                  {opportunity.applicationLink ? "Quick Apply" : "Apply Now"}
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
