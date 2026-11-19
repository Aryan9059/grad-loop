"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Handshake, Search, Building2, Loader2, Send, Inbox, X, Check, Clock } from "lucide-react";
import type { getReferralData } from "@/lib/data";

type ReferralData = NonNullable<Awaited<ReturnType<typeof getReferralData>>>;
type StudentData = Extract<ReferralData, { role: "STUDENT" }>;
type AlumniData = Extract<ReferralData, { role: "ALUMNI" }>;
type Person = StudentData["alumni"][number];

const AVATAR_COLORS = [
  "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
  "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400",
  "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
  "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
];

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Reviewed: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Referred: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Not Now": "bg-muted text-muted-foreground",
};

const fullName = (p: Person) => [p.firstName, p.lastName].filter(Boolean).join(" ") || "User";

function Avatar({ person, index }: { person: Person; index: number }) {
  const name = fullName(person);
  if (person.profile_photo) {
    return <img src={person.profile_photo} alt={name} className="h-12 w-12 rounded-xl object-cover shrink-0 ring-1 ring-inset ring-black/5" />;
  }
  return (
    <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold shrink-0 ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}>
      {name.split(" ").map((n) => n[0]).join("")}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold ${STATUS_STYLES[status] ?? STATUS_STYLES.Pending}`}>
      {status === "Pending" && <Clock className="h-3 w-3" />}
      {status === "Referred" && <Check className="h-3 w-3" />}
      {status}
    </span>
  );
}

function PersonLine({ person, index }: { person: Person; index: number }) {
  return (
    <Link href={person.clerkId ? `/u/${person.clerkId}` : "#"} className="flex items-center gap-3 min-w-0 group">
      <Avatar person={person} index={index} />
      <div className="min-w-0">
        <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">{fullName(person)}</p>
        <p className="text-xs text-muted-foreground truncate">
          {[person.roleTitle, person.company].filter(Boolean).join(" @ ") || "Alum"}
          {person.graduationYear ? ` · '${String(person.graduationYear).slice(-2)}` : ""}
        </p>
      </div>
    </Link>
  );
}

export default function ReferralsView({ data }: { data: ReferralData }) {
  return (
    <div className="flex flex-col h-full w-full p-6 sm:p-10 overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
            <Handshake className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            {data.role === "ALUMNI" ? "Referral Requests" : "Ask a Referral"}
          </h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base mt-1 ml-1">
          {data.role === "ALUMNI"
            ? `Students from ${data.universityName} asking you for a referral.`
            : `Request a referral from ${data.universityName} alumni at their company.`}
        </p>
      </div>

      {data.role === "ALUMNI" ? <AlumniView data={data} /> : <StudentView data={data} />}
    </div>
  );
}

/* ---------------- Student: browse alumni + track requests ---------------- */

function StudentView({ data }: { data: StudentData }) {
  const router = useRouter();
  const [tab, setTab] = useState<"alumni" | "requests">("alumni");
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState<Person | null>(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const pendingWith = new Set(data.sent.filter((s) => s.status === "Pending" && !s.opportunityTitle).map((s) => s.referrer.id));

  const q = query.toLowerCase();
  const alumni = data.alumni.filter((a) =>
    !q || `${fullName(a)} ${a.company ?? ""} ${a.roleTitle ?? ""}`.toLowerCase().includes(q)
  );

  const submit = async () => {
    if (!target) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alumniId: target.id, message }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send request");
      setTarget(null);
      setMessage("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send request");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="flex gap-1 p-1 bg-muted/50 rounded-xl w-fit">
          {(["alumni", "requests"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer capitalize ${
                tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "requests" ? "My Requests" : "Alumni"}
              {t === "requests" && data.sent.length > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-primary text-white text-[10px] font-bold">
                  {data.sent.length}
                </span>
              )}
            </button>
          ))}
        </div>
        {tab === "alumni" && (
          <div className="relative sm:ml-auto sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or company..."
              className="w-full bg-muted/40 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none border border-border/50 focus:border-primary/30 focus:bg-card transition-all"
            />
          </div>
        )}
      </div>

      {tab === "alumni" ? (
        alumni.length === 0 ? (
          <Empty icon={<Building2 className="h-6 w-6" />} title="No alumni found" text={query ? "Try a different search." : "No alumni from your university have joined yet."} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {alumni.map((a, i) => {
              const isPending = pendingWith.has(a.id);
              return (
                <div key={a.id} className="soft-card p-4 flex flex-col gap-4">
                  <PersonLine person={a} index={i} />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" />
                    <span className="truncate">{a.company || "No company listed"}</span>
                  </div>
                  <button
                    disabled={!a.company || isPending}
                    onClick={() => { setTarget(a); setError(""); }}
                    className="mt-auto h-9 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {isPending ? "Request pending" : a.company ? `Ask for referral at ${a.company}` : "No company listed"}
                  </button>
                </div>
              );
            })}
          </div>
        )
      ) : data.sent.length === 0 ? (
        <Empty icon={<Send className="h-6 w-6" />} title="No requests yet" text="Ask an alum for a referral and track it here." />
      ) : (
        <div className="space-y-3">
          {data.sent.map((r, i) => (
            <div key={r.id} className="soft-card p-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <PersonLine person={r.referrer} index={i} />
              <div className="sm:ml-auto flex items-center gap-3 text-xs text-muted-foreground">
                <span className="truncate">{r.opportunityTitle ? `Opportunity: ${r.opportunityTitle}` : r.company}</span>
                <StatusBadge status={r.status} />
              </div>
            </div>
          ))}
        </div>
      )}

      {target && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setTarget(null)}>
          <div className="bg-card w-full max-w-md rounded-3xl shadow-2xl border border-border p-6 space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold">Request a referral</h2>
                <p className="text-sm text-muted-foreground">
                  {fullName(target)} · {target.company}
                </p>
              </div>
              <button onClick={() => setTarget(null)} className="p-2 rounded-full hover:bg-muted transition-colors cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              maxLength={1000}
              placeholder="Introduce yourself and mention the role you're interested in..."
              className="w-full bg-muted/40 rounded-xl px-4 py-2.5 text-sm outline-none border border-border/50 focus:border-primary/30 focus:bg-card transition-all resize-none"
            />
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <button
              onClick={submit}
              disabled={sending}
              className="w-full h-11 rounded-xl font-semibold bg-primary text-white hover:bg-primary/90 disabled:opacity-60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Send request
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------------- Alumni: see and respond to requests ---------------- */

function AlumniView({ data }: { data: AlumniData }) {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);

  const setStatus = async (id: number, status: string) => {
    setLoading(id);
    try {
      await fetch(`/api/referrals/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  const startChat = async (targetUserId: number) => {
    const res = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetUserId }),
    });
    const json = await res.json();
    if (json.conversationId) router.push(`/chats/${json.conversationId}`);
  };

  if (data.received.length === 0) {
    return <Empty icon={<Inbox className="h-6 w-6" />} title="No referral requests yet" text="When students ask you for a referral, they'll show up here." />;
  }

  return (
    <div className="space-y-3">
      {data.received.map((r, i) => (
        <div key={r.id} className="soft-card p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <PersonLine person={r.requestor} index={i} />
            <div className="sm:ml-auto flex items-center gap-3 text-xs text-muted-foreground">
              <span>{r.opportunityTitle ? `For: ${r.opportunityTitle}` : `At ${r.company}`}</span>
              <span>· {new Date(r.createdAt).toLocaleDateString()}</span>
              <StatusBadge status={r.status} />
            </div>
          </div>

          {r.message && <p className="text-sm text-foreground/80 bg-muted/40 rounded-xl p-3 whitespace-pre-wrap">{r.message}</p>}

          <div className="flex flex-wrap gap-2">
            {r.status !== "Referred" && (
              <button
                disabled={loading === r.id}
                onClick={() => setStatus(r.id, "Referred")}
                className="h-9 px-4 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 disabled:opacity-60 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {loading === r.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                Mark as referred
              </button>
            )}
            {r.status === "Pending" && (
              <button
                disabled={loading === r.id}
                onClick={() => setStatus(r.id, "Not Now")}
                className="h-9 px-4 rounded-lg text-sm font-semibold bg-muted text-foreground hover:bg-muted/70 disabled:opacity-60 transition-colors cursor-pointer"
              >
                Not now
              </button>
            )}
            <button
              onClick={() => startChat(r.requestor.id)}
              className="h-9 px-4 rounded-lg text-sm font-semibold border border-border hover:bg-muted transition-colors cursor-pointer"
            >
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Empty({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <div className="p-4 rounded-2xl bg-muted text-muted-foreground">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mt-4">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{text}</p>
    </div>
  );
}
