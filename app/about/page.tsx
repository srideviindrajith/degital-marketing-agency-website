import Link from 'next/link';
import { ArrowRight, Target, Eye, Heart, Zap } from 'lucide-react';
import { team, site } from '@/lib/content';
import { SectionIntro, Process } from '@/components/site/sections';

export const metadata = {
  title: 'About',
  description: 'A growth agency built on transparency, craft and measurable outcomes.',
};

const values = [
  { icon: Target, title: 'Outcomes over output', desc: 'We optimise for what moves your business — not vanity metrics.' },
  { icon: Eye, title: 'Radical transparency', desc: 'You see everything: strategy, data, decisions and what did not work.' },
  { icon: Heart, title: 'Craft matters', desc: 'We sweat the details — copy, design, code, reporting — because quality compounds.' },
  { icon: Zap, title: 'Bias for speed', desc: 'We ship fast, learn fast, and double down on what works.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 sm:pt-40 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="About us"
            title="A growth agency built on transparency and craft."
            subtitle={`${site.name} was founded on a simple belief: brands deserve an agency that treats their growth like their own — with honesty, rigor and relentless focus on outcomes.`}
          />
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-background to-card p-10 sm:p-16 relative overflow-hidden">
            <div className="absolute -top-1/3 right-0 h-[50vh] w-[50vh] rounded-full bg-primary/10 blur-[140px]" />
            <div className="relative max-w-2xl">
              <div className="text-xs uppercase tracking-widest text-primary font-medium">Our mission</div>
              <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-balance">
                To help ambitious businesses turn attention into durable, profitable growth.
              </h2>
              <p className="mt-5 text-muted-foreground text-lg leading-relaxed text-pretty">
                We combine strategy, creative, technology and data into one connected growth engine — so our clients spend less time managing vendors and more time building their business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Our values</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card/40 p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary ring-1 ring-border text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />

      {/* Team */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">The team</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border bg-card/40 p-6 hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-secondary to-card ring-1 ring-border font-display font-semibold text-primary">
                    {m.initials}
                  </div>
                  <div>
                    <div className="font-display font-semibold">{m.name}</div>
                    <div className="text-xs text-primary">{m.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-card/40 p-10 sm:p-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-balance max-w-2xl">Why choose {site.name}</h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'One accountable team across strategy, media, creative and tech',
                'Transparent dashboards and monthly performance reports',
                'Senior strategists on every account, not junior pass-through',
                'Clear pricing and no lock-in contracts',
                'Disciplined testing and documentation',
                'Honest data status — no fabricated metrics',
              ].map((r) => (
                <div key={r} className="flex items-start gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {r}
                </div>
              ))}
            </div>
            <Link href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold px-6 py-3.5 hover:bg-primary/90 transition-colors">
              Work with us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}