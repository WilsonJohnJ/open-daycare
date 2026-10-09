import Link from "next/link";
import { ChevronRight } from "@/components/icons";
import { childBadgeTheme } from "@/lib/mock/children";
import type { Child } from "@/lib/types";

function formatParentsCount(count: number): string {
  if (count === 0) return "sin padres vinculados";
  if (count === 1) return "1 padre vinculado";
  return `${count} padres vinculados`;
}

function resolveBadge(child: Child) {
  if (child.allergyLabel) {
    return { label: child.allergyLabel, ...childBadgeTheme.allergy };
  }
  if (child.parents.length === 0) {
    return childBadgeTheme.linkParents;
  }
  return null;
}

export function KidCard({ child }: { child: Child }) {
  const badge = resolveBadge(child);

  return (
    <Link
      href={`/kids/${child.id}`}
      className="flex min-w-0 items-center gap-[14px] rounded-[18px] border border-line bg-surface p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)] transition duration-150 hover:-translate-y-0.5 hover:border-hover-line"
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-[19px] font-semibold"
        style={{
          backgroundColor: child.avatarBackground,
          color: child.avatarText,
        }}
      >
        {child.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-display text-[16px] font-semibold text-ink">
          {child.name}
        </div>
        <div className="truncate text-[13px] text-subtle">
          {child.ageLabel} · {formatParentsCount(child.parents.length)}
        </div>
      </div>
      {badge ? (
        <span
          className={`shrink-0 rounded-full px-[9px] py-[5px] text-[11px] font-extrabold ${badge.badgeBackground} ${badge.badgeText}`}
        >
          {badge.label}
        </span>
      ) : (
        <ChevronRight width={18} className="shrink-0 text-[#CBB89F]" />
      )}
    </Link>
  );
}
