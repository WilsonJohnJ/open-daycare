"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ComposerBar } from "@/components/composer-bar";
import { DayDivider } from "@/components/day-divider";
import { FeedHeader } from "@/components/feed-header";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/types";

const LIKES_STORAGE_KEY = "opendaycare:likes:v1";

type LikedPosts = Record<string, boolean>;

function readLikedPosts(): LikedPosts {
  try {
    const stored = window.localStorage.getItem(LIKES_STORAGE_KEY);
    if (!stored) return {};

    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => value === true),
    );
  } catch {
    return {};
  }
}

function writeLikedPosts(likedPosts: LikedPosts) {
  try {
    window.localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likedPosts));
  } catch {
    // Storage unavailable (Safari private mode, quota): likes stay in memory.
  }
}

function useLikes() {
  const [likedPosts, setLikedPosts] = useState<LikedPosts>({});
  const hasUserInteracted = useRef(false);

  useEffect(() => {
    const storedLikedPosts = readLikedPosts();
    if (Object.keys(storedLikedPosts).length === 0) return;

    setLikedPosts(storedLikedPosts);
  }, []);

  useEffect(() => {
    if (!hasUserInteracted.current) return;

    writeLikedPosts(likedPosts);
  }, [likedPosts]);

  const toggleLike = useCallback((postId: string) => {
    hasUserInteracted.current = true;

    setLikedPosts((current) => {
      const next = { ...current };

      if (next[postId]) {
        delete next[postId];
      } else {
        next[postId] = true;
      }

      return next;
    });
  }, []);

  return { likedPosts, toggleLike };
}

interface FeedViewProps {
  posts: Post[];
}

export function FeedView({ posts }: FeedViewProps) {
  const { likedPosts, toggleLike } = useLikes();

  return (
    <div className="mx-auto w-full max-w-[760px] px-10 pt-[34px] pb-20">
      <FeedHeader />
      <ComposerBar />
      <DayDivider />
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            liked={Boolean(likedPosts[post.id])}
            onToggleLike={toggleLike}
          />
        ))}
      </div>
    </div>
  );
}
