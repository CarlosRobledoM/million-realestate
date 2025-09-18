import { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <header className="sticky top-0 z-50 px-5 backdrop-blur bg-white/70 dark:bg-slate-950/60 border-b">
        <div className="container flex h-14 items-center justify-between">
          <div className="font-semibold tracking-tight">RealEstate</div>
          <nav className="text-sm text-slate-600 dark:text-slate-300">
            Properties
          </nav>
        </div>
      </header>
      <main className="container py-8 px-5">{children}</main>
      <footer className="border-t mt-12 py-6 text-sm text-slate-500 text-center">
        © RealEstate
      </footer>
    </div>
  );
}
