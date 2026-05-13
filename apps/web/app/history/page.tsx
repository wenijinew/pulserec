"use client";

import React, { useState } from "react";
import { sportsConfig, getSportConfig } from "@pulserec/db";

// Mock data for now — will be replaced with tRPC query
const mockRecords = [
  { id: "1", sportId: "basketball", date: "2026-05-13", values: { points: 24, assists: 8, rebounds: 12, steals: 3, blocks: 2 } },
  { id: "2", sportId: "football", date: "2026-05-13", values: { goals: 2, assists: 1, passes: 45, shots: 5, distance: 8.2 } },
  { id: "3", sportId: "basketball", date: "2026-05-12", values: { points: 18, assists: 5, rebounds: 9, steals: 1, blocks: 0 } },
  { id: "4", sportId: "pingpong", date: "2026-05-12", values: { wins: 3, losses: 1, aces: 5, smashes: 12 } },
  { id: "5", sportId: "handball", date: "2026-05-11", values: { goals: 5, assists: 3, saves: 0, steals: 2, blocks: 1 } },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const records = filter ? mockRecords.filter((r) => r.sportId === filter) : mockRecords;

  // Group by date
  const grouped = records.reduce<Record<string, typeof records>>((acc, r) => {
    (acc[r.date] ??= []).push(r);
    return acc;
  }, {});

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-12">
      <h1 className="text-3xl font-bold">History</h1>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter(null)}
          className={[
            "flex-shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
            !filter ? "bg-accent text-black" : "bg-neutral-900 text-neutral-400",
          ].join(" ")}
        >
          All
        </button>
        {sportsConfig.map((s) => (
          <button
            key={s.id}
            onClick={() => setFilter(s.id)}
            className={[
              "flex-shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              filter === s.id ? "bg-accent text-black" : "bg-neutral-900 text-neutral-400",
            ].join(" ")}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>

      {Object.entries(grouped).map(([date, dayRecords]) => (
        <div key={date}>
          <h2 className="mb-3 text-sm font-medium text-neutral-500">
            {new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </h2>
          <div className="space-y-2">
            {dayRecords.map((record) => {
              const sport = getSportConfig(record.sportId);
              if (!sport) return null;
              return (
                <div key={record.id} className="rounded-2xl bg-neutral-900 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xl">{sport.icon}</span>
                    <span className="font-semibold">{sport.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {sport.fields.map((field) => (
                      <div key={field.name} className="text-center">
                        <div className="text-lg font-bold">{record.values[field.name] ?? 0}</div>
                        <div className="text-xs text-neutral-500">{field.unit}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {records.length === 0 && (
        <div className="py-12 text-center text-neutral-500">No records yet. Start tracking!</div>
      )}
    </main>
  );
}
