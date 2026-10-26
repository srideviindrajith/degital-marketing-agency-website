import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { packages } from '@/lib/content';
import { SectionIntro } from '@/components/site/sections';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Pricing',
  description: 'Transparent monthly retainers for growth-focused brands. Starter, Growth and Premium packages with optional add-ons.',
};

function formatPrice(p: (typeof packages)[number]) {
  const symbol = p.currency === 'INR' ? '₹' : '$';
  const value = p.currency === 'INR' ? p.price.toLocaleString('en-IN') : Math.round(p.price / 83).toLocaleString('en-US');
  return `${symbol}${value}`;
}

export default function PricingPage() {
  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Pricing"
          title="Clear packages. No lock-in."
          subtitle="Monthly retainers with clearly defined scope. Cancel any time with 30 days notice. Custom quotes available for project-based work."
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-4 items-start">
          {packages.map((p) => (
            <div
              key={p.name}
              className={cn(
                'relative rounded-2xl border p-8 transition-colors backdrop-blur-md',
                p.highlighted ? 'border-primary/50 bg-card/30 glow-primary' : 'border-white/20 bg-card/25',
              )}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary text-primary-foreground text-xs font-semibold px-3 py-1">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold">{formatPrice(p)}</span>
                <span className="text-sm text-muted-foreground">/{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={cn(
                  'mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all backdrop-blur-md',
                  p.highlighted ? 'bg-primary/80 text-primary-foreground hover:bg-primary/90 border border-primary/30' : 'border border-white/30 bg-white/10 hover:bg-white/20 text-foreground',
                )}
              >
                {p.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mt-16 rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md p-8">
          <h2 className="font-display text-xl font-semibold">Optional add-ons</h2>
          <p className="mt-2 text-sm text-muted-foreground">Available on any package or as one-time projects.</p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Additional channel', price: 'From ₹15,000/mo', note: 'Add another growth channel to any package' },
              { name: 'Creative production', price: 'From ₹20,000/mo', note: 'Static, motion and UGC-style ad creatives' },
              { name: 'Website build', price: 'Custom quote', note: 'Conversion-focused Next.js site' },
              { name: 'Brand identity', price: 'From ₹1,50,000', note: 'Logo, system and guidelines' },
              { name: 'CRO program', price: 'From ₹40,000/mo', note: 'Structured experimentation' },
              { name: 'Reporting dashboard', price: 'From ₹15,000', note: 'Live Looker Studio / custom build' },
            ].map((a) => (
              <div key={a.name} className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-5">
                <div className="font-medium">{a.name}</div>
                <div className="mt-1 text-sm text-primary font-medium">{a.price}</div>
                <div className="mt-1 text-xs text-muted-foreground">{a.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom quote */}
        <div className="mt-12 rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-balance">Need a custom engagement?</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">For multi-market programs, project work or enterprise retainers, request a tailored quote.</p>
          <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary/80 text-primary-foreground font-semibold px-6 py-3.5 hover:bg-primary/90 transition-all backdrop-blur-md border border-primary/30">
            Request a quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Terms */}
        <div className="mt-12 grid sm:grid-cols-2 gap-6 text-sm text-muted-foreground">
          <div className="rounded-xl border border-white/20 bg-card/25 backdrop-blur-md p-6">
            <h3 className="text-foreground font-medium mb-2">What is included</h3>
            <ul className="space-y-2">
              <li>– Dedicated account lead</li>
              <li>– Monthly strategy sessions</li>
              <li>– Live performance reporting</li>
              <li>– Transparent communication</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/20 bg-card/25 backdrop-blur-md p-6">
            <h3 className="text-foreground font-medium mb-2">Service limitations</h3>
            <ul className="space-y-2">
              <li>– Ad spend and platform fees billed separately</li>
              <li>– Third-party assets and tools at cost</li>
              <li>– Revisions per scope document</li>
              <li>– 30-day notice for cancellation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}