"use client";

import { useState, type ReactNode } from "react";
import { Menu } from "@/components/icons";
import { Sidebar } from "@/components/sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar open={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center gap-3 border-b border-line bg-surface px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsNavOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={isNavOpen}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-nav-active-bg text-accent"
          >
            <Menu width={20} height={20} />
          </button>
        </header>

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
