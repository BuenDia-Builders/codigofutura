"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (_e) {
      // ignore
    }
  }

  return (
    <Button type="button" onClick={onCopy} variant="ghost" className={className} aria-label="Copy to clipboard">
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
