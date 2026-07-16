"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/mail-send", label: "Send Mail" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm text-neutral-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
          {/* Left: wordmark + nav */}
          <div className="flex items-center gap-10">
            <Link href="/" className="text-xl font-medium tracking-tight text-neutral-900">
              mailforge
            </Link>

            <nav className="hidden items-center gap-7 md:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-1 text-[14px] font-medium transition-colors ${
                      isActive
                        ? "text-[#1e2a4a]"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-[1px] left-0 h-[1.5px] w-full bg-[#1e2a4a]" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: profile */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-full transition hover:opacity-80"
              aria-label="Toggle profile menu"
            >
              <img
                src={user?.avatar || "/default-avatar.png"}
                alt={user?.name || "User avatar"}
                className="h-9 w-9 rounded-full border border-neutral-200 object-cover"
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 z-50 min-w-[180px] rounded-lg border border-neutral-200 bg-white p-1.5 shadow-lg">
                {user?.name && (
                  <div className="px-3 py-2 text-[13px] text-neutral-400">
                    {user.name}
                  </div>
                )}
                <Link
                  onClick={() => setProfileOpen(false)}
                  href="/profile"
                  className="flex h-10 items-center rounded-md px-3 text-[14px] font-medium text-neutral-700 transition hover:bg-neutral-50"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                  }}
                  className="flex h-10 w-full items-center rounded-md px-3 text-left text-[14px] font-medium text-red-600 transition hover:bg-red-50"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile nav — inline row below wordmark, still no icon */}
        <nav className="flex items-center gap-6 border-t border-neutral-100 px-6 py-2.5 md:hidden">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[14px] font-medium ${
                  isActive ? "text-[#1e2a4a]" : "text-neutral-500"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-8 md:px-8">{children}</main>
    </div>
  );
}