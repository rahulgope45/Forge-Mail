// src/app/(dashboard)/dashboard/useMailJobs.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/app/lib/api-client";
import { MailJob } from "@/app/lib/types";

export function useMailJobs() {
  const [jobs, setJobs] = useState<MailJob[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    const { data } = await api.get("/api/mail/mail-jobs?page=1&pageSize=20");
    setJobs(data.jobs);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    const hasPending = jobs.some((j) => j.status === "PENDING");
    if (!hasPending) return; // stop polling once nothing's in flight

    const interval = setInterval(fetchJobs, 5000); // poll every 5s only while jobs pending
    return () => clearInterval(interval);
  }, [jobs, fetchJobs]);

  return { jobs, loading, refetch: fetchJobs };
}