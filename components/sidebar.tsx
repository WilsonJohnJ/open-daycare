import Link from "next/link";
import { Bell, Home, LogOut, Plus, Sun, User, Users } from "@/components/icons";
import { currentUser } from "@/lib/mock/feed";

export type SidebarActiveItem = "feed" | "kids";

const navItems = [
  { key: "feed", label: "Feed", Icon: Home, href: "/" },
  { key: "kids", label: "Niños", Icon: Users, href: "/kids" },
  { key: "avisos", label: "Avisos", Icon: Bell, href: "#" },
  { key: "cuenta", label: "Mi cuenta", Icon: User, href: "#" },
] as const;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  activeItem: SidebarActiveItem;
}

export function Sidebar({ open, onClose, activeItem }: SidebarProps) {
  return (
    <aside
      aria-label="Navegación principal"
      className={`fixed left-0 top-0 z-50 flex h-screen w-[248px] shrink-0 flex-col border-r border-line bg-surface px-4 py-6 transition-transform md:sticky md:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Link href="/" onClick={onClose} className="flex items-center gap-[11px] pt-1 pl-2 pr-2 pb-[22px]">
        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(155deg,var(--color-logo-from),var(--color-logo-to))]">
          <Sun width={21} height={21} stroke="#fff" strokeWidth={2.2} />
        </div>
        <div>
          <div className="font-display text-[17px] leading-none font-semibold text-ink">
            OpenDayCare
          </div>
          <div className="mt-0.5 text-[11.5px] text-subtle">Sala Soles</div>
        </div>
      </Link>

      <a
        href="#"
        onClick={onClose}
        className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,var(--color-btn-from),var(--color-btn-to))] p-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]"
      >
        <Plus width={17} height={17} stroke="#fff" />
        Nueva publicación
      </a>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ key, label, Icon, href }) => {
          const isActive = key === activeItem;
          const className = `flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px] ${
            isActive
              ? "bg-nav-active-bg font-extrabold text-accent"
              : "bg-transparent font-semibold text-nav"
          }`;
          const content = (
            <>
              <Icon width={19} height={19} />
              {label}
            </>
          );

          if (href === "#") {
            return (
              <a
                key={key}
                href="#"
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={className}
              >
                {content}
              </a>
            );
          }

          return (
            <Link
              key={key}
              href={href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={className}
            >
              {content}
            </Link>
          );
        })}
      </nav>

      <div className="mt-[10px] border-t border-line pt-[14px]">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-coral font-display text-[16px] font-semibold text-white">
            {currentUser.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-extrabold text-ink">
              {currentUser.name}
            </div>
            <div className="text-[12px] text-subtle">
              {currentUser.role} · {currentUser.classroom}
            </div>
          </div>
          <a
            href="#"
            onClick={onClose}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-canvas text-muted"
          >
            <LogOut width={16} height={16} />
          </a>
        </div>
      </div>
    </aside>
  );
}
