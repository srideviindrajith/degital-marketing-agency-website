'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Users, FolderKanban, Megaphone, FileText, Mail, CreditCard, LifeBuoy, ArrowRight, Bell, Search } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push('/login');
      } else {
        setAuthed(true);
        setEmail(data.session.user.email ?? null);
      }
    });
  }, [router]);

  if (!authed) return <div className="pt-40 pb-24 text-center text-muted-foreground">Checking your session…</div>;

  return (
    <div className="pt-24 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary font-medium">Admin dashboard</div>
            <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight">Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <input className="bg-transparent outline-none placeholder:text-muted-foreground/60" placeholder="Search…" />
            </div>
            <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50 text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary ring-1 ring-border font-display font-semibold text-sm">
              {email?.[0]?.toUpperCase() ?? 'A'}
            </div>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-2xl border border-border bg-card/50 p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{m.label}</div>
                <m.icon className="h-4 w-4 text-primary/70" />
              </div>
              <div className="mt-3 font-display text-2xl font-semibold">{m.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{m.note}</div>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="rounded-2xl border border-border bg-card/50 p-6">
            <h2 className="font-display text-lg font-semibold">Recent enquiries</h2>
            <p className="mt-1 text-xs text-muted-foreground">Pulled live from your database when submissions arrive.</p>
            <div className="mt-5 space-y-3">
              {recentEnquiries.map((e) => (
                <div key={e.name} className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3">
                  <div>
                    <div className="text-sm font-medium">{e.name}</div>
                    <div className="text-xs text-muted-foreground">{e.service} · {e.country}</div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${e.status === 'New' ? 'bg-primary/15 text-primary ring-1 ring-primary/30' : 'bg-secondary text-muted-foreground'}`}>
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/50 p-6">
            <h2 className="font-display text-lg font-semibold">Modules</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {modules.map((m) => (
                <Link key={m.label} href="#" className="group rounded-xl border border-border bg-background/40 p-4 hover:border-primary/40 transition-colors">
                  <m.icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-sm font-medium">{m.label}</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">
                    Open <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card/30 p-6 text-sm text-muted-foreground">
          This is the admin overview. The CRM, project management, client portal, billing and automation modules are the next build phases.
        </div>
      </div>
    </div>
  );
}

const metrics = [
  { label: 'Total leads', value: '0', note: 'No submissions yet', icon: Users },
  { label: 'Active clients', value: '0', note: 'Awaiting first client', icon: FolderKanban },
  { label: 'Active projects', value: '0', note: '—', icon: Megaphone },
  { label: 'Outstanding invoices', value: '₹0', note: '—', icon: CreditCard },
];

const recentEnquiries = [
  { name: 'No submissions yet', service: '—', country: '—', status: 'New' },
];

const modules = [
  { label: 'CRM & Leads', icon: Users },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Campaigns', icon: Megaphone },
  { label: 'Reports', icon: FileText },
  { label: 'Enquiries', icon: Mail },
  { label: 'Billing', icon: CreditCard },
  { label: 'Support', icon: LifeBuoy },
];