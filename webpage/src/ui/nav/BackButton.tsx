"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-xl)] glass-card px-3 py-2 text-sm"
      aria-label="Back"
    >
      <ChevronLeft size={18} />
      Back
    </button>
  );
}
