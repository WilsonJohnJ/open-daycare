import { AppShell } from "@/components/app-shell";
import { ComposerBar } from "@/components/composer-bar";
import { DayDivider } from "@/components/day-divider";
import { FeedHeader } from "@/components/feed-header";

export default function Home() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[760px] px-10 pt-[34px] pb-20">
        <FeedHeader />
        <ComposerBar />
        <DayDivider />
      </div>
    </AppShell>
  );
}
