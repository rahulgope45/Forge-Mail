// src/app/(dashboard)/dashboard/page.tsx
"use client";

import { MailJobStatus } from "@/app/lib/types";
import { useMailJobs } from "./useMailJobs";

function DashBoardPage() {
  const { jobs, loading } = useMailJobs();

  if (loading) return <div>Loading...</div>;

  if (jobs.length === 0) return <div>No mail jobs yet.</div>;

  function statusBadge(status: MailJobStatus) {
  const styles: Record<MailJobStatus, string> = {
    PENDING: "bg-neutral-100 text-neutral-600 border-neutral-200",
    SENT: "bg-emerald-50 text-emerald-700 border-emerald-200",
    FAILED_RETRYABLE: "bg-amber-50 text-amber-700 border-amber-200",
    FAILED_PERMANENT: "bg-red-50 text-red-700 border-red-200",
  };
  const labels: Record<MailJobStatus, string> = {
    PENDING: "Pending",
    SENT: "Sent",
    FAILED_RETRYABLE: "Retrying",
    FAILED_PERMANENT: "Failed",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

  return (
   <div className="mx-auto max-w-6xl">
  <div className="mb-8">
    <h1 className="text-xl font-medium tracking-tight text-neutral-900">
      Mail jobs
    </h1>
    <p className="mt-1 text-sm text-neutral-500">
      Status of everything you've sent or scheduled.
    </p>
  </div>

  <div className="border border-neutral-200 rounded-lg overflow-hidden">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="text-left bg-neutral-50 border-b border-neutral-200">
          <th className="p-3 font-medium text-neutral-500">To</th>
          <th className="p-3 font-medium text-neutral-500">Subject</th>
          <th className="p-3 font-medium text-neutral-500">Status</th>
          <th className="p-3 font-medium text-neutral-500">Created</th>
          <th className="p-3 font-medium text-neutral-500">Scheduled for</th>
          <th className="p-3 font-medium text-neutral-500">Sent</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60 transition">
            <td className="p-3 text-neutral-900">{job.to}</td>
            <td className="p-3 text-neutral-700">{job.subject}</td>
            <td className="p-3">{statusBadge(job.status)}</td>
            <td className="p-3 text-neutral-500">{new Date(job.createdAt).toLocaleString()}</td>
            <td className="p-3 text-neutral-500">{new Date(job.scheduledFor).toLocaleString()}</td>
            <td className="p-3 text-neutral-500">
              {job.sentAt ? new Date(job.sentAt).toLocaleString() : "—"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}

export default DashBoardPage;