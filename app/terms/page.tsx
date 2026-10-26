import { site } from '@/lib/content';

export const metadata = { title: 'Terms of Service', description: 'The terms under which we provide our services.' };

export default function TermsPage() {
  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: October 2026</p>
        <div className="mt-10 space-y-8 text-foreground/85 leading-relaxed">
          <Section title="1. Acceptance of terms">
            By accessing or using {site.name} ("we", "us", "our") website and services, you agree to be bound by these terms. If you do not agree, please do not use our services.
          </Section>
          <Section title="2. Services">
            We provide digital marketing services — strategy, creative, media, content and technology — under written engagement agreements. These terms govern use of our website and platform; specific deliverables, pricing and timelines are defined in your engagement agreement.
          </Section>
          <Section title="3. Accounts and access">
            Access to client and admin portals is invitation-based. You are responsible for safeguarding your credentials and for all activity under your account. We may suspend or revoke access for misuse or security reasons.
          </Section>
          <Section title="4. Acceptable use">
            You agree not to misuse the platform, submit false or unlawful content, attempt to access data you are not authorised to view, or disrupt service operation.
          </Section>
          <Section title="5. Billing">
            Monthly retainers are billed in advance. Ad spend and platform fees are billed separately at cost or as agreed. Retainers may be cancelled with 30 days written notice. One-time project fees are due per the milestones in your agreement.
          </Section>
          <Section title="6. Intellectual property">
            We retain ownership of our methodology, templates and tooling until full payment is received. Upon payment, deliverables created specifically for you are assigned as set out in your engagement agreement.
          </Section>
          <Section title="7. Confidentiality and data">
            We treat your business information as confidential and process personal data per our Privacy Policy. You are responsible for the accuracy and lawful use of any data you share with us.
          </Section>
          <Section title="8. Limitation of liability">
            To the maximum extent permitted by law, our liability is limited to the fees paid for the services giving rise to the claim. We do not guarantee specific rankings, traffic or results, as marketing outcomes depend on factors outside our control.
          </Section>
          <Section title="9. Changes to terms">
            We may update these terms from time to time. We will notify material changes via our website or by email to active clients.
          </Section>
          <Section title="10. Contact">
            For questions about these terms, contact us at {site.email}.
          </Section>
        </div>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold mb-3">{title}</h2>
      <div className="text-pretty">{children}</div>
    </div>
  );
}