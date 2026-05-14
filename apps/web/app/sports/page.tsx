"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { sportsConfig } from "@pulserec/db";
import type { SportConfig } from "@pulserec/db";

export default function SportsPage() {
  const router = useRouter();

  const handlePick = (id: string) => {
    router.push(`/record?sport=${id}`);
  };

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Pick Your Sport</h1>
      <p className="mb-8 text-neutral-400">Tap a sport to start recording today's stats.</p>

      <div className="grid gap-3">
        {sportsConfig.map((sport: SportConfig) => (
          <button
            key={sport.id}
            onClick={() => handlePick(sport.id)}
            className="flex items-center gap-4 rounded-2xl bg-neutral-900 px-5 py-4 text-left transition-all hover:bg-neutral-800 active:scale-[0.98]"
          >
            <span className="text-3xl">{sport.icon}</span>
            <div className="flex-1">
              <span className="text-lg font-semibold">{sport.name}</span>
              <span className="ml-2 text-sm text-neutral-500">{sport.fields.length} stats</span>
            </div>
            <span className="text-neutral-600">→</span>
          </button>
        ))}
      </div>
    </main>
  );
}
