import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building2, GraduationCap, MapPin, Search, LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user || !user.domain) {
    redirect("/onboarding");
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background overflow-hidden">
      {/* Sign Out Button Fixed Top Right */}
      <div className="absolute top-4 right-4 z-50 sm:top-8 sm:right-8">
        <SignOutButton>
          <Button variant="outline" size="sm" className="gap-2 backdrop-blur-md bg-background/50 hover:bg-muted text-muted-foreground shadow-sm">
             <LogOut className="size-4" />
             Sign out
          </Button>
        </SignOutButton>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      <div className="z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        {/* Banner Section */}
        <div className="relative h-32 w-full bg-linear-to-r from-primary/80 to-primary sm:h-48">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        </div>
        
        <div className="relative px-6 pb-8 pt-16 sm:px-12 sm:pb-12">
          {/* Avatar / Profile Initial Badge */}
          <div className="absolute -top-16 left-6 sm:-top-20 sm:left-12">
            <div className="flex size-32 items-center justify-center rounded-full border-4 border-card bg-muted text-5xl font-bold text-muted-foreground shadow-lg sm:size-40 sm:text-6xl">
               {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
            </div>
            {user.openToConnect && (
               <div className="absolute bottom-0 right-4 rounded-full border-4 border-card bg-emerald-500 size-6 sm:bottom-2 sm:right-6 sm:size-8 shadow-sm" title="Open to Connect"></div>
            )}
          </div>

          <div className="flex flex-col gap-6 pt-20 sm:flex-row sm:items-start sm:justify-between sm:pt-24">
            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                {user.firstName} {user.lastName}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-medium text-primary">{user.role}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="size-4" />
                  Class of {user.graduationYear}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <Badge variant="secondary" className="px-3 py-1 font-medium bg-primary/10 text-primary hover:bg-primary/20">
                {user.domain}
              </Badge>
            </div>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
             <div className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight">Experience & Focus</h2>
                
                <div className="space-y-3">
                   {user.company && (
                      <div className="flex items-start gap-3">
                         <div className="rounded-md bg-muted p-2 text-muted-foreground">
                            <Building2 className="size-4" />
                         </div>
                         <div>
                            <p className="text-sm font-medium leading-none">{user.company}</p>
                            <p className="text-sm text-muted-foreground">Current Company</p>
                         </div>
                      </div>
                   )}
                   {user.roleTitle && (
                      <div className="flex items-start gap-3">
                         <div className="rounded-md bg-muted p-2 text-muted-foreground">
                            <Briefcase className="size-4" />
                         </div>
                         <div>
                            <p className="text-sm font-medium leading-none">{user.roleTitle}</p>
                            <p className="text-sm text-muted-foreground">Role</p>
                         </div>
                      </div>
                   )}
                   {!user.company && !user.roleTitle && (
                       <div className="flex items-start gap-3 opacity-60">
                         <div className="rounded-md bg-muted p-2 text-muted-foreground">
                            <Search className="size-4" />
                         </div>
                         <div>
                            <p className="text-sm font-medium leading-none">Exploring Opportunities</p>
                            <p className="text-sm text-muted-foreground">Open to new roles</p>
                         </div>
                      </div>
                   )}
                </div>
             </div>

             <div className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight">Technical Skills</h2>
                <div className="flex flex-wrap gap-2">
                   {(user.skills ?? []).map((skill) => (
                       <Badge key={skill} variant="outline" className="rounded-md border-primary/20 bg-primary/5 px-2.5 py-1 text-sm font-medium text-primary hover:bg-primary/10 transition-colors">
                           {skill}
                       </Badge>
                   ))}
                </div>
             </div>
          </div>

          {user.openToConnect && (
            <div className="mt-8 rounded-xl border border-border/50 bg-muted/50 p-4">
               <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                     <MapPin className="size-5" />
                  </div>
                  <div>
                     <p className="text-sm font-medium">Open for Connections</p>
                     <p className="text-xs text-muted-foreground">{user.firstName} is welcoming connection requests and messages.</p>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
