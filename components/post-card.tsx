import { Heart, ImageIcon, Megaphone, MessageCircle } from "@/components/icons";
import { postTypeTheme, publishedByLabel } from "@/lib/mock/feed";
import type { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const theme = postTypeTheme[post.type];

  return (
    <article className="rounded-[20px] border border-line bg-surface p-[20px_22px] shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)]">
      <div className="mb-[14px] flex items-center gap-3">
        {post.author.kind === "system" ? (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${theme.avatarBackground} ${theme.avatarText}`}
          >
            <Megaphone width={20} height={20} />
          </div>
        ) : (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-[17px] font-semibold ${theme.avatarBackground} ${theme.avatarText}`}
          >
            {post.author.initials}
          </div>
        )}

        <div className="flex-1">
          <div className="font-display text-[16.5px] font-semibold text-ink">
            {post.author.name}
          </div>
          <div className="text-[12.5px] text-subtle">
            {post.time} · {publishedByLabel}
          </div>
        </div>

        <div
          className={`flex items-center gap-[7px] rounded-full px-3 py-1.5 ${theme.badgeBackground}`}
        >
          <span className={`h-2 w-2 rounded-full ${theme.dotBackground}`} />
          <span
            className={`text-[12px] font-extrabold tracking-[0.5px] ${theme.badgeText}`}
          >
            {theme.label}
          </span>
        </div>
      </div>

      <div className="mb-[10px] text-[12.5px] text-subtle">{post.audience}</div>
      <p className="m-0 text-[15.5px] leading-[1.55] text-body">{post.body}</p>

      {post.photo && (
        <a
          href="#"
          className="mt-[14px] flex h-[200px] flex-col items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-dashed border-photo-border bg-photo-bg text-photo-text"
        >
          <ImageIcon width={30} height={30} strokeWidth={1.7} />
          <span className="truncate text-[13.5px]">{post.photo.label}</span>
        </a>
      )}

      <div className="mt-4 flex items-center gap-[18px] border-t border-hairline pt-[14px]">
        <span className="flex items-center gap-[7px] text-[14px] font-bold text-like">
          <Heart width={19} height={19} filled />
          {post.likes}
        </span>
        <a
          href="#"
          className="flex items-center gap-[7px] text-[14px] font-bold text-muted"
        >
          <MessageCircle width={18} height={18} />
          {post.comments}
        </a>
        <span className="flex-1" />
        <a href="#" className="text-[14px] font-extrabold text-edit">
          Editar
        </a>
      </div>
    </article>
  );
}
