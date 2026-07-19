// src/app/components/landing/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-neutral-100">
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <span className="text-sm text-neutral-400">
            © {new Date().getFullYear()} mailforge. Built by Rahul.
          </span>

          <div className="flex gap-5 text-sm text-neutral-500">
            {/* TODO: replace with your actual links */}
            <a href="mailto:rahuleile456@google.com.com" className="hover:text-neutral-900">
              Email
            </a>
            <a href="https://github.com/rahulgope45" className="hover:text-neutral-900">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/rahul-gope-808476369" className="hover:text-neutral-900">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}