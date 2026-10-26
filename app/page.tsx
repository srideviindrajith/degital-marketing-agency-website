import { Hero } from '@/components/site/hero';
import {
  ServicesGrid,
  FeaturedWork,
  Process,
  Testimonials,
  FaqSection,
  CtaBanner,
  TrustBar,
} from '@/components/site/sections';
import { ConsultationForm } from '@/components/site/consultation-form';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <FeaturedWork />
      <Process />
      <Testimonials />

      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-primary mb-3">
              <span className="h-px w-6 bg-primary/60" />
              Start here
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              Book a free strategy call.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg text-pretty leading-relaxed">
              Tell us where you want to grow. We will respond within one business day with a tailored next step — whether that is working together or not.
            </p>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> 30-minute discovery call</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Funnel and channel review</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> A 90-day growth plan</div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 p-6 sm:p-8">
            <ConsultationForm />
          </div>
        </div>
      </section>

      <FaqSection />
      <CtaBanner />
    </>
  );
}