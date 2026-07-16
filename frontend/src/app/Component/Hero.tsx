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
          <div className="flex flex-col">
            <Link
            href="/dashboard"
            className="mt-8 inline-flex w-max items-center gap-2 rounded-full bg-[#1e2a4a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#28365e]"
          >
            Get started
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/terms"
            className="mt-2 w-max inline-flex items-center gap-2 rounded-full  px-2 py-3 text-sm font-medium underline transition hover:text-[#1e2a4a]"
          >
            Terms & Conditions
            
          </Link>
          </div>
        </div>

        {/* Right: mock email preview card */}
       <div className="rounded-xl border border-neutral-300 bg-white shadow-2xl overflow-hidden max-w-2xl">
      
      {/* 1. Gmail Style Header Bar */}
      <div className="flex items-center justify-between bg-[#202124] px-4 py-2.5 text-white">
        <span className="text-xs font-medium opacity-90">New Message</span>
        <div className="flex items-center gap-3 opacity-70">
          {/* Minimize */}
          <span className="w-3 h-0.5 bg-white block rounded-sm" />
          {/* Expand */}
          <span className="w-3 h-3 border border-white block rounded-sm bg-transparent" />
          {/* Close */}
          <span className="text-sm font-light leading-none cursor-pointer hover:opacity-100">&times;</span>
        </div>
      </div>

      {/* 2. Header Fields */}
      <div className="text-sm">
        {/* From Field */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-2">
          <div className="flex gap-2">
            <span className="text-neutral-500 w-12 shrink-0">From</span>
            <span className="text-neutral-800 font-medium">you@yourcompany.com</span>
          </div>
        </div>

        {/* To Field */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-2">
          <div className="flex gap-2">
            <span className="text-neutral-500 w-12 shrink-0">To</span>
            <span className="text-neutral-800">team@yourcompany.com</span>
          </div>
          <div className="flex gap-2 text-xs text-neutral-500">
            <span className="cursor-pointer hover:underline">Cc</span>
            <span className="cursor-pointer hover:underline">Bcc</span>
          </div>
        </div>

        {/* Subject Field */}
        <div className="flex gap-2 border-b border-neutral-100 px-4 py-2.5">
          <span className="text-neutral-500 w-12 shrink-0">Subject</span>
          <span className="text-neutral-900 font-medium">
            Q3 product update — scheduled for Monday 9am
          </span>
        </div>

        {/* 3. Email Body Composition Area */}
        <div className="p-4 min-h-[180px] text-neutral-700 leading-relaxed font-sans">
          Hi team,
          <br /><br />
          Here's what shipped this quarter and what's next on the roadmap...
        </div>
      </div>

      {/* 4. Gmail Bottom Bar Action Triggers */}
      <div className="flex items-center justify-between border-t border-neutral-100 bg-white px-4 py-3">
        
        {/* Left Side: Dynamic Action & Utility Trackers */}
        <div className="flex items-center gap-4">
          {/* Classic Gmail Blue Send Button Group */}
          <div className="flex items-center bg-[#1a73e8] hover:bg-[#155cb4] text-white rounded-full pl-5 pr-4 py-2 font-medium text-sm tracking-wide shadow-sm cursor-pointer transition">
            <span>Send</span>
            <span className="ml-3 pl-2 border-l border-white/20 text-xs">▼</span>
          </div>

          {/* Action Row Placeholders (Formatting, Attachment, Link) */}
          <div className="flex items-center gap-3 text-neutral-500">
            <span className="text-base font-serif font-bold cursor-pointer hover:text-neutral-800">A</span>
            <span className="text-lg rotate-45 inline-block cursor-pointer hover:text-neutral-800">📎</span>
            <span className="text-base cursor-pointer hover:text-neutral-800">🔗</span>
          </div>
        </div>

        {/* Right Side: Metadata / Scheduling Tags */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end text-right">
            <span className="inline-flex items-center rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
              Pending Queue
            </span>
            <span className="text-[11px] text-neutral-400 mt-0.5">Will send Mon 9:00 AM</span>
          </div>
          
          {/* Trash Icon Shortcut placeholder */}
          <button className="text-neutral-400 hover:text-red-500 p-1.5 rounded-full hover:bg-neutral-50 transition">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

      </div>
    </div>
      </div>
    </section>
  );
}