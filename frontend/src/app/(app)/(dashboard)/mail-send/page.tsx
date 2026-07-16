'use client'

import { useState, FormEvent, KeyboardEvent, ChangeEvent, useRef } from "react";
import { api } from '@/app/lib/api-client';
import { AxiosError } from "axios";

type RequestState = "idle" | "submitting" | "queued" | "error";

const BUBBLE_COLORS = [
  "bg-blue-100 text-blue-900 border-blue-200",
  "bg-red-100 text-red-950 border-red-200",
  "bg-yellow-100 text-yellow-900 border-yellow-200",
  "bg-green-100 text-green-900 border-green-200",
];

const getBubbleColor = (index: number) => BUBBLE_COLORS[index % BUBBLE_COLORS.length];

function MailSendPage() {
  const [to, setTo] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");

  const [state, setState] = useState<RequestState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [jobIds, setJobIds] = useState<string[]>([]);

  // Ref to trigger the hidden file selector
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isSubmitting = state === "submitting";

  // Parse TXT or CSV files
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const textContent = event.target?.result;
      if (typeof textContent === "string") {
        // Split by commas, newlines, tabs, or whitespaces
        const parsedEmails = textContent
          .split(/[,\s\n\r]+/)
          .map((email) => email.trim())
          .filter((email) => email.length > 0 && email.includes("@")); // basic check to ensure it's a structural email address

        // Merge with existing emails and remove duplicates
        setTo((prevTo) => {
          const combined = [...prevTo, ...parsedEmails];
          return Array.from(new Set(combined));
        });
      }
    };

    reader.readAsText(file);
    // Reset file input value so user can upload the same file again if modified
    e.target.value = "";
  };

  const addEmailToken = () => {
    const cleaned = inputValue.trim().replace(/,/g, "");
    if (cleaned && !to.includes(cleaned)) {
      setTo([...to, cleaned]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      addEmailToken();
    } else if (e.key === "Backspace" && !inputValue && to.length > 0) {
      setTo(to.slice(0, -1));
    }
  };

  const removeEmailToken = (indexToRemove: number) => {
    setTo(to.filter((_, index) => index !== indexToRemove));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    let finalRecipients = [...to];
    const residualInput = inputValue.trim().replace(/,/g, "");
    if (residualInput && !finalRecipients.includes(residualInput)) {
      finalRecipients.push(residualInput);
      setTo(finalRecipients);
      setInputValue("");
    }

    if (finalRecipients.length === 0) {
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
          to: finalRecipients,
          subject,
          body,
          sendAt: scheduledFor ? new Date(scheduledFor).toISOString() : undefined,
        }
      );
      setJobIds(data.jobIds);
      setState("queued");
      setTo([]);
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
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-xl font-medium tracking-tight text-neutral-900">
          Compose mail
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Send now, or schedule for later.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-6 w-full items-start md:items-end">
          {/* Recipient Field Wrapper */}
          <div className="flex flex-col gap-1.5 w-full flex-1">
            <label htmlFor="to-input" className="text-sm font-medium text-neutral-700">
              To
            </label>

            <div className="flex items-center gap-2 border border-neutral-200 rounded-md p-2 bg-white w-full min-h-[42px] focus-within:ring-2 focus-within:ring-[#1e2a4a]/20 focus-within:border-[#1e2a4a] transition">
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {to.map((email, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200"
                  >
                    <span>{email}</span>
                    <button
                      type="button"
                      onClick={() => removeEmailToken(idx)}
                      className="hover:bg-black/10 rounded-full w-4 h-4 inline-flex items-center justify-center text-sm font-bold transition"
                      disabled={isSubmitting}
                    >
                      &times;
                    </button>
                  </div>
                ))}

                <input
                  id="to-input"
                  type="text"
                  className="flex-1 min-w-[150px] outline-none border-none bg-transparent text-sm text-neutral-900"
                  placeholder={to.length === 0 ? "a@x.com, b@x.com" : "Add recipient…"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={addEmailToken}
                  disabled={isSubmitting}
                />
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".txt,.csv"
                className="hidden"
              />

              <button
                type="button"
                onClick={handleImportClick}
                disabled={isSubmitting}
                className="border border-neutral-200 text-neutral-600 hover:border-[#1e2a4a] hover:text-[#1e2a4a] font-medium text-xs px-3 py-1.5 rounded-md transition select-none flex items-center justify-center shrink-0 self-center"
              >
                Import
              </button>
            </div>
          </div>

          {/* Scheduled At input */}
          <div className="flex flex-col gap-1.5 w-full md:w-auto">
            <label htmlFor="scheduledFor" className="text-sm font-medium text-neutral-700">
              Scheduled at
            </label>
            <input
              id="scheduledFor"
              className="border border-neutral-200 rounded-md p-2 text-sm h-[42px] focus:outline-none focus:ring-2 focus:ring-[#1e2a4a]/20 focus:border-[#1e2a4a] transition"
              type="datetime-local"
              value={scheduledFor}
              onChange={(e) => setScheduledFor(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <input
            className="border border-neutral-200 p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1e2a4a]/20 focus:border-[#1e2a4a] transition"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={isSubmitting}
          />
          <textarea
            className="border border-neutral-200 p-2 rounded-md h-[300px] align-top text-sm focus:outline-none focus:ring-2 focus:ring-[#1e2a4a]/20 focus:border-[#1e2a4a] transition"
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        {state === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}
        {state === "queued" && (
          <p className="text-sm text-emerald-600">
            {jobIds.length} mail job{jobIds.length > 1 ? "s" : ""} queued (status: PENDING).
          </p>
        )}

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="w-[180px] p-2.5 rounded-md disabled:opacity-50 bg-[#1e2a4a] hover:bg-[#28365e] font-medium transition text-white text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MailSendPage;