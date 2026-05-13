"use client";

import React, { useRef, useState } from "react";
import { sportsConfig, getSportConfig } from "@pulserec/db";
import { ShareCard } from "@pulserec/ui";

// Mock records — will be replaced with tRPC query
const mockRecords: Record<string, Record<string, number>> = {
  basketball: { points: 24, assists: 8, rebounds: 12, steals: 3, blocks: 2 },
  football: { goals: 2, assists: 1, passes: 45, shots: 5, distance: 8.2 },
  pingpong: { wins: 3, losses: 1, aces: 5, smashes: 12 },
  handball: { goals: 5, assists: 3, saves: 0, steals: 2, blocks: 1 },
};

export default function SharePage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeSport, setActiveSport] = useState(sportsConfig[0]?.id ?? "");
  const [date] = useState(new Date().toISOString().split("T")[0]);
  const [hiddenFields, setHiddenFields] = useState<string[]>([]);
  const [downloading, setDownloading] = useState(false);

  const sport = getSportConfig(activeSport);
  const values = mockRecords[activeSport] ?? {};

  const toggleField = (name: string) => {
    setHiddenFields((prev) => (prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]));
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      // Dynamic import to avoid SSR issues
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `pulserec-${activeSport}-${date}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    }
    setDownloading(false);
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      const { toBlob } = await import("html-to-image");
      const blob = await toBlob(cardRef.current, { pixelRatio: 2 });
      if (!blob) return;
      const file = new File([blob], `pulserec-${activeSport}.png`, { type: "image/png" });
      if (navigator.share) {
        await navigator.share({ files: [file], title: "My PulseRec Stats" });
      } else {
        handleDownload();
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-12">
      <h1 className="text-3xl font-bold">Share Stats</h1>

      {/* Sport selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sportsConfig.map((s) => (
          <button
            key={s.id}
            onClick={() => { setActiveSport(s.id); setHiddenFields([]); }}
            className={[
              "flex-shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
              activeSport === s.id ? "bg-accent text-black" : "bg-neutral-900 text-neutral-400",
            ].join(" ")}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>

      {/* Privacy toggles */}
      {sport && (
        <div className="rounded-2xl bg-neutral-900 p-4">
          <p className="mb-3 text-sm font-medium text-neutral-400">Show/hide stats:</p>
          <div className="flex flex-wrap gap-2">
            {sport.fields.map((field) => (
              <button
                key={field.name}
                onClick={() => toggleField(field.name)}
                className={[
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  hiddenFields.includes(field.name)
                    ? "bg-neutral-800 text-neutral-600 line-through"
                    : "bg-accent/10 text-accent",
                ].join(" ")}
              >
                {field.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Card preview */}
      {sport && (
        <div className="flex justify-center">
          <ShareCard
            ref={cardRef}
            sport={sport}
            values={values}
            username="athlete"
            date={new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            hiddenFields={hiddenFields}
          />
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 rounded-xl bg-neutral-900 py-3 text-sm font-semibold transition-transform active:scale-95"
        >
          {downloading ? "..." : "⬇ Download"}
        </button>
        <button
          onClick={handleShare}
          className="flex-1 rounded-xl bg-accent py-3 text-sm font-semibold text-black transition-transform active:scale-95"
        >
          📤 Share
        </button>
      </div>
    </main>
  );
}
