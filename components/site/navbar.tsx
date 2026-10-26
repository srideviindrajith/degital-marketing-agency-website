'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { navLinks, site } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled ? 'py-3' : 'py-5',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl px-4 sm:px-5 h-14 transition-all duration-500',
            scrolled ? 'glass-strong shadow-lg shadow-primary/15' : 'bg-transparent',
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 group" aria-label={`${site.name} home`}>
            <Logo />
            <span className="font-display font-semibold tracking-tight text-lg text-foreground">
              {site.name}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors',
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-secondary/80 ring-1 ring-border"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-2 transition-colors"
            >
              Client login
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 rounded-lg bg-primary/80 text-primary-foreground text-sm font-semibold px-4 py-2.5 hover:bg-primary/90 transition-all backdrop-blur-md border border-primary/30"
            >
              Book a call
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-foreground hover:bg-secondary transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-2"
          >
            <div className="glass-strong rounded-2xl p-3 shadow-xl shadow-primary/15">
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  Client login
                </Link>
                <Link
                  href="/contact"
                  className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary/80 text-primary-foreground text-sm font-semibold px-4 py-3 hover:bg-primary/90 backdrop-blur-md border border-primary/30"
                >
                  Book a call
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Logo() {
  return (
    <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2 shadow-[0_0_20px_-4px_hsl(var(--primary))]">
      <span className="absolute inset-[3px] rounded-md bg-background/95" />
      <span className="relative h-3.5 w-3.5 rounded-sm bg-gradient-to-br from-primary to-chart-2" />
    </span>
  );
}