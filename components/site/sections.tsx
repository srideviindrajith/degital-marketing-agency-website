'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Search,
  MapPin,
  Target,
  Megaphone,
  Share2,
  PenTool,
  Palette,
  Layout,
  TrendingUp,
  Mail,
  MessageCircle,
  CheckCircle2,
  Quote,
  Plus,
  Minus,
} from 'lucide-react';
import { useState } from 'react';
import { services, process, testimonials, faqs, caseStudies } from '@/lib/content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search, MapPin, Target, Megaphone, Share2, PenTool, Palette, Layout, TrendingUp, Mail, MessageCircle,
};

const fade = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function SectionIntro({ title, eyebrow, subtitle }: { title: string; eyebrow?: string; subtitle?: string }) {
  return (
    <motion.div {...fade} className="max-w-2xl">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-3">
          <span className="h-px w-6 bg-primary/60" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground text-lg text-pretty leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}

export function ServicesGrid() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="What we do"
          title="A full-funnel growth engine, under one roof."
          subtitle="Strategy, creative, media, content and technology — aligned to one goal: turning attention into measurable growth."
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Search;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative block h-full rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md p-6 hover:border-primary/40 hover:bg-card/30 transition-all overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary ring-1 ring-border text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{s.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.short}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FeaturedWork() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 -z-10 bg-dots opacity-[0.05] mask-fade-b" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionIntro eyebrow="Selected work" title="Results we are proud to show." />
          <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            View all case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {caseStudies.slice(0, 4).map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            >
              <Link href={`/portfolio/${c.slug}`} className="group block rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md overflow-hidden hover:border-primary/40 transition-all">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <CaseImage query={c.imageQuery} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="rounded-full bg-background/80 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-foreground ring-1 ring-border">
                      {c.service}
                    </span>
                    {c.demo && (
                      <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-primary ring-1 ring-primary/30">
                        Demo
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-muted-foreground">{c.industry}</div>
                  <h3 className="mt-1 font-display text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.summary}</p>
                  <div className="mt-5 flex items-center gap-5">
                    {c.outcomes.slice(0, 3).map((o) => (
                      <div key={o.label}>
                        <div className="font-display text-lg font-semibold text-foreground">{o.value}</div>
                        <div className="text-[11px] text-muted-foreground">{o.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseImage({ query }: { query: string }) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-secondary via-card to-background grid place-items-center">
      <div className="text-muted-foreground/40 text-sm font-medium tracking-wide">{query}</div>
    </div>
  );
}

export function Process() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro eyebrow="How we work" title="A clear, accountable process." subtitle="No black boxes. You will always know what we are doing, why, and what it is delivering." />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md p-6 hover:border-primary/40 transition-colors"
            >
              <div className="font-display text-4xl font-semibold text-primary/30">{p.step}</div>
              <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro eyebrow="Trust" title="What clients say about working with us." />
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="relative rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md p-8"
            >
              <Quote className="h-8 w-8 text-primary/30" />
              <blockquote className="mt-4 text-lg leading-relaxed text-foreground/90 text-pretty">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary ring-1 ring-border font-display font-semibold text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionIntro eyebrow="FAQ" title="Questions, answered." />
        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-foreground">{f.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-10 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fade}
          className="relative overflow-hidden rounded-3xl border border-white/20 bg-card/25 backdrop-blur-md p-10 sm:p-16 text-center"
        >
          <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[60vh] w-[60vh] rounded-full bg-primary/15 blur-[140px]" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              Let&apos;s build your growth engine.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
              Book a 30-minute strategy call. We will map your funnel, your channels and your next 90 days — no strings attached.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary/80 text-primary-foreground font-semibold px-6 py-3.5 hover:bg-primary/90 transition-all backdrop-blur-md border border-primary/30 glow-primary">
                Book a Strategy Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/pricing" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-foreground font-semibold px-6 py-3.5 transition-all backdrop-blur-md">
                See pricing
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const items = [
    'Google Ads Partner',
    'Meta Business Partner',
    'Klaviyo Partner',
    'Shopify Partner',
    'HubSpot Solutions Partner',
  ];
  return (
    <section className="py-10 border-y border-white/20 bg-card/25 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Trusted partnerships
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {items.map((i) => (
              <span key={i} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary/70" />
                {i}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}