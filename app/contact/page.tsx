import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { site } from '@/lib/content';
import { SectionIntro } from '@/components/site/sections';
import { ConsultationForm } from '@/components/site/consultation-form';

export const metadata = {
  title: 'Contact',
  description: 'Book a strategy call or send us a message. We respond within one business day.',
};

export default function ContactPage() {
  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
        <div>
          <SectionIntro
            eyebrow="Contact"
            title="Let's talk about growth."
            subtitle="Book a 30-minute strategy call or send us a message. A real strategist will respond within one business day."
          />

          <div className="mt-10 space-y-4">
            <ContactRow icon={Mail} label="Email" value={site.email} href={`mailto:${site.email}`} />
            <ContactRow icon={Phone} label="Phone" value={site.phone} href={`tel:${site.phoneHref}`} />
            <ContactRow
              icon={MessageCircle}
              label="WhatsApp"
              value="Chat with us"
              href={`https://wa.me/${site.whatsapp}`}
            />
            <ContactRow icon={MapPin} label="Office" value={site.address} />
          </div>

          <div className="mt-10 rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md p-6">
            <h3 className="font-medium">Working hours</h3>
            <p className="mt-2 text-sm text-muted-foreground">Monday–Friday, 10:00–19:00 IST. Async-friendly for clients across time zones.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold mb-6">Send us a message</h2>
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4 rounded-2xl border border-white/20 bg-card/25 backdrop-blur-md p-5 hover:border-primary/40 transition-colors">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/50 ring-1 ring-border text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-1 font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
}