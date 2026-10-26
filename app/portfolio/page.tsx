'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { caseStudies, services } from '@/lib/content';
import { SectionIntro } from '@/components/site/sections';
import { cn } from '@/lib/utils';

const industries = ['All', ...Array.from(new Set(caseStudies.map((c) => c.industry)))];
const serviceFilters = ['All', ...Array.from(new Set(caseStudies.map((c) => c.service)))];

export default function PortfolioPage() {
  const [industry, setIndustry] = useState('All');
  const [service, setService] = useState('All');

  const filtered = useMemo(
    () =>
      caseStudies.filter(
        (c) =>
          (industry === 'All' || c.industry === industry) &&
          (service === 'All' || c.service === service),
      ),
    [industry, service],
  );

  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Selected work"
          title="Case studies built on outcomes."
          subtitle="Every project below is labelled clearly. Demo cases illustrate our methodology and reporting; verified client results carry their source."
        />

        {/* Filters */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterRow label="Industry" options={industries} value={industry} onChange={setIndustry} />
          <FilterRow label="Service" options={serviceFilters} value={service} onChange={setService} />
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {filtered.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
            >
              <Link
                href={`/portfolio/${c.slug}`}
                className="group block rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md overflow-hidden hover:border-primary/40 transition-all"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-secondary via-card to-background grid place-items-center">
                  <div className="text-muted-foreground/40 text-sm font-medium tracking-wide">{c.imageQuery}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-[11px] font-medium ring-1 ring-border">{c.service}</span>
                    {c.demo && <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-primary ring-1 ring-primary/30">Demo</span>}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-muted-foreground">{c.industry}</div>
                  <h3 className="mt-1 font-display text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.summary}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">View case study <ArrowRight className="h-3.5 w-3.5" /></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-muted-foreground">No case studies match these filters.</div>
        )}
      </div>
    </section>
  );
}

function FilterRow({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-1">
      <span className="text-xs uppercase tracking-wider text-muted-foreground shrink-0">{label}</span>
      <div className="flex gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap backdrop-blur-md',
              value === o ? 'bg-primary/80 text-primary-foreground border border-primary/30' : 'bg-white/10 text-muted-foreground hover:text-foreground border border-white/20',
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}