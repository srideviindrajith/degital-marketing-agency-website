import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { services } from '@/lib/content';
import { ConsultationForm } from '@/components/site/consultation-form';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Service not found' };
  return {
    title: service.name,
    description: service.summary,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <article>
      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 h-[50vh] w-[50vh] rounded-full bg-primary/15 blur-[140px]" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> All services
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
              Service
            </div>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
              {service.name}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground text-pretty leading-relaxed">{service.summary}</p>
          </div>
        </div>
      </section>

      {/* Benefits + Deliverables */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div className="rounded-2xl border border-border bg-card/40 p-8">
            <h2 className="font-display text-xl font-semibold">Benefits</h2>
            <ul className="mt-5 space-y-3">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground/90">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-8">
            <h2 className="font-display text-xl font-semibold">Deliverables</h2>
            <ul className="mt-5 space-y-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-foreground/90">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Our process</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {service.process.map((p, i) => (
              <div key={p} className="relative rounded-2xl border border-border bg-card/40 p-6">
                <div className="font-display text-3xl font-semibold text-primary/30">{String(i + 1).padStart(2, '0')}</div>
                <p className="mt-3 text-sm font-medium">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">FAQs</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {service.faqs.map((f) => (
              <div key={f.q} className="py-5">
                <div className="font-medium">{f.q}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed pr-6">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / form */}
      <section className="py-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
              Explore this for your business.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg text-pretty leading-relaxed">
              Tell us where you want to grow. We will respond with a tailored plan and clear next steps.
            </p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              Or contact us directly <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </article>
  );
}