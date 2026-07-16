// src/app/components/landing/WhyUs.tsx
"use client";

import { useEffect, useState } from "react";

const FEATURES = [
  {
    title: "Bulk scheduling",
    description:
      "Send one email to a single recipient, or the same message to a thousand — same flow, no extra setup.",
    // Elegant Multi-paper / Layered layers SVG
    icon: (
      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    title: "Live status tracking",
    description:
      "Every job is tracked from pending to sent or failed, with a dashboard that polls for updates while jobs are in flight.",
    // Activity / Pulse chart radar SVG
    icon: (
      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
      </svg>
    ),
  },
  {
    title: "Built for reliability",
    description:
      "Jobs run on a queue with automatic retries, so a temporary failure doesn't mean a lost email.",
    // Shield Check safety matrix SVG
    icon: (
      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export default function WhyUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="border-t mt-5 border-neutral-200/60 bg-neutral-50/50 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        
        {/* Section Header */}
        <div 
          className={`max-w-2xl transform transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            Why mailforge
          </h2>
          <p className="mt-3 text-base text-neutral-500">
            Built for speed, reliability, and precision email delivery.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <div 
              key={feature.title}
              style={{ transitionDelay: `${idx * 150}ms` }}
              className={`group relative flex flex-col justify-between rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-sm hover:shadow-md hover:border-neutral-300 transform transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                {/* Icon Container with subtle hover animation */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e2a4a] text-white shadow-sm shadow-[#1e2a4a]/20 group-hover:scale-105 transition-transform duration-200">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-neutral-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {feature.description}
                </p>
              </div>
              
              {/* Subtle accent line on hover */}
              <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-blue-500 to-[#1e2a4a] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}