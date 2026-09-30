export type PostType = "achievement" | "activity" | "announcement";

export interface PostAuthor {
  name: string;
  initials: string | null;
  kind: "child" | "system";
}

export interface PostPhoto {
  label: string;
}

export interface Post {
  id: string;
  type: PostType;
  author: PostAuthor;
  time: string;
  audience: string;
  body: string;
  likes: number;
  comments: number;
  photo?: PostPhoto;
}

export interface PostTypeTheme {
  label: string;
  badgeBackground: string;
  badgeText: string;
  dotBackground: string;
  avatarBackground: string;
  avatarText: string;
}

export interface CurrentUser {
  name: string;
  role: string;
  classroom: string;
  initials: string;
}

export interface ClassroomMeta {
  roomCount: number;
  dateLabel: string;
}
