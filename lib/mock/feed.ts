import type {
  ClassroomMeta,
  CurrentUser,
  Post,
  PostType,
  PostTypeTheme,
} from "@/lib/types";

export const currentUser: CurrentUser = {
  name: "Caro Giménez",
  role: "Maestra",
  classroom: "Soles",
  initials: "C",
};

export const classroomMeta: ClassroomMeta = {
  roomCount: 12,
  dateLabel: "martes 17 jun",
};

export const publishedByLabel = "publicado por vos";

export const postTypeTheme: Record<PostType, PostTypeTheme> = {
  achievement: {
    label: "LOGRO",
    badgeBackground: "bg-[#CFEBD8]",
    badgeText: "text-[#3E9B6C]",
    dotBackground: "bg-[#3E9B6C]",
    avatarBackground: "bg-[#A9D9E8]",
    avatarText: "text-[#1F7A93]",
  },
  activity: {
    label: "ACTIVIDAD",
    badgeBackground: "bg-[#C7E7F1]",
    badgeText: "text-[#2E89A6]",
    dotBackground: "bg-[#2E89A6]",
    avatarBackground: "bg-[#A9D9E8]",
    avatarText: "text-[#1F7A93]",
  },
  announcement: {
    label: "ANUNCIO",
    badgeBackground: "bg-[#CCD8F4]",
    badgeText: "text-[#4E72C8]",
    dotBackground: "bg-[#4E72C8]",
    avatarBackground: "bg-[#CCD8F4]",
    avatarText: "text-[#4E72C8]",
  },
};

export const feedPosts: Post[] = [
  {
    id: "post-achievement-mateo",
    type: "achievement",
    author: { name: "Mateo", initials: "M", kind: "child" },
    time: "14:20",
    audience: "Para: familia de Mateo",
    body: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "post-activity-mateo",
    type: "activity",
    author: { name: "Mateo", initials: "M", kind: "child" },
    time: "09:40",
    audience: "Para: familia de Mateo",
    body: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    likes: 5,
    comments: 2,
    photo: { label: "Foto · pintando con témperas" },
  },
  {
    id: "post-announcement-park",
    type: "announcement",
    author: { name: "Anuncio general", initials: null, kind: "system" },
    time: "07:50",
    audience: "Para: toda la sala",
    body: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];
