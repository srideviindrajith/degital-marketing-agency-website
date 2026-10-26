import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="pt-32 sm:pt-40 pb-24 min-h-screen flex items-center justify-center">
      <div className="text-center px-4 max-w-lg">
        <div className="relative inline-block">
          <span className="font-display text-7xl sm:text-8xl font-semibold bg-gradient-to-r from-primary via-fuchsia-500 to-chart-2 bg-clip-text text-transparent text-glow">
            404
          </span>
          <div className="absolute -inset-4 bg-primary/10 blur-3xl -z-10 rounded-full" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight">This page drifted off the map.</h1>
        <p className="mt-3 text-muted-foreground text-pretty">
          The page you are looking for may have moved or never existed. Let us get you back on track.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold px-6 py-3.5 hover:bg-primary/90 transition-colors">
            <Home className="h-4 w-4" /> Back home
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/40 hover:bg-secondary text-foreground font-semibold px-6 py-3.5 transition-colors">
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}