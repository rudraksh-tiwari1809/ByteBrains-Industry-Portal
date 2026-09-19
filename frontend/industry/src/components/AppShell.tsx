import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, LogOut, Search } from "lucide-react";
import type { ReactNode } from "react";
import { clearStoredCompany } from "@/lib/auth";

const nav = [
  { to: "/industry", label: "Dashboard" },
  { to: "/internships", label: "Internships" },
  { to: "/analytics", label: "Analytics" },
  { to: "/communication", label: "Applications" },
] as const;

export function AppShell({ children, user }: { children: ReactNode; user?: { name: string; meta: string; initials: string } }) {
  const navigate = useNavigate();
  const safeUser = user ?? { name: "Industry Partner", meta: "Employer account", initials: "IP" };
  function logout() { clearStoredCompany(); navigate({ to: "/login" }); }
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center gap-6 px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md border border-border bg-primary font-display text-lg text-primary-foreground">A</span>
            <span className="leading-tight"><span className="block font-display text-lg font-semibold text-foreground">AICP</span><span className="block text-[10px] tracking-[0.14em] text-muted-foreground uppercase">Industry Portal</span></span>
          </Link>
          <div className="ml-auto hidden items-center gap-3 md:flex">
            <label className="flex h-10 w-[320px] items-center gap-2 rounded-full border border-border bg-background px-4">
              <Search className="size-4 text-muted-foreground" /><input className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Search internships, applications..." />
            </label>
            <button aria-label="Notifications" className="relative flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"><Bell className="size-[18px]" /></button>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-primary">{safeUser.initials}</span>
            <span className="hidden leading-tight sm:block"><span className="block text-sm font-medium text-foreground">{safeUser.name}</span><span className="block text-xs text-muted-foreground">{safeUser.meta}</span></span>
            <button onClick={logout} aria-label="Sign out" title="Sign out" className="flex h-9 items-center gap-1.5 rounded-full px-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"><LogOut className="size-[16px]" /><span className="hidden md:block">Sign out</span></button>
          </div>
        </div>
      </header>
      <nav className="bg-primary"><div className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-6">{nav.map((item) => <Link key={item.to} to={item.to} activeProps={{ className: "border-accent text-primary-foreground" }} inactiveProps={{ className: "border-transparent text-primary-foreground/70" }} className="border-b-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap hover:text-primary-foreground">{item.label}</Link>)}</div></nav>
      <main className="mx-auto max-w-[1440px] px-6 py-10">{children}</main>
    </div>
  );
}

export function PageHeading({ title, subtitle }: { title: string; subtitle: string }) { return <div className="mb-8"><h1 className="font-display text-[2.35rem] leading-tight font-semibold text-foreground">{title}</h1><div className="mt-3 h-px w-14 bg-accent" /><p className="mt-4 text-[15px] text-muted-foreground">{subtitle}</p></div>; }
export function StatCard({ label, value, suffix, note }: { label: string; value: string; suffix?: string; note: string }) { return <div className="rounded-md border border-border bg-card p-6 shadow-card"><p className="text-[11px] tracking-[0.12em] text-muted-foreground uppercase">{label}</p><p className="mt-3 font-display text-[2rem] leading-none font-semibold text-foreground">{value}{suffix ? <span className="text-lg text-muted-foreground">{suffix}</span> : null}</p><p className="mt-3 text-sm text-muted-foreground">{note}</p></div>; }
export function Section({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) { return <section><div className="mb-4 flex items-baseline justify-between gap-4"><h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>{action ? <span className="text-sm text-accent-foreground/80">{action}</span> : null}</div>{children}</section>; }
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`rounded-md border border-border bg-card shadow-card ${className}`}>{children}</div>; }
export function Bar({ label, value }: { label: string; value: number }) { return <div className="border-b border-border px-5 py-4 last:border-0"><div className="mb-2 flex items-center justify-between text-sm"><span>{label}</span><span className="text-muted-foreground">{value}%</span></div><div className="h-1.5 w-full rounded-full bg-muted"><div className="h-1.5 rounded-full bg-primary" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div></div>; }
