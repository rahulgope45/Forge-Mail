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
    <section className="border-t border-neutral-100 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
          Why mailforge
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <div className="h-8 w-8 rounded-md bg-[#1e2a4a]" />
              <h3 className="mt-4 text-base font-medium text-neutral-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}