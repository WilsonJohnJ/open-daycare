import { Plus, Search } from "@/components/icons";

interface KidsHeaderProps {
  count: number;
  query: string;
  onQueryChange: (value: string) => void;
}

export function KidsHeader({ count, query, onQueryChange }: KidsHeaderProps) {
  return (
    <>
      <div className="mb-[22px] flex items-end justify-between gap-4">
        <div>
          <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-accent">
            GESTIÓN
          </div>
          <h1 className="font-display text-[30px] font-semibold text-ink">
            Niños
          </h1>
        </div>
        <a
          href="#"
          className="flex items-center gap-2 rounded-[14px] bg-[linear-gradient(180deg,var(--color-btn-from),var(--color-btn-to))] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)]"
        >
          <Plus width={17} height={17} stroke="#fff" />
          Agregar niño
        </a>
      </div>

      <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-line bg-surface px-4 py-3">
        <Search width={18} className="shrink-0 text-photo-text" />
        <input
          type="text"
          aria-label="Buscar niño"
          placeholder="Buscar niño…"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="min-w-0 flex-1 border-none bg-transparent text-[15px] text-ink outline-none placeholder:text-[#B6A99B]"
        />
      </div>

      <div className="mb-[14px] flex items-center gap-3">
        <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-ink">
          SALA SOLES
        </span>
        <span className="text-[13px] text-subtle">
          {count === 1 ? "1 niño" : `${count} niños`}
        </span>
        <span className="h-px flex-1 bg-rule" />
      </div>
    </>
  );
}
