'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AcceptInvitationPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const email = params.get('email') || '';
  const token = params.get('token') || '';

  useEffect(() => {
    if (!token) setError('This invitation link is missing a token. Please request a new invitation.');
  }, [token]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      // Invitation acceptance would verify the token server-side in a full implementation.
      // For now, create the account with the provided password.
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) throw error;
      router.push('/login');
    } catch (e: any) {
      setError(e?.message || 'Could not accept invitation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-32 sm:pt-40 pb-24 min-h-screen flex items-start justify-center">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="rounded-2xl border border-border bg-card/50 p-8">
          <div className="flex items-center gap-2 text-xs text-primary">
            <ShieldCheck className="h-4 w-4" /> Invitation
          </div>
          <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight">Accept your invitation</h1>
          <p className="mt-1 text-sm text-muted-foreground">Set a password to activate your account for {email || 'your organisation'}.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full name</label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-input bg-background/60 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-background/60 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="At least 8 characters"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading || !token}
              className="group inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary text-primary-foreground font-semibold px-6 py-3.5 hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Activating…</> : <>Activate account <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}