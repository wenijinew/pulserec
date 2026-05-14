"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SportConfig } from "@pulserec/db";

interface RecordCardProps {
  index: number;
  sport: SportConfig;
  savedData?: { values: Record<string, number>; name: string };
  onSave: (values: Record<string, number>, name: string) => void;
}

export function RecordCard({ index, sport, savedData, onSave }: RecordCardProps) {
  const [zoomed, setZoomed] = useState(false);
  const [saved, setSaved] = useState(!!savedData);
  const [name, setName] = useState(savedData?.name ?? "");
  const [values, setValues] = useState<Record<string, number>>(() =>
    savedData?.values ?? Object.fromEntries(sport.fields.map((f) => [f.name, 0]))
  );

  const handleSave = () => {
    onSave(values, name);
    setSaved(true);
    setZoomed(false);
  };

  // Sci-fi glyphs
  const glyphs = ["◈", "⬡", "△", "◎", "⟐", "⬢", "▽", "◇", "⏣", "⟡"];
  const codes = ["Σ-01", "Ω-02", "Δ-03", "Ψ-04", "Λ-05", "Θ-06", "Ξ-07", "Φ-08", "Π-09", "Γ-10"];
  const glyph = glyphs[index];
  const code = codes[index];

  const cardContent = saved ? (
    <>
      <div className="absolute left-2 top-2 text-[9px] font-bold font-mono text-cyan-500">
        {code}<br />{glyph}
      </div>
      <div className="flex h-full flex-col items-center justify-center">
        <span className="text-cyan-400 text-lg">✓</span>
        <span className="mt-1 text-[10px] font-mono font-medium text-cyan-300/70">{name || "Saved"}</span>
        <div className="mt-2 space-y-0.5 text-center">
          {sport.fields.slice(0, 3).map((f) => (
            <div key={f.name} className="text-[9px] font-mono text-cyan-600">{values[f.name]} {f.unit}</div>
          ))}
        </div>
        <span className="mt-2 text-[8px] text-cyan-800">tap to edit</span>
      </div>
      <div className="absolute bottom-2 right-2 rotate-180 text-[9px] font-bold font-mono text-cyan-700">{glyph}</div>
    </>
  ) : (
    <>
      <div className="absolute left-2 top-2 text-[9px] font-bold font-mono text-cyan-500">
        {code}<br />{glyph}
      </div>
      <div className="flex h-full flex-col items-center justify-center">
        <span className="text-4xl text-cyan-500/20">{glyph}</span>
        <span className="mt-2 text-[10px] font-mono text-cyan-700">Tap to play</span>
      </div>
      <div className="absolute bottom-2 right-2 rotate-180 text-[9px] font-bold font-mono text-cyan-700">{glyph}</div>
    </>
  );

  return (
    <div className="relative">
      {/* Zoom icon */}
      <button
        onClick={(e) => { e.stopPropagation(); setZoomed(true); }}
        className="absolute right-1.5 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded bg-cyan-900/60 text-[10px] text-cyan-400 hover:bg-cyan-800/80 hover:text-cyan-200 transition-colors border border-cyan-500/30"
        aria-label="Zoom card"
      >
        ⛶
      </button>

      {/* Card face */}
      <button
        onClick={() => setZoomed(true)}
        className={[
          "relative h-48 w-32 rounded-xl border bg-gradient-to-br from-[#0a0f1a] via-[#0d1525] to-[#0a1a2a] p-3 transition-all active:scale-95",
          saved
            ? "border-cyan-500/40 shadow-[0_0_20px_rgba(0,229,255,0.1)] hover:shadow-[0_0_30px_rgba(0,229,255,0.2)]"
            : "border-cyan-900/50 hover:border-cyan-600/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]",
        ].join(" ")}
      >
        {cardContent}
      </button>

      {/* Modal — rendered inline, not as sub-component */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[300px] max-h-[85vh] overflow-y-auto rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-[#0a0f1a] via-[#0d1525] to-[#0a1a2a] p-6 shadow-[0_0_40px_rgba(0,229,255,0.15)]"
            >
              <button
                onClick={() => setZoomed(false)}
                className="absolute right-3 top-3 text-cyan-700 hover:text-cyan-300 text-lg"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="text-lg font-bold font-mono text-cyan-300">{glyph} {code}</div>
              <div className="mt-4 flex flex-col items-center">
                <span className="text-5xl text-cyan-500/30">{glyph}</span>
                <span className="mt-2 text-xs uppercase tracking-widest font-mono text-cyan-700">{sport.name}</span>
              </div>

              {/* Form */}
              <div className="mt-5 space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg bg-cyan-950/40 border border-cyan-800/30 px-3 py-2 text-sm font-mono text-white placeholder-cyan-800 outline-none focus:ring-2 focus:ring-cyan-500"
                  aria-label="Your name"
                />
                {sport.fields.map((field) => (
                  <div key={field.name} className="flex items-center justify-between">
                    <label className="text-xs font-mono text-cyan-400">{field.label}</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={field.min}
                        max={field.max}
                        step={field.step ?? 1}
                        value={values[field.name] ?? 0}
                        onChange={(e) => setValues((v) => ({ ...v, [field.name]: parseFloat(e.target.value) || 0 }))}
                        className="w-16 rounded-lg bg-cyan-950/40 border border-cyan-800/30 px-2 py-1.5 text-right text-sm font-mono font-semibold text-white outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <span className="w-8 text-[10px] font-mono text-cyan-700">{field.unit}</span>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleSave}
                  className="mt-3 w-full rounded-xl bg-cyan-500 py-3 text-base font-bold text-black shadow-lg shadow-cyan-500/25 active:scale-95"
                >
                  💾 Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
