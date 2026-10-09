import { AppShell } from "@/components/app-shell";

export default function KidsPage() {
  return (
    <AppShell activeItem="kids">
      <div className="mx-auto w-full max-w-[880px] px-10 pt-[34px] pb-20">
        <div className="mb-[22px] flex items-end justify-between gap-4">
          <div>
            <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-accent">
              GESTIÓN
            </div>
            <h1 className="font-display text-[30px] font-semibold text-ink">
              Niños
            </h1>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
