import { AppShell } from "@/components/app-shell";
import { FeedView } from "@/components/feed-view";
import { feedPosts } from "@/lib/mock/feed";

export default function Home() {
  return (
    <AppShell>
      <FeedView posts={feedPosts} />
    </AppShell>
  );
}
