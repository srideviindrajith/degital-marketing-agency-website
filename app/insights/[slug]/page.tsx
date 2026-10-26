import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { blogPosts } from '@/lib/content';
import { ConsultationForm } from '@/components/site/consultation-form';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = blogPosts.find((x) => x.slug === params.slug);
  if (!p) return { title: 'Article not found' };
  return { title: p.title, description: p.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = blogPosts.find((x) => x.slug === params.slug);
  if (!p) notFound();

  return (
    <article className="pt-32 sm:pt-40 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/insights" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> All insights
        </Link>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="text-primary font-medium">{p.category}</span>
          <span>·</span>
          <span>{p.readTime}</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">{p.title}</h1>
        <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          {p.demo && <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary ring-1 ring-primary/30">Demo article</span>}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-12 prose-invert">
        <div className="space-y-6 text-foreground/90 leading-relaxed">
          <p className="text-lg text-muted-foreground">{p.excerpt}</p>
          <p>
            This is a demo article placeholder. In production this content is authored through the admin content editor and stored in the database. The full article body, headings, images and metadata would be rendered here from persisted records.
          </p>
          <h2 className="font-display text-xl font-semibold mt-8">Why this matters</h2>
          <p>
            We publish playbooks that come directly from client work — what we tested, what we learned and what we would do differently. Every article is written by practitioners, not ghostwriters.
          </p>
          <h2 className="font-display text-xl font-semibold mt-8">The takeaway</h2>
          <p>
            Growth is a system. The brands that win treat it that way — with clear strategy, disciplined execution and honest measurement. Connect your data sources, ship tests, and report against the metrics that actually matter to your business.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="rounded-2xl border border-border bg-card/40 p-8">
          <h2 className="font-display text-xl font-semibold">Want a growth plan like this?</h2>
          <p className="mt-2 text-sm text-muted-foreground">Book a strategy call and we will map your next 90 days.</p>
          <div className="mt-6">
            <ConsultationForm />
          </div>
        </div>
      </div>
    </article>
  );
}