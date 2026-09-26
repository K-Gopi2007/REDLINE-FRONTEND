

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-ink-body">
      <h1 className="text-headline-lg text-ink-heavy mb-8">Privacy Policy</h1>
      <p className="text-body-md text-ink-subdued mb-10">Effective Date: [Effective Date]</p>

      <div className="bg-surface-container-low rounded-xl p-6 mb-12">
        <h2 className="text-headline-sm text-ink-heavy mb-4">Table of contents</h2>
        <ul className="space-y-2 text-body-md">
          <li><a href="#overview" className="text-accent-primary hover:underline">1. Overview</a></li>
          <li><a href="#information-we-collect" className="text-accent-primary hover:underline">2. Information we collect</a></li>
          <li><a href="#how-we-use" className="text-accent-primary hover:underline">3. How we use your information</a></li>
          <li><a href="#zero-training" className="text-accent-primary hover:underline">4. Zero training on your documents</a></li>
          <li><a href="#data-security" className="text-accent-primary hover:underline">5. Data security</a></li>
          <li><a href="#data-retention" className="text-accent-primary hover:underline">6. Data retention and deletion</a></li>
          <li><a href="#sub-processors" className="text-accent-primary hover:underline">7. Third-party sub-processors</a></li>
          <li><a href="#privacy-rights" className="text-accent-primary hover:underline">8. Your privacy rights</a></li>
          <li><a href="#cookies" className="text-accent-primary hover:underline">9. Cookies and similar technologies</a></li>
          <li><a href="#childrens-privacy" className="text-accent-primary hover:underline">10. Children's privacy</a></li>
          <li><a href="#international-transfers" className="text-accent-primary hover:underline">11. International data transfers</a></li>
          <li><a href="#changes" className="text-accent-primary hover:underline">12. Changes to this policy</a></li>
          <li><a href="#contact" className="text-accent-primary hover:underline">13. Contact</a></li>
        </ul>
      </div>

      <div className="space-y-10 text-body-lg">
        <section id="overview">
          <h2 className="text-headline-md text-ink-heavy mb-4">1. Overview</h2>
          <p>This Privacy Policy explains how [Company Legal Name] ("Redline," "we," "us," "our") collects, uses, and protects information when you use the Redline platform. Because Redline processes sensitive commercial documents, we've designed our data practices around a simple principle: your contracts are yours, and they stay that way.</p>
        </section>

        <section id="information-we-collect">
          <h2 className="text-headline-md text-ink-heavy mb-4">2. Information we collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account information:</strong> name, work email, password (hashed), and authentication data if you sign in via Google Workspace or another provider</li>
            <li><strong>Uploaded content:</strong> the contracts, clauses, and related documents you upload for analysis, redlining, or negotiation support</li>
            <li><strong>Usage data:</strong> pages visited, features used, actions taken (e.g. which redlines you accepted), device/browser information, and log data, collected to operate and improve the product</li>
            <li><strong>Communications:</strong> any messages you send us for support or feedback</li>
          </ul>
        </section>

        <section id="how-we-use">
          <h2 className="text-headline-md text-ink-heavy mb-4">3. How we use your information</h2>
          <p className="mb-2">We use the information above to:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Provide the core service — analyzing your documents, generating risk assessments, suggested redlines, and counter-proposal drafts</li>
            <li>Maintain your account, contract library, and version history</li>
            <li>Send you service-related notices (e.g. deadline reminders for contracts you've uploaded)</li>
            <li>Monitor, secure, and improve the reliability and accuracy of the platform</li>
            <li>Respond to support requests</li>
          </ul>
          <p>We do not sell your personal information or Your Content to third parties.</p>
        </section>

        <section id="zero-training">
          <h2 className="text-headline-md text-ink-heavy mb-4">4. Zero training on your documents</h2>
          <p>Redline does not use your uploaded contracts, clauses, or other proprietary documents to train shared, global, or third-party AI models. Any AI processing of Your Content is performed to generate your analysis and is not retained by underlying model providers for their own model training, consistent with our zero-data-retention agreements with those providers. This applies specifically to Your Content — it does not apply to anonymized, aggregated product-usage metrics (e.g. "38% of flagged clauses relate to indemnification") that contain no identifiable document text or party names.</p>
        </section>

        <section id="data-security">
          <h2 className="text-headline-md text-ink-heavy mb-4">5. Data security</h2>
          <p className="mb-2">We apply industry-standard safeguards to protect your data, including:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Encryption in transit (TLS) and at rest</li>
            <li>Access controls limiting internal access to your documents to what's operationally necessary</li>
            <li>Infrastructure aligned with SOC 2 Type II control objectives</li>
            <li>Ephemeral processing environments for document analysis where technically feasible, so raw document content isn't held longer than necessary to generate your results</li>
          </ul>
          <p>No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
        </section>

        <section id="data-retention">
          <h2 className="text-headline-md text-ink-heavy mb-4">6. Data retention and deletion</h2>
          <p>We retain your account information and uploaded documents for as long as your account is active, or as needed to provide the service (e.g. maintaining your contract Library and version history). You can request deletion of your account and associated documents at any time by contacting arunbalajithangavel66@gmail.com or using in-app account deletion if available; we will delete or anonymize your data within a reasonable period, except where we're required to retain it for legal, security, or fraud-prevention purposes.</p>
        </section>

        <section id="sub-processors">
          <h2 className="text-headline-md text-ink-heavy mb-4">7. Third-party sub-processors</h2>
          <p>We use a limited number of third-party service providers (e.g. cloud hosting, underlying AI model providers, authentication providers like Google) to operate Redline. These providers process data only as necessary to provide their service to us and are bound by contractual confidentiality and data-protection obligations. We do not permit sub-processors to use Your Content for purposes outside of providing the service to Redline.</p>
        </section>

        <section id="privacy-rights">
          <h2 className="text-headline-md text-ink-heavy mb-4">8. Your privacy rights</h2>
          <p>Depending on your location, you may have rights to access, correct, delete, or export your personal information, and to object to or restrict certain processing (for example, under GDPR if you're in the EU/UK, or CCPA/CPRA if you're a California resident). To exercise these rights, contact us at arunbalajithangavel66@gmail.com. We'll respond within the timeframe required by applicable law.</p>
        </section>

        <section id="cookies">
          <h2 className="text-headline-md text-ink-heavy mb-4">9. Cookies and similar technologies</h2>
          <p>We use essential cookies/local storage to keep you signed in and remember basic preferences. We do not use third-party advertising trackers. If we add analytics cookies in the future, we'll update this policy and provide appropriate controls.</p>
        </section>

        <section id="childrens-privacy">
          <h2 className="text-headline-md text-ink-heavy mb-4">10. Children's privacy</h2>
          <p>Redline is intended for business use by adults and is not directed at children under 18. We do not knowingly collect personal information from children.</p>
        </section>

        <section id="international-transfers">
          <h2 className="text-headline-md text-ink-heavy mb-4">11. International data transfers</h2>
          <p>If you access Redline from outside the country where our servers are located, your information may be transferred internationally. Where required, we rely on appropriate safeguards (such as standard contractual clauses) for such transfers.</p>
        </section>

        <section id="changes">
          <h2 className="text-headline-md text-ink-heavy mb-4">12. Changes to this policy</h2>
          <p>We may update this Privacy Policy from time to time. We'll post the updated version with a new effective date and, for material changes, provide reasonable notice.</p>
        </section>

        <section id="contact">
          <h2 className="text-headline-md text-ink-heavy mb-4">13. Contact</h2>
          <p>Questions about this Privacy Policy or your data: <a href="mailto:arunbalajithangavel66@gmail.com" className="text-accent-primary hover:underline">arunbalajithangavel66@gmail.com</a></p>
        </section>
      </div>
    </div>
  );
}
