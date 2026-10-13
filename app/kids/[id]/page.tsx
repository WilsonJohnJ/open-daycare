import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ChildProfile } from "@/components/child-profile";
import { children as childList } from "@/lib/mock/children";

interface KidProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function KidProfilePage({ params }: KidProfilePageProps) {
  const { id } = await params;
  const child = childList.find((item) => item.id === id);

  if (!child) {
    notFound();
  }

  return (
    <AppShell activeItem="kids">
      <div className="mx-auto w-full max-w-[820px] px-10 pt-[34px] pb-20">
        <ChildProfile child={child} />
      </div>
    </AppShell>
  );
}
