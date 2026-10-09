import { AppShell } from "@/components/app-shell";
import { KidCard } from "@/components/kid-card";
import { KidsHeader } from "@/components/kids-header";
import { children as childList } from "@/lib/mock/children";

export default function KidsPage() {
  return (
    <AppShell activeItem="kids">
      <div className="mx-auto w-full max-w-[880px] px-10 pt-[34px] pb-20">
        <KidsHeader count={childList.length} />
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
          {childList.map((child) => (
            <KidCard key={child.id} child={child} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
