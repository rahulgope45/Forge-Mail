// src/app/components/landing/Hero.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger reveal animations smoothly once the DOM has mounted
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24 overflow-hidden">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        
        {/* Left Side Copy Column */}
        <div 
          className={`flex flex-col transform transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-sm font-medium text-[#1e2a4a] uppercase tracking-wider">
            For teams sending at scale
          </p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight text-neutral-900 md:text-5xl leading-tight">
            Schedule mail.
            <br />
            Send it with confidence.
          </h1>
          <p className="mt-4 max-w-md text-neutral-500 leading-relaxed">
            Compose once, send to one or a thousand, and track every job from
            queued to delivered — all from your Gmail account.
          </p>
          
          <div className="flex flex-col mt-6">
            <Link
              href="/dashboard"
              className="inline-flex w-max items-center gap-2 rounded-full bg-[#1e2a4a] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#28365e] hover:shadow-md active:scale-95"
            >
              Get started
              <span aria-hidden className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
            <Link
              href="/terms"
              className="mt-3 w-max inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-semibold tracking-wide text-neutral-400 underline decoration-neutral-200 underline-offset-4 transition hover:text-[#1e2a4a] hover:decoration-[#1e2a4a]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Right Side Card Column (Staggered slightly later for a premium fluid feel) */}
        <div 
          className={`transform transition-all duration-1000 delay-200 ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
          }`}
        >
          <div className="rounded-xl border border-neutral-300 bg-white shadow-2xl overflow-hidden max-w-2xl transition-shadow duration-300 hover:shadow-neutral-300/60">
            
            {/* 1. Gmail Style Header Bar */}
            <div className="flex items-center justify-between bg-[#202124] px-4 py-2.5 text-white">
              <span className="text-xs font-medium opacity-90">New Message</span>
              <div className="flex items-center gap-3 opacity-70">
                <span className="w-3 h-0.5 bg-white block rounded-sm" />
                <span className="w-3 h-3 border border-white block rounded-sm bg-transparent" />
                <span className="text-sm font-light leading-none cursor-pointer hover:opacity-100">&times;</span>
              </div>
            </div>

            {/* 2. Header Fields */}
            <div className="text-sm">
              <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-2">
                <div className="flex gap-2">
                  <span className="text-neutral-500 w-12 shrink-0">From</span>
                  <span className="text-neutral-800 font-medium">you@yourcompany.com</span>
                </div>
              </div>

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
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-[#1a73e8] hover:bg-[#155cb4] text-white rounded-full pl-5 pr-4 py-2 font-medium text-sm tracking-wide shadow-sm cursor-pointer transition">
                  <span>Send</span>
                  <span className="ml-3 pl-2 border-l border-white/20 text-xs">▼</span>
                </div>

                <div className="flex items-center gap-3 text-neutral-500">
                  <span className="text-base font-serif font-bold cursor-pointer hover:text-neutral-800">A</span>
                  <span className="text-lg rotate-45 inline-block cursor-pointer hover:text-neutral-800">📎</span>
                  <span className="text-base cursor-pointer hover:text-neutral-800">🔗</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end text-right">
                  <span className="inline-flex items-center rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
                    Pending Queue
                  </span>
                  <span className="text-[11px] text-neutral-400 mt-0.5">Will send Mon 9:00 AM</span>
                </div>
                
                <button className="text-neutral-400 hover:text-red-500 p-1.5 rounded-full hover:bg-neutral-50 transition">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}