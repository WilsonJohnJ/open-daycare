import { AppShell } from "@/components/app-shell";
import { ComposerBar } from "@/components/composer-bar";
import { DayDivider } from "@/components/day-divider";
import { FeedHeader } from "@/components/feed-header";
import { PostCard } from "@/components/post-card";
import { feedPosts } from "@/lib/mock/feed";

export default function Home() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[760px] px-10 pt-[34px] pb-20">
        <FeedHeader />
        <ComposerBar />
        <DayDivider />
        <div className="flex flex-col gap-4">
          {feedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
