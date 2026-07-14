'use client'

import { useState, FormEvent } from "react";
import { api } from '@/app/lib/api-client';
import { AxiosError } from "axios";

type RequestState = "idle" | "submitting" | "queued" | "error";

function MailSendPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");

  const [state, setState] = useState<RequestState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [jobIds, setJobIds] = useState<string[]>([]);

  const isSubmitting = state === "submitting";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const recipients = to
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (recipients.length === 0) {
      setState("error");
      setErrorMsg("Enter at least one recipient.");
      return;
    }

    if (!subject.trim() || !body.trim()) {
      setState("error");
      setErrorMsg("Subject and body are required.");
      return;
    }

    setState("submitting");
    setErrorMsg("");

    try {
      const { data } = await api.post<{ message: string; jobIds: string[] }>(
        "/api/mail/send-mail",
        {
          to: recipients,
          subject,
          body,
          sendAt: scheduledFor ? new Date(scheduledFor).toISOString() : undefined,
        }
      );
      setJobIds(data.jobIds);
      setState("queued");
      setTo("");
      setSubject("");
      setBody("");
      setScheduledFor("");
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message ?? "Failed to queue mail."
          : "Failed to queue mail.";
      setState("error");
      setErrorMsg(message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <label htmlFor="to">To:</label>
          <input
            id="to"
            className="border p-2"
            placeholder="a@x.com, b@x.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="scheduledFor">Scheduled At:</label>
          <input
            id="scheduledFor"
            className="border p-2"
            type="datetime-local"
            value={scheduledFor}
            onChange={(e) => setScheduledFor(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <input
          className="border p-2"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={isSubmitting}
        />
        <textarea
          className="border p-2 h-[300px] align-top"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      {state === "error" && <p className="text-red-600">{errorMsg}</p>}
      {state === "queued" && (
        <p className="text-green-600">
          {jobIds.length} mail job{jobIds.length > 1 ? "s" : ""} queued (status: PENDING).
        </p>
      )}

      <button
        type="submit"
        className="border p-2 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

export default MailSendPage;