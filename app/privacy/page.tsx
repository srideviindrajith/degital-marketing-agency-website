import { site } from '@/lib/content';

export const metadata = { title: 'Privacy Policy', description: 'How we collect, use and protect your data.' };

export default function PrivacyPage() {
  return (
    <section className="pt-32 sm:pt-40 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: October 2026</p>
        <div className="mt-10 space-y-8 text-foreground/85 leading-relaxed">
          <Section title="1. Who we are">
            {site.name} ("we", "us", "our") is a digital marketing agency registered in Bengaluru, India. This policy explains how we collect, use and protect your personal data when you use our website and services.
          </Section>
          <Section title="2. What we collect">
            <ul className="list-disc pl-5 space-y-1">
              <li>Contact details you submit via our forms: name, email, phone, company, country and message.</li>
              <li>Service interest and budget range you provide when booking a call.</li>
              <li>Account credentials and profile information if you are invited to a client or admin portal.</li>
              <li>Aggregate usage analytics from our website (anonymous, consent-based).</li>
            </ul>
          </Section>
          <Section title="3. How we use your data">
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond to enquiries and schedule strategy calls.</li>
              <li>To deliver services under our engagement agreements.</li>
              <li>To send you service-related communications you have opted into.</li>
              <li>To meet legal, accounting and regulatory obligations.</li>
            </ul>
          </Section>
          <Section title="4. Legal basis and sharing">
            We process your data on the basis of consent, contract and legitimate interest. We never sell your data. We share it only with processors (such as analytics and cloud providers) bound by data protection agreements, or where required by law.
          </Section>
          <Section title="5. Data retention">
            We retain enquiry submissions for up to 24 months and account data for the duration of your engagement, plus any period required by law.
          </Section>
          <Section title="6. Your rights">
            You have the right to access, correct, delete and port your personal data, and to withdraw consent or object to processing. To exercise any of these, email {site.email}.
          </Section>
          <Section title="7. Security">
            We use secure sessions, row-level database access control, encrypted third-party tokens, and audit logging. Access to personal data is restricted to authorised staff on a least-privilege basis.
          </Section>
          <Section title="8. Contact">
            For any privacy questions, contact us at {site.email}.
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