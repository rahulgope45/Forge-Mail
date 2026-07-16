'use client'

import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
  <div className="min-h-screen bg-white px-6 py-12 md:px-8 md:py-16">
    <div className="mx-auto max-w-3xl">

      {/* Header */}
      <header className="mb-8 border-b border-neutral-100 pb-6">
        <Link
          href="/"
          className="group mb-4 inline-flex items-center gap-1 text-xs font-medium text-[#1e2a4a] transition hover:text-[#28365e]"
        >
          <span className="transition group-hover:-translate-x-0.5">&larr;</span>
          Back to homepage
        </Link>
        <h1 className="text-2xl font-medium tracking-tight text-neutral-900">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-neutral-500">Last updated: July 16, 2026</p>
      </header>

      {/* Content */}
      <div className="space-y-8 text-sm leading-relaxed text-neutral-600">

        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these
            Terms of Service. If you do not agree to all of the terms and
            conditions stated here, you may not access or integrate your
            Google Account with our platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900">
            2. Google Account Integration &amp; OAuth
          </h2>
          <p>
            Our application uses Google OAuth to securely authenticate users.
            By linking your Google Account, you explicitly acknowledge and
            grant permissions for our system to access the following:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-medium text-neutral-900">
                Basic profile information:
              </strong>{" "}
              your name, email address, and profile picture, used to set up
              your account and display your identity in the dashboard.
            </li>
            <li>
              <strong className="font-medium text-neutral-900">
                Authentication tokens:
              </strong>{" "}
              access tokens from Google are stored securely and used to
              verify your session — we never see or store your Google
              password.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900">
            3. Gmail API &amp; Email Queue
          </h2>
          <p>
            To provide automated scheduling and queuing, our platform
            connects to your account via the Gmail API.
          </p>
          <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <p className="text-xs font-medium uppercase tracking-wide text-amber-700">
              API usage notice
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              <li>
                <span className="font-medium">Sending scope:</span> by
                granting access, you allow this app to draft, schedule,
                queue, and send email from your Gmail address.
              </li>
              <li>
                <span className="font-medium">Privacy boundary:</span> we do{" "}
                <span className="font-medium underline decoration-amber-400 decoration-wavy">
                  not
                </span>{" "}
                read, scan, index, sell, or store your incoming inbox.
                Access is limited to sending and managing mail initiated
                from within our app.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900">
            4. User Responsibilities &amp; Acceptable Use
          </h2>
          <p>
            When sending messages via the Gmail API through our service, you
            are responsible for complying with the CAN-SPAM Act, GDPR, and
            Google's Acceptable Use Policies. You agree not to use our queue
            to:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Distribute unsolicited bulk commercial marketing (spam).</li>
            <li>
              Engage in phishing, identity spoofing, or credential
              gathering.
            </li>
            <li>Transmit malware, viruses, or illegal content.</li>
          </ul>
          <p className="rounded-lg bg-neutral-50 p-3 text-xs text-neutral-500">
            Violating Google's API limits or acceptable-use thresholds will
            result in automatic suspension of your connection to preserve
            platform safety.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-medium text-neutral-900">
            5. Data Deletion &amp; Token Revocation
          </h2>
          <p>
            You're in control of your connected account at all times. You can
            disconnect your Google authorization from your account settings,
            or revoke our platform's access at any time via your{" "}
            <Link
              href="https://myaccount.google.com/permissions"
              target="_blank"
              className="inline-flex items-center gap-0.5 text-[#1e2a4a] underline hover:text-[#28365e]"
            >
              Google Security Permissions
            </Link>
            . Upon disconnection, all access tokens are purged from our
            database.
          </p>
        </section>

      </div>

      {/* Footer */}
      <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-6 text-xs text-neutral-400">
        <p>&copy; 2026 mailforge. All rights reserved.</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-neutral-700">
            Privacy Policy
          </Link>
          <Link href="/support" className="hover:text-neutral-700">
            Contact Support
          </Link>
        </div>
      </footer>

    </div>
  </div>
);
}