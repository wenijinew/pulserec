"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { getSportConfig, sportsConfig } from "@pulserec/db";
import { RecordCard } from "../components/record-card";

export default function RecordPage() {
  const searchParams = useSearchParams();
  const sportId = searchParams.get("sport") ?? sportsConfig[0]?.id ?? "";
  const sport = getSportConfig(sportId);

  if (!sport) {
    return (
      <main className="mx-auto max-w-md px-4 py-12 text-center">
        <p className="text-neutral-400">Sport not found. Go back and pick one.</p>
      </main>
    );
  }

  const handleSave = (index: number, values: Record<string, number>, name: string) => {
    // TODO: persist via tRPC
    console.log(`Card ${index + 1} saved:`, { sport: sportId, name, values });
  };

  return (
    <main className="mx-auto max-w-md space-y-3 px-4 py-12">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">{sport.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{sport.name}</h1>
          <p className="text-sm text-neutral-500">Tap a card to record your stats</p>
        </div>
      </div>

      {Array.from({ length: 10 }).map((_, i) => (
        <RecordCard
          key={i}
          index={i}
          sport={sport}
          onSave={(values, name) => handleSave(i, values, name)}
        />
      ))}
    </main>
  );
}
