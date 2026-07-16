// src/app/components/landing/Pricing.tsx
const PLANS = [
  { name: "Starter", price: "$0" },
  { name: "Pro", price: "$—" },
  { name: "Team", price: "$—" },
];

export default function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
      <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
        Pricing
      </h2>
      <p className="mt-2 text-sm text-neutral-500">Plans are on the way.</p>

      <div className="relative mt-10">
        <div className="grid gap-6 blur-sm select-none pointer-events-none md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="rounded-xl border border-neutral-200 p-6"
            >
              <p className="text-sm font-medium text-neutral-500">{plan.name}</p>
              <p className="mt-2 text-3xl font-medium text-neutral-900">
                {plan.price}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-500">
                <li>Feature detail</li>
                <li>Feature detail</li>
                <li>Feature detail</li>
              </ul>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-medium text-neutral-700 shadow-sm">
            Coming soon
          </span>
        </div>
      </div>
    </section>
  );
}