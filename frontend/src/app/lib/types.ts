// src/lib/types.ts (or wherever shared types live)
export type MailJobStatus = "PENDING" | "SENT" | "FAILED_RETRYABLE" | "FAILED_PERMANENT";

export type MailJob = {
  id: string;
  to: string;
  subject: string;
  status: MailJobStatus;
  scheduledFor: string;
  sentAt: string | null;
  createdAt: string
  errorReason: string | null;
};