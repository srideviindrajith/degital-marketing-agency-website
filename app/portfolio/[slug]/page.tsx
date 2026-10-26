import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { caseStudies } from '@/lib/content';
import { ConsultationForm } from '@/components/site/consultation-form';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = caseStudies.find((x) => x.slug === params.slug);
  if (!c) return { title: 'Case study not found' };
  return { title: c.title, description: c.summary };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = caseStudies.find((x) => x.slug === params.slug);
  if (!c) notFound();

  return (
    <article>
      <section className="pt-32 sm:pt-40 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">{c.industry}</span>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">{c.service}</span>
              {c.demo && <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/30">Demo case study</span>}
            </div>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">{c.title}</h1>
            <p className="mt-5 text-lg text-muted-foreground text-pretty leading-relaxed">{c.summary}</p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[21/9] rounded-3xl border border-border bg-gradient-to-br from-secondary via-card to-background grid place-items-center overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="relative text-muted-foreground/40 font-medium tracking-wide">{c.imageQuery}</div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div className="rounded-2xl border border-border bg-card/40 p-8">
            <h2 className="font-display text-xl font-semibold">Objectives</h2>
            <ul className="mt-5 space-y-3">
              {c.objectives.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />{o}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-8">
            <h2 className="font-display text-xl font-semibold">Approach</h2>
            <ul className="mt-5 space-y-3">
              {c.approach.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm"><CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Outcomes</h2>
          {c.demo && (
            <p className="mt-2 text-xs text-muted-foreground">Figures shown are illustrative demo data to demonstrate our reporting format.</p>
          )}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {c.outcomes.map((o) => (
              <div key={o.label} className="rounded-2xl border border-border bg-card/40 p-6">
                <div className="font-display text-3xl font-semibold text-primary">{o.value}</div>
                <div className="mt-1 text-sm font-medium">{o.label}</div>
                <div className="text-xs text-muted-foreground">{o.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance">Want results like these?</h2>
            <p className="mt-4 text-muted-foreground text-lg text-pretty">Let us map your funnel and build a plan to get there.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </article>
  );
}