"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function AccessCode({
  code,
  catalogName,
}: {
  code: string;
  catalogName: string;
}) {
  const [message, setMessage] = useState("");

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setMessage("Code copied.");
    } catch {
      setMessage("Copy failed. Select and copy the code manually.");
    }
    window.setTimeout(() => setMessage(""), 2200);
  }

  return (
    <div className="rounded-2xl border border-champagne/20 bg-black/35 p-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-champagne">
        Access Code
      </p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <code className="rounded-lg bg-white/5 px-3 py-2 text-sm font-semibold text-ivory">
          {code}
        </code>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-2 rounded-full border border-champagne/30 px-3 py-2 text-xs font-semibold text-ivory transition hover:bg-champagne hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
          aria-label={`Copy access code for ${catalogName}`}
        >
          {message === "Code copied." ? (
            <Check size={14} />
          ) : (
            <Copy size={14} />
          )}
          Copy
        </button>
      </div>
      <p className="mt-2 min-h-4 text-xs text-ivory/55" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
