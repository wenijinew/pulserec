"use client";

import React, { useState, useEffect } from "react";
import { sportsConfig, getSportConfig } from "@pulserec/db";

interface LeaderboardEntry {
  name: string;
  total: number;
  cardIndex: number;
}

function getWeekKey(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

function getStorageKey(sportId: string) {
  return `pulserec-records-${sportId}`;
}

function getWeeklyStorageKey(sportId: string) {
  return `pulserec-lb-${sportId}-${getWeekKey()}`;
}

function getLeaderboard(sportId: string): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];

  // Check weekly cache first
  const weeklyKey = getWeeklyStorageKey(sportId);
  const sport = getSportConfig(sportId);
  if (!sport) return [];

  // Read current records
  const raw = localStorage.getItem(getStorageKey(sportId));
  if (!raw) return [];

  const records: Record<number, { values: Record<string, number>; name: string }> = JSON.parse(raw);

  // Build leaderboard: sum all stat values per card
  const entries: LeaderboardEntry[] = Object.entries(records).map(([idx, record]) => ({
    name: record.name || `Player ${Number(idx) + 1}`,
    total: Object.values(record.values).reduce((sum, v) => sum + v, 0),
    cardIndex: Number(idx),
  }));

  // Sort descending by total
  entries.sort((a, b) => b.total - a.total);
  return entries;
}

const medalColors = [
  "from-yellow-400 to-yellow-600 text-yellow-900", // Gold
  "from-gray-300 to-gray-400 text-gray-800",       // Silver
  "from-amber-600 to-amber-800 text-amber-100",    // Bronze
];

const medalIcons = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const [activeSport, setActiveSport] = useState(sportsConfig[0]?.id ?? "");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setEntries(getLeaderboard(activeSport));
  }, [activeSport]);

  const sport = getSportConfig(activeSport);

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <span className="text-xs font-mono text-cyan-700 bg-cyan-950/40 px-2 py-1 rounded-lg border border-cyan-800/30">
          {getWeekKey()}
        </span>
      </div>
      <p className="text-sm text-neutral-500">Resets every week. Top stats win.</p>

      {/* Sport tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sportsConfig.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSport(s.id)}
            className={[
              "flex-shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              activeSport === s.id
                ? "bg-cyan-500 text-black"
                : "bg-[#0a1018] border border-cyan-900/40 text-cyan-400",
            ].join(" ")}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>

      {/* Leaderboard list */}
      <div className="space-y-2">
        {entries.length === 0 ? (
          <div className="py-12 text-center text-sm font-mono text-cyan-800">
            No records yet this week.<br />Go record some stats!
          </div>
        ) : (
          entries.map((entry, i) => (
            <div
              key={entry.cardIndex}
              className={[
                "flex items-center gap-3 rounded-xl p-4 transition-all",
                i < 3
                  ? `bg-gradient-to-r ${medalColors[i]} shadow-lg`
                  : "bg-[#0a1018] border border-cyan-900/30",
              ].join(" ")}
            >
              {/* Rank */}
              <div className={[
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                i < 3 ? "bg-black/20" : "bg-cyan-950 text-cyan-500",
              ].join(" ")}>
                {i < 3 ? medalIcons[i] : i + 1}
              </div>

              {/* Name */}
              <div className="flex-1">
                <span className={["font-semibold", i < 3 ? "" : "text-cyan-200"].join(" ")}>
                  {entry.name}
                </span>
              </div>

              {/* Score */}
              <div className={["text-right font-mono font-bold", i < 3 ? "text-lg" : "text-cyan-400"].join(" ")}>
                {entry.total}
                <span className={["ml-1 text-[10px]", i < 3 ? "opacity-70" : "text-cyan-700"].join(" ")}>pts</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats breakdown for top player */}
      {entries.length > 0 && sport && (
        <div className="rounded-xl bg-[#0a1018] border border-cyan-900/30 p-4">
          <p className="text-xs font-mono text-cyan-700 mb-2">👑 Top player breakdown</p>
          <div className="flex flex-wrap gap-2">
            {(() => {
              const raw = localStorage.getItem(getStorageKey(activeSport));
              if (!raw) return null;
              const records = JSON.parse(raw);
              const topRecord = records[entries[0].cardIndex];
              if (!topRecord) return null;
              return sport.fields.map((f) => (
                <div key={f.name} className="rounded-lg bg-cyan-950/30 px-3 py-1.5 text-center">
                  <div className="text-sm font-bold font-mono text-cyan-200">{topRecord.values[f.name] ?? 0}</div>
                  <div className="text-[9px] font-mono text-cyan-700">{f.label}</div>
                </div>
              ));
            })()}
          </div>
        </div>
      )}
    </main>
  );
}
