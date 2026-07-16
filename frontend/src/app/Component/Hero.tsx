// src/app/components/landing/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* Left: copy */}
        <div>
          <p className="text-sm font-medium text-[#1e2a4a]">For teams sending at scale</p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight text-neutral-900 md:text-5xl">
            Schedule mail.
            <br />
            Send it with confidence.
          </h1>
          <p className="mt-4 max-w-md text-neutral-500">
            Compose once, send to one or a thousand, and track every job from
            queued to delivered — all from your Gmail account.
          </p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1e2a4a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#28365e]"
          >
            Get started
            <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Right: mock email preview card */}
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-neutral-200 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          </div>

          <div className="space-y-3 p-5 text-sm">
            <div className="flex gap-2">
              <span className="w-16 shrink-0 text-neutral-400">To</span>
              <span className="text-neutral-800">team@yourcompany.com</span>
            </div>
            <div className="flex gap-2">
              <span className="w-16 shrink-0 text-neutral-400">From</span>
              <span className="text-neutral-800">you@yourcompany.com</span>
            </div>
            <div className="flex gap-2 border-t border-neutral-200 pt-3">
              <span className="w-16 shrink-0 text-neutral-400">Subject</span>
              <span className="font-medium text-neutral-900">
                Q3 product update — scheduled for Monday 9am
              </span>
            </div>
            <div className="border-t border-neutral-200 pt-3 text-neutral-600">
              Hi team, here's what shipped this quarter and what's next on the
              roadmap...
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-neutral-200 px-5 py-3">
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-500">
              Pending
            </span>
            <span className="text-xs text-neutral-400">Scheduled · Mon 9:00 AM</span>
          </div>
        </div>
      </div>
    </section>
  );
}