import Link from 'next/link';
import { Linkedin, Twitter, Instagram, Youtube, ArrowUpRight } from 'lucide-react';
import { site, services, navLinks } from '@/lib/content';

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2">
                <span className="absolute inset-[3px] rounded-md bg-background/95" />
                <span className="relative h-3.5 w-3.5 rounded-sm bg-gradient-to-br from-primary to-chart-2" />
              </span>
              <span className="font-display font-semibold tracking-tight text-lg">{site.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {site.description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <Social href={site.social.linkedin} label="LinkedIn"><Linkedin className="h-4 w-4" /></Social>
              <Social href={site.social.twitter} label="Twitter"><Twitter className="h-4 w-4" /></Social>
              <Social href={site.social.instagram} label="Instagram"><Instagram className="h-4 w-4" /></Social>
              <Social href={site.social.youtube} label="YouTube"><Youtube className="h-4 w-4" /></Social>
            </div>
          </div>

          <FooterCol title="Company">
            {navLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Services">
            {services.slice(0, 6).map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>{s.name}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Contact">
            <FooterLink href={`mailto:${site.email}`}>{site.email}</FooterLink>
            <FooterLink href={`tel:${site.phoneHref}`}>{site.phone}</FooterLink>
            <li className="text-sm text-muted-foreground leading-relaxed pt-1">
              {site.address}
            </li>
          </FooterCol>
        </div>

        <div className="mt-14 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              WhatsApp <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">{title}</h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
        {children}
      </Link>
    </li>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-secondary transition-all"
    >
      {children}
    </a>
  );
}