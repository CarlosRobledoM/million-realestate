import { AppShell } from "@/ui/shell/AppShell";

export default function Loading() {
  return (
    <AppShell>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="h-80 w-full rounded-[var(--radius-2xl)] glass-surface" />
        <div className="space-y-3">
          <div className="h-10 w-64 rounded-[var(--radius-xl)] glass-surface" />
          <div className="h-6 w-80 rounded-[var(--radius-xl)] glass-surface" />
          <div className="h-8 w-40 rounded-[var(--radius-xl)] glass-surface" />
          <div className="h-5 w-56 rounded-[var(--radius-xl)] glass-surface" />
        </div>
      </div>
    </AppShell>
  );
}
