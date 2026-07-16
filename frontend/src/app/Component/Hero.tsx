// src/app/components/landing/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
  <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
    <div className="grid gap-12 md:grid-cols-2 md:items-center">
      {/* Left: copy */}
      <div>
        <p
          className="animate-fade-in-up text-sm font-medium text-[#1e2a4a]"
          style={{ animationDelay: "0ms" }}
        >
          For teams sending at scale
        </p>
        <h1
          className="animate-fade-in-up mt-3 text-4xl font-medium tracking-tight text-neutral-900 md:text-5xl"
          style={{ animationDelay: "80ms" }}
        >
          Schedule mail.
          <br />
          Send it with confidence.
        </h1>
        <p
          className="animate-fade-in-up mt-4 max-w-md text-neutral-500"
          style={{ animationDelay: "160ms" }}
        >
          Compose once, send to one or a thousand, and track every job from
          queued to delivered  all from your Gmail account.
        </p>
        <div
          className="animate-fade-in-up flex flex-col"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/dashboard"
            className="mt-8 inline-flex w-max items-center gap-2 rounded-full bg-[#1e2a4a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#28365e]"
          >
            Get started
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/terms"
            className="mt-2 w-max inline-flex items-center gap-2 rounded-full px-2 py-3 text-sm font-medium underline transition hover:text-[#1e2a4a]"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>

      {/* Right: mock email preview card */}
      <div
        className="animate-fade-in-up max-w-2xl overflow-hidden rounded-xl border border-neutral-300 bg-white shadow-2xl"
        style={{ animationDelay: "160ms" }}
      >
        {/* ...unchanged content below... */}
        <div className="flex items-center justify-between bg-[#202124] px-4 py-2.5 text-white">
          <span className="text-xs font-medium opacity-90">New Message</span>
          <div className="flex items-center gap-3 opacity-70">
            <span className="block h-0.5 w-3 rounded-sm bg-white" />
            <span className="block h-3 w-3 rounded-sm border border-white bg-transparent" />
            <span className="cursor-pointer text-sm font-light leading-none hover:opacity-100">
              &times;
            </span>
          </div>
        </div>

        <div className="text-sm">
          <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-2">
            <div className="flex gap-2">
              <span className="w-12 shrink-0 text-neutral-500">From</span>
              <span className="font-medium text-neutral-800">you@yourcompany.com</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-2">
            <div className="flex gap-2">
              <span className="w-12 shrink-0 text-neutral-500">To</span>
              <span className="text-neutral-800">team@yourcompany.com</span>
            </div>
            <div className="flex gap-2 text-xs text-neutral-500">
              <span className="cursor-pointer hover:underline">Cc</span>
              <span className="cursor-pointer hover:underline">Bcc</span>
            </div>
          </div>

          <div className="flex gap-2 border-b border-neutral-100 px-4 py-2.5">
            <span className="w-12 shrink-0 text-neutral-500">Subject</span>
            <span className="font-medium text-neutral-900">
              Q3 product update — scheduled for Monday 9am
            </span>
          </div>

          <div className="min-h-[180px] p-4 leading-relaxed text-neutral-700">
            Hi team,
            <br />
            <br />
            Here's what shipped this quarter and what's next on the roadmap...
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-100 bg-white px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex cursor-pointer items-center rounded-full bg-[#1a73e8] py-2 pl-5 pr-4 text-sm font-medium tracking-wide text-white shadow-sm transition hover:bg-[#155cb4]">
              <span>Send</span>
              <span className="ml-3 border-l border-white/20 pl-2 text-xs">▼</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-500">
              <span className="cursor-pointer font-serif text-base font-bold hover:text-neutral-800">A</span>
              <span className="inline-block rotate-45 cursor-pointer text-lg hover:text-neutral-800">📎</span>
              <span className="cursor-pointer text-base hover:text-neutral-800">🔗</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end text-right">
              <span className="inline-flex items-center rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-amber-800">
                Pending Queue
              </span>
              <span className="mt-0.5 text-[11px] text-neutral-400">Will send Mon 9:00 AM</span>
            </div>
            <button className="rounded-full p-1.5 text-neutral-400 transition hover:bg-neutral-50 hover:text-red-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}