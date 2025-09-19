import { AppShell } from "@/ui/shell/AppShell";

export default function Loading() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="h-8 w-40 rounded-[var(--radius-xl)] glass-surface" />
        <div className="glass-card p-4">
          <div className="grid gap-3 md:grid-cols-5">
            <div className="h-10 rounded-[var(--radius-xl)] glass-surface" />
            <div className="h-10 rounded-[var(--radius-xl)] glass-surface" />
            <div className="h-10 rounded-[var(--radius-xl)] glass-surface" />
            <div className="h-10 rounded-[var(--radius-xl)] glass-surface" />
            <div className="h-10 rounded-[var(--radius-xl)] glass-surface" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-56 w-full rounded-[var(--radius-2xl)] glass-surface"
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
