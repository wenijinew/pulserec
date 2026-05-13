import React from "react";

interface StatCardProps {
  sport: string;
  icon: string;
  stats: { label: string; value: string | number }[];
  username: string;
  date: string;
}

export function StatCard({ sport, icon, stats, username, date }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-neutral-900 p-8 text-center">
      <p className="text-3xl">{icon}</p>
      <h2 className="mt-2 text-sm font-semibold uppercase tracking-widest text-neutral-400">{sport}</h2>
      <div className="mt-6 space-y-1">
        {stats.map((s) => (
          <div key={s.label}>
            <span className="text-4xl font-bold">{s.value}</span>
            <span className="ml-2 text-sm text-neutral-400">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-neutral-800 pt-4 text-xs text-neutral-500">
        @{username} · {date} · pulserec.app
      </div>
    </div>
  );
}
