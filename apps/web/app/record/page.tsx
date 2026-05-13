"use client";

import React, { useState } from "react";
import { sportsConfig, getSportConfig } from "@pulserec/db";
import { SportForm, CalendarPicker } from "@pulserec/ui";

export default function RecordPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeSport, setActiveSport] = useState(sportsConfig[0]?.id ?? "");
  const [saved, setSaved] = useState(false);

  const sport = getSportConfig(activeSport);

  const handleSubmit = async (values: Record<string, number>) => {
    const dateStr = selectedDate.toISOString().split("T")[0];
    // TODO: call tRPC mutation when client is wired
    console.log("Saving record:", { sportId: activeSport, date: dateStr, values });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-12">
      <h1 className="text-3xl font-bold">Record Stats</h1>

      <CalendarPicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <div className="flex gap-2 overflow-x-auto pb-2">
        {sportsConfig.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSport(s.id)}
            className={[
              "flex-shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              activeSport === s.id ? "bg-accent text-black" : "bg-neutral-900 text-neutral-400",
            ].join(" ")}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>

      {sport && <SportForm sport={sport} onSubmit={handleSubmit} />}

      {saved && (
        <div className="rounded-xl bg-green-900/30 px-4 py-3 text-center text-green-400">
          ✓ Record saved
        </div>
      )}
    </main>
  );
}
