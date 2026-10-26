import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { blogPosts } from '@/lib/content';
import { SectionIntro } from '@/components/site/sections';

export const metadata = {
  title: 'Insights',
  description: 'Articles on performance marketing, SEO, CRO and growth strategy.',
};

export default function InsightsPage() {
  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Insights"
          title="Ideas and playbooks for growth."
          subtitle="Field notes from our team on what is working across performance, SEO, CRO and lifecycle."
        />

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((p, i) => (
            <Link
              key={p.slug}
              href={`/insights/${p.slug}`}
              className="group block rounded-2xl border border-border bg-card/50 overflow-hidden hover:border-primary/40 transition-all"
            >
              <div className="relative aspect-[16/10] bg-gradient-to-br from-secondary via-card to-background grid place-items-center">
                <div className="absolute inset-0 bg-grid opacity-10" />
                <div className="relative text-muted-foreground/40 text-xs font-medium tracking-wide">{p.category}</div>
                {p.demo && <span className="absolute top-4 right-4 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-medium text-primary ring-1 ring-primary/30">Demo</span>}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="text-primary font-medium">{p.category}</span>
                  <span>·</span>
                  <span>{p.readTime}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">Read article <ArrowRight className="h-3.5 w-3.5" /></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}