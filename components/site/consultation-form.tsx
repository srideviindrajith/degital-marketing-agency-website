'use client';

import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { services } from '@/lib/content';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(6, 'Please enter a phone number'),
  company: z.string().optional(),
  country: z.string().min(2, 'Please select a country'),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget'),
  message: z.string().min(10, 'Tell us a little about your project'),
});

type FormValues = z.infer<typeof schema>;

const budgets = [
  'Under ₹50,000 / $1,000',
  '₹50,000–₹1,50,000 / $1,000–$2,500',
  '₹1,50,000–₹4,00,000 / $2,500–$6,000',
  'Above ₹4,00,000 / $6,000+',
];

const countries = ['India', 'United Arab Emirates', 'United States', 'United Kingdom', 'Singapore', 'Australia', 'Germany', 'Other'];

export function ConsultationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setStatus('loading');
    setErrorMsg('');
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      const { error } = await supabase.from('contact_submissions').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        country: data.country,
        service_interest: data.service,
        budget_range: data.budget,
        message: data.message,
      });
      if (error) throw error;
      setStatus('success');
      reset();
    } catch (e: any) {
      setStatus('error');
      setErrorMsg(e?.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md p-10 text-center"
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold">Thank you — we will be in touch.</h3>
        <p className="mt-2 text-muted-foreground text-sm">
          A growth strategist will reply within one business day to schedule your call.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Submit another enquiry <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" error={errors.name?.message}>
          <input {...register('name')} className={inputCls} placeholder="Jane Doe" />
        </Field>
        <Field label="Work email" error={errors.email?.message}>
          <input {...register('email')} type="email" className={inputCls} placeholder="jane@company.com" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register('phone')} className={inputCls} placeholder="+91 98765 43210" />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input {...register('company')} className={inputCls} placeholder="Acme Inc." />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Country" error={errors.country?.message}>
          <select {...register('country')} className={inputCls}>
            <option value="">Select country</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Service of interest" error={errors.service?.message}>
          <select {...register('service')} className={inputCls}>
            <option value="">Select service</option>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Budget range" error={errors.budget?.message}>
        <select {...register('budget')} className={inputCls}>
          <option value="">Select budget</option>
          {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </Field>
      <Field label="Project description" error={errors.message?.message}>
        <textarea {...register('message')} rows={4} className={inputCls} placeholder="Tell us about your goals, timeline and what success looks like." />
      </Field>

      {status === 'error' && (
        <p className="text-sm text-destructive">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="group inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary/80 text-primary-foreground font-semibold px-6 py-3.5 hover:bg-primary/90 transition-all backdrop-blur-md border border-primary/30 disabled:opacity-60"
      >
        {status === 'loading' ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
        ) : (
          <>Book a Strategy Call <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
        )}
      </button>
      <p className="text-xs text-muted-foreground text-center">
        We reply within one business day. Your information is kept confidential.
      </p>
    </form>
  );
}

const inputCls =
  'w-full rounded-lg border border-white/25 bg-white/10 backdrop-blur-md px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</span>
      {children}
      {error && <span className="block mt-1 text-xs text-destructive">{error}</span>}
    </label>
  );
}