"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { getSportConfig, sportsConfig } from "@pulserec/db";
import { RecordCard } from "../components/record-card";

function getStorageKey(sportId: string) {
  return `pulserec-records-${sportId}`;
}

function loadRecords(sportId: string): Record<number, { values: Record<string, number>; name: string }> {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(getStorageKey(sportId));
  return raw ? JSON.parse(raw) : {};
}

function saveRecord(sportId: string, index: number, values: Record<string, number>, name: string) {
  const records = loadRecords(sportId);
  records[index] = { values, name };
  localStorage.setItem(getStorageKey(sportId), JSON.stringify(records));
}

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

  const savedRecords = loadRecords(sportId);

  const handleSave = (index: number, values: Record<string, number>, name: string) => {
    saveRecord(sportId, index, values, name);
  };

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-12">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">{sport.icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{sport.name}</h1>
          <p className="text-sm text-neutral-500">Pick a card to record your stats</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <RecordCard
            key={i}
            index={i}
            sport={sport}
            savedData={savedRecords[i]}
            onSave={(values, name) => handleSave(i, values, name)}
          />
        ))}
      </div>
    </main>
  );
}
