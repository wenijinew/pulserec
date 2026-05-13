"use client";

import React, { useState } from "react";
import { sportsConfig } from "@pulserec/db";
import type { SportConfig } from "@pulserec/db";

export default function SportsPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSave = () => {
    // TODO: persist to API
    console.log("Selected sports:", Array.from(selected));
  };

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Choose Your Sports</h1>
      <p className="mb-8 text-neutral-400">Select the sports you want to track daily.</p>

      <div className="grid gap-3">
        {sportsConfig.map((sport: SportConfig) => (
          <button
            key={sport.id}
            onClick={() => toggle(sport.id)}
            className={[
              "flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all",
              selected.has(sport.id)
                ? "bg-accent/10 ring-2 ring-accent"
                : "bg-neutral-900 hover:bg-neutral-800",
            ].join(" ")}
            aria-pressed={selected.has(sport.id)}
          >
            <span className="text-3xl">{sport.icon}</span>
            <div className="flex-1">
              <span className="text-lg font-semibold">{sport.name}</span>
              <span className="ml-2 text-sm text-neutral-500">{sport.fields.length} stats</span>
            </div>
            {selected.has(sport.id) && <span className="text-accent text-xl">✓</span>}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={selected.size === 0}
        className="mt-8 w-full rounded-xl bg-accent py-3 text-lg font-semibold text-black transition-transform active:scale-95 disabled:opacity-40"
      >
        Continue ({selected.size} selected)
      </button>
    </main>
  );
}
