import { Camera } from "@/components/icons";
import { currentUser } from "@/lib/mock/feed";

export function ComposerBar() {
  return (
    <a
      href="#"
      className="mb-6 flex items-center gap-[14px] rounded-[18px] border border-line bg-surface p-[14px_18px] shadow-[0_4px_14px_-10px_rgba(120,90,60,0.4)]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral font-display text-[16px] font-semibold text-white">
        {currentUser.initials}
      </div>
      <span className="flex-1 text-[15px] text-subtle">Compartí un momento…</span>
      <span className="flex h-[38px] w-[38px] items-center justify-center rounded-xl bg-nav-active-bg text-like">
        <Camera width={19} height={19} />
      </span>
    </a>
  );
}
