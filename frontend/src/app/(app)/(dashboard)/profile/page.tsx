// src/app/(dashboard)/settings/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { api } from "@/app/lib/api-client";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [totalMails, setTotalMails] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTotal() {
      try {
        const { data } = await api.get("/api/mail-jobs?page=1&pageSize=1");
        setTotalMails(data.pagination.total);
      } catch {
        setTotalMails(null);
      }
    }
    fetchTotal();
  }, []);

  if (loading) {
    return <p className="text-sm text-neutral-500">Loading…</p>;
  }

  if (!user) {
    return <p className="text-sm text-neutral-500">Not signed in.</p>;
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8">
        <h1 className="text-xl font-medium tracking-tight text-neutral-900">
          Profile
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Your account details.
        </p>
      </div>

      <div className="rounded-xl border border-neutral-200 p-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name || "User avatar"}
            className="h-16 w-16 rounded-full border border-neutral-200 object-cover"
          />
          <div>
            <p className="font-medium text-neutral-900">{user.name || "—"}</p>
            <p className="text-sm text-neutral-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
              Date joined
            </p>
            <p className="mt-1 text-sm text-neutral-900">
              {new Date(user.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
              Total mails
            </p>
            <p className="mt-1 text-sm text-neutral-900">
              {totalMails !== null ? totalMails : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}