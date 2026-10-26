'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Loader2, ArrowRight, MailCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
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
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) throw error;
      setSent(true);
    } catch (e: any) {
      setError(e?.message || 'Could not send reset email. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-32 sm:pt-40 pb-24 min-h-screen flex items-start justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="rounded-2xl border border-border bg-card/50 p-8">
          <h1 className="font-display text-2xl font-semibold tracking-tight">Reset your password</h1>
          <p className="mt-1 text-sm text-muted-foreground">We will email you a secure link to set a new password.</p>

          {sent ? (
            <div className="mt-6 rounded-xl border border-border bg-background/40 p-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary">
                <MailCheck className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">If an account exists for {email}, a reset link is on its way.</p>
              <Link href="/login" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                Back to login <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background/60 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="you@company.com"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary text-primary-foreground font-semibold px-6 py-3.5 hover:bg-primary/90 transition-colors disabled:opacity-60"
              >
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send reset link <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Back to login</Link>
          </div>
        </div>
      </div>
    </section>
  );
}