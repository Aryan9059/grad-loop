import React from "react";
import { cn } from "@/lib/utils";

/** Brand mark — uses the same icon as the site favicon (public/logo.ico). */
export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.ico"
        alt="Grad Loop"
        className="w-full h-full min-w-6 min-h-6 object-contain rounded-md"
        draggable={false}
      />
    </div>
  );
};
