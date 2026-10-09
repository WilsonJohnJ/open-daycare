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

export type ParentStatus = "active" | "pending";

export interface ChildParent {
  id: string;
  name: string;
  initials: string;
  avatarBackground: string;
  roleLabel: string;
  status: ParentStatus;
  statusLabel: string;
}

export interface Child {
  id: string;
  name: string;
  initials: string;
  avatarBackground: string;
  avatarText: string;
  ageLabel: string;
  room: string;
  allergyLabel: string | null;
  notes: string | null;
  birthLabel: string;
  joinedLabel: string;
  parents: ChildParent[];
}
