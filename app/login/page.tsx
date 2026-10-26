'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push('/admin');
    } catch (e: any) {
      setError(e?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-32 sm:pt-40 pb-24 min-h-screen flex items-start justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2">
              <span className="absolute inset-[3px] rounded-md bg-background/95" />
              <span className="relative h-3.5 w-3.5 rounded-sm bg-gradient-to-br from-primary to-chart-2" />
            </span>
            <span className="font-display font-semibold tracking-tight text-lg">Lumen</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md p-8">
          <h1 className="font-display text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Access your dashboard or client portal.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/25 bg-white/10 backdrop-blur-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/25 bg-white/10 backdrop-blur-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary/80 text-primary-foreground font-semibold px-6 py-3.5 hover:bg-primary/90 transition-all backdrop-blur-md border border-primary/30 disabled:opacity-60"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <Link href="/forgot-password" className="text-muted-foreground hover:text-foreground transition-colors">
              Forgot password?
            </Link>
            <span className="text-muted-foreground">
              No account? <Link href="/contact" className="text-primary hover:underline">Talk to us</Link>
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary/70" />
          Invitation-based access · Secure sessions
        </div>
      </div>
    </section>
  );
}