"use client";

import { useState } from "react";
import { KidCard } from "@/components/kid-card";
import { KidsHeader } from "@/components/kids-header";
import type { Child } from "@/lib/types";

function normalize(value: string): string {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

interface KidsViewProps {
  items: Child[];
}

export function KidsView({ items }: KidsViewProps) {
  const [query, setQuery] = useState("");

  const normalizedQuery = normalize(query.trim().toLowerCase());
  const filteredItems = normalizedQuery
    ? items.filter((child) =>
        normalize(child.name.toLowerCase()).includes(normalizedQuery),
      )
    : items;

  return (
    <>
      <KidsHeader
        count={filteredItems.length}
        query={query}
        onQueryChange={setQuery}
      />
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
          {filteredItems.map((child) => (
            <KidCard key={child.id} child={child} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-[15px] text-muted">
          Sin resultados para «{query.trim()}»
        </p>
      )}
    </>
  );
}
