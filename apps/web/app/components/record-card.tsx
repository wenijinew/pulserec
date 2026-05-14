"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SportConfig } from "@pulserec/db";

interface RecordCardProps {
  index: number;
  sport: SportConfig;
  onSave: (values: Record<string, number>, name: string) => void;
}

export function RecordCard({ index, sport, onSave }: RecordCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("");
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(sport.fields.map((f) => [f.name, 0]))
  );

  const handleSave = () => {
    onSave(values, name);
    setSaved(true);
    setExpanded(false);
  };

  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const suit = suits[index % 4];
  const rank = ranks[index];
  const isRed = suit === "♥" || suit === "♦";

  if (saved) {
    return (
      <div className="relative h-48 w-32 rounded-xl border-2 border-accent/40 bg-gradient-to-br from-neutral-900 to-neutral-950 p-3 shadow-lg">
        <div className={`absolute left-2 top-2 text-xs font-bold ${isRed ? "text-red-500" : "text-white"}`}>
          {rank}<br />{suit}
        </div>
        <div className="flex h-full flex-col items-center justify-center">
          <span className="text-accent text-lg">✓</span>
          <span className="mt-1 text-[10px] font-medium text-neutral-400">{name || "Saved"}</span>
          <div className="mt-2 space-y-0.5 text-center">
            {sport.fields.slice(0, 3).map((f) => (
              <div key={f.name} className="text-[9px] text-neutral-500">{values[f.name]} {f.unit}</div>
            ))}
          </div>
        </div>
        <div className={`absolute bottom-2 right-2 rotate-180 text-xs font-bold ${isRed ? "text-red-500" : "text-white"}`}>
          {rank}<br />{suit}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Poker card face */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={[
          "relative h-48 w-32 rounded-xl border-2 transition-all shadow-lg",
          expanded
            ? "border-accent bg-gradient-to-br from-neutral-800 to-neutral-900"
            : "border-neutral-700 bg-gradient-to-br from-neutral-900 to-neutral-950 hover:border-neutral-500 hover:shadow-xl active:scale-95",
        ].join(" ")}
      >
        <div className={`absolute left-2 top-2 text-xs font-bold ${isRed ? "text-red-500" : "text-white"}`}>
          {rank}<br />{suit}
        </div>
        <div className="flex h-full flex-col items-center justify-center">
          <span className={`text-4xl ${isRed ? "text-red-500/30" : "text-white/20"}`}>{suit}</span>
          <span className="mt-2 text-[10px] text-neutral-500">
            {expanded ? "Fill stats ↓" : "Tap to play"}
          </span>
        </div>
        <div className={`absolute bottom-2 right-2 rotate-180 text-xs font-bold ${isRed ? "text-red-500" : "text-white"}`}>
          {rank}<br />{suit}
        </div>
      </button>

      {/* Expanded: inputs panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-2 overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800"
          >
            <div className="space-y-3 p-4">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg bg-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-600 outline-none focus:ring-2 focus:ring-accent"
                aria-label="Your name"
              />
              {sport.fields.map((field) => (
                <div key={field.name} className="flex items-center justify-between">
                  <label htmlFor={`${index}-${field.name}`} className="text-sm text-neutral-400">
                    {field.label}
                  </label>
                  <div className="flex items-center gap-1">
                    <input
                      id={`${index}-${field.name}`}
                      type="number"
                      min={field.min}
                      max={field.max}
                      step={field.step ?? 1}
                      value={values[field.name] ?? 0}
                      onChange={(e) => setValues((v) => ({ ...v, [field.name]: parseFloat(e.target.value) || 0 }))}
                      className="w-16 rounded-lg bg-neutral-800 px-2 py-1.5 text-right text-sm font-semibold text-white outline-none focus:ring-2 focus:ring-accent"
                      aria-label={`${field.label} in ${field.unit}`}
                    />
                    <span className="w-8 text-xs text-neutral-600">{field.unit}</span>
                  </div>
                </div>
              ))}
              <button
                onClick={handleSave}
                className="mt-2 w-full rounded-xl bg-accent py-2.5 text-sm font-semibold text-black active:scale-95"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
