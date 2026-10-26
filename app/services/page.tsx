import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/content';
import { SectionIntro } from '@/components/site/sections';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search: (p) => <span {...p}>S</span>,
};

export const metadata = {
  title: 'Services',
  description: 'Full-funnel digital marketing services: SEO, Google Ads, Meta Ads, social, content, branding, web design, CRO, email and WhatsApp.',
};

export default function ServicesPage() {
  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Services"
          title="Everything you need to grow, in one place."
          subtitle="From organic and paid acquisition to creative, content and conversion — each service is delivered by specialists and aligned to commercial outcomes."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative block h-full rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md p-6 hover:border-primary/40 hover:bg-card/30 transition-all overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <h3 className="font-display text-lg font-semibold tracking-tight">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.short}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}