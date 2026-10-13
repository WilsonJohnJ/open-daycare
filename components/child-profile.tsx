import Link from "next/link";
import { AlertTriangle, ArrowLeft, Sun } from "@/components/icons";
import { ParentsCard } from "@/components/parents-card";
import type { Child } from "@/lib/types";

interface ChildProfileProps {
  child: Child;
}

export function ChildProfile({ child }: ChildProfileProps) {
  return (
    <>
      <Link
        href="/kids"
        className="mb-5 inline-flex items-center gap-[7px] text-[14px] font-bold text-muted"
      >
        <ArrowLeft width={18} />
        Volver a Niños
      </Link>

      <div className="flex flex-col items-stretch gap-[26px] md:flex-row md:flex-wrap md:items-start">
        <div className="flex min-w-0 flex-col gap-[18px] md:min-w-[300px] md:flex-1">
          <div className="flex flex-wrap items-center gap-[18px]">
            <div
              className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full font-display text-[34px] font-semibold"
              style={{
                backgroundColor: child.avatarBackground,
                color: child.avatarText,
              }}
            >
              {child.initials}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-[28px] font-semibold text-ink">
                {child.name}
              </h1>
              <p className="mt-[3px] text-[15px] text-muted">
                {child.ageLabel} · Sala {child.room}
              </p>
            </div>
            <a
              href="#"
              className="rounded-xl border-[1.5px] border-line bg-surface px-4 py-[9px] text-[14px] font-bold text-nav"
            >
              Editar
            </a>
          </div>

          {child.notes && (
            <div className="flex gap-[14px] rounded-2xl bg-alert-bg px-[18px] py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-alert-surface">
                <AlertTriangle width={22} stroke="#fff" />
              </div>
              <div>
                <div className="mb-0.5 text-[15px] font-extrabold text-alert-title">
                  Alergias y notas
                </div>
                <div className="text-[14.5px] leading-[1.5] text-alert-body">
                  {child.notes}
                </div>
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="flex justify-between border-b border-hairline px-[18px] py-[15px]">
              <span className="text-[14.5px] text-muted">
                Fecha de nacimiento
              </span>
              <span className="text-[14.5px] font-extrabold text-ink">
                {child.birthLabel}
              </span>
            </div>
            <div className="flex justify-between border-b border-hairline px-[18px] py-[15px]">
              <span className="text-[14.5px] text-muted">Sala</span>
              <span className="text-[14.5px] font-extrabold text-ink">
                {child.room}
              </span>
            </div>
            <div className="flex justify-between px-[18px] py-[15px]">
              <span className="text-[14.5px] text-muted">Ingreso</span>
              <span className="text-[14.5px] font-extrabold text-ink">
                {child.joinedLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col gap-[14px] md:w-[300px]">
          <a
            href="#"
            className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-ink p-[13px] text-[15px] font-extrabold text-white"
          >
            <Sun width={18} stroke="#fff" />
            Resumen del día
          </a>
          <ParentsCard parents={child.parents} />
        </div>
      </div>
    </>
  );
}
