"use client";

import React, { forwardRef } from "react";
import type { SportConfig } from "@pulserec/db";

interface ShareCardProps {
  sport: SportConfig;
  values: Record<string, number>;
  username: string;
  date: string;
  hiddenFields?: string[];
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ sport, values, username, date, hiddenFields = [] }, ref) => {
    const visibleFields = sport.fields.filter((f) => !hiddenFields.includes(f.name));
    const primaryField = visibleFields[0];
    const secondaryFields = visibleFields.slice(1);

    return (
      <div
        ref={ref}
        className="w-[360px] rounded-3xl bg-gradient-to-b from-neutral-900 to-black p-8 text-center"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        {/* Sport header */}
        <div className="mb-6">
          <span className="text-4xl">{sport.icon}</span>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            {sport.name}
          </p>
        </div>

        {/* Hero stat */}
        {primaryField && (
          <div className="mb-6">
            <div className="text-6xl font-bold tracking-tight">{values[primaryField.name] ?? 0}</div>
            <div className="mt-1 text-sm text-neutral-500">{primaryField.label}</div>
          </div>
        )}

        {/* Secondary stats */}
        {secondaryFields.length > 0 && (
          <div className="mb-6 flex justify-center gap-4">
            {secondaryFields.map((field) => (
              <div key={field.name} className="text-center">
                <div className="text-xl font-bold">{values[field.name] ?? 0}</div>
                <div className="text-[10px] uppercase text-neutral-500">{field.unit}</div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-neutral-800 pt-4">
          <p className="text-xs text-neutral-500">
            @{username} · {date}
          </p>
          <p className="mt-1 text-[10px] font-medium tracking-wider text-accent">pulserec.app</p>
        </div>
      </div>
    );
  }
);

ShareCard.displayName = "ShareCard";
