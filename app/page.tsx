"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { UserButton, UserProfile } from "@clerk/react";

export default function Home() {
  const { userId} = useAuth(); 
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Parasbhau 👮🏻
        </h1>

        {
          (!userId) ? (
          <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
        ) : (
          <div className="flex justify-center gap-4">
            <UserButton/>
          </div>
        )
        }
        
        
      </div>
    </main>
  );
}
