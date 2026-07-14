// src/app/(dashboard)/dashboard/page.tsx
"use client";

import { useMailJobs } from "./useMailJobs";

function DashBoardPage() {
  const { jobs, loading } = useMailJobs();

  if (loading) return <div>Loading...</div>;

  if (jobs.length === 0) return <div>No mail jobs yet.</div>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Mail Jobs</h1>
      <table className="border-collapse w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">To</th>
            <th className="p-2">Subject</th>
            <th className="p-2">Status</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Scheduled For</th>
            <th className="p-2">Sent At</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-b">
              <td className="p-2">{job.to}</td>
              <td className="p-2">{job.subject}</td>
              <td className="p-2">{job.status}</td>
              <td className="p-2">{new Date(job.createdAt).toLocaleString()}</td>
              <td className="p-2">{new Date(job.scheduledFor).toLocaleString()}</td>
              <td className="p-2">{job.sentAt ? new Date(job.sentAt).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashBoardPage;