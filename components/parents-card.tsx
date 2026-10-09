import { Plus } from "@/components/icons";
import { parentStatusTheme } from "@/lib/mock/children";
import type { ChildParent } from "@/lib/types";

interface ParentsCardProps {
  parents: ChildParent[];
}

export function ParentsCard({ parents }: ParentsCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface px-[18px] py-4">
      <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]">
        PADRES VINCULADOS
      </div>
      <div className="flex flex-col gap-[14px]">
        {parents.map((parent) => {
          const statusTheme = parentStatusTheme[parent.status];
          return (
            <div key={parent.id} className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-[16px] font-semibold text-white"
                style={{ backgroundColor: parent.avatarBackground }}
              >
                {parent.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14.5px] font-extrabold text-ink">
                  {parent.name}
                </div>
                <div className="truncate text-[12.5px] text-subtle">
                  {parent.roleLabel} · {parent.statusLabel}
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-[9px] py-1 text-[10.5px] font-extrabold ${statusTheme.badgeBackground} ${statusTheme.badgeText}`}
              >
                {statusTheme.label}
              </span>
            </div>
          );
        })}
        <a href="#" className="flex items-center gap-3 pt-2">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-dashed border-[#D8CBBA] text-photo-text">
            <Plus width={18} height={18} />
          </span>
          <span className="text-[14.5px] font-extrabold text-edit">
            Vincular otro padre
          </span>
        </a>
      </div>
    </div>
  );
}
