import { AppShell } from "@/components/app-shell";
import { KidsView } from "@/components/kids-view";
import { children as childList } from "@/lib/mock/children";

export default function KidsPage() {
  return (
    <AppShell activeItem="kids">
      <div className="mx-auto w-full max-w-[880px] px-10 pt-[34px] pb-20">
        <KidsView items={childList} />
      </div>
    </AppShell>
  );
}
