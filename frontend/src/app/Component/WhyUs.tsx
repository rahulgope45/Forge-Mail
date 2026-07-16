// src/app/components/landing/WhyUs.tsx
const FEATURES = [
  {
    title: "Bulk scheduling",
    description:
      "Send one email to a single recipient, or the same message to a thousand — same flow, no extra setup.",
  },
  {
    title: "Live status tracking",
    description:
      "Every job is tracked from pending to sent or failed, with a dashboard that polls for updates while jobs are in flight.",
  },
  {
    title: "Built for reliability",
    description:
      "Jobs run on a queue with automatic retries, so a temporary failure doesn't mean a lost email.",
  },
];

export default function WhyUs() {
  return (
  <section className="border-t border-neutral-200/60 bg-neutral-50/50">
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
      {/* Section Header */}
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Why mailforge
        </h2>
        <p className="mt-3 text-base text-neutral-500">
          Built for speed, reliability, and precision email delivery.
        </p>
      </div>

      {/* Responsive Grid Layout */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div 
            key={feature.title}
            className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-200"
          >
            <div>
              {/* Icon Container with subtle hover animation */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e2a4a] text-white shadow-sm shadow-[#1e2a4a]/20 group-hover:scale-105 transition-transform duration-200">
                {/* Fallback box remains, but sized cleanly. You can place an SVG icon inside here later */}
                <div className="h-5 w-5 opacity-80" />
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
            
            {/* Optional subtle accent line on hover */}
            <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-blue-500 to-[#1e2a4a] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        ))}
      </div>
    </div>
  </section>
);
}