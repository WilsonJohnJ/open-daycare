import { classroomMeta, currentUser } from "@/lib/mock/feed";

export function FeedHeader() {
  const firstName = currentUser.name.split(" ")[0];

  return (
    <div className="mb-6">
      <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-accent">
        GUARDERÍA · SALA {currentUser.classroom.toUpperCase()}
      </div>
      <h1 className="m-0 font-display text-[30px] font-semibold text-ink">
        Buenas, {firstName}
      </h1>
      <p className="mt-[5px] mb-0 text-[14.5px] text-muted">
        {classroomMeta.roomCount} niños · {classroomMeta.dateLabel}
      </p>
    </div>
  );
}
