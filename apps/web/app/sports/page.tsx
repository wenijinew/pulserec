"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { sportsConfig } from "@pulserec/db";
import type { SportConfig } from "@pulserec/db";

export default function SportsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<SportConfig | null>(null);

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">Pick Your Sport</h1>
      <p className="mb-8 text-neutral-400">Tap a sport to preview, then start recording.</p>

      <div className="grid grid-cols-2 gap-3">
        {sportsConfig.map((sport: SportConfig) => (
          <button
            key={sport.id}
            onClick={() => setSelected(sport)}
            className="flex h-36 flex-col items-center justify-center gap-2 rounded-2xl border border-cyan-900/40 bg-gradient-to-br from-[#0a0f1a] via-[#0d1525] to-[#0a1a2a] p-4 shadow-[0_0_15px_rgba(0,229,255,0.08)] transition-all hover:border-cyan-600/50 hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] active:scale-95"
          >
            <span className="text-4xl">{sport.icon}</span>
            <span className="text-sm font-semibold font-mono text-cyan-300">{sport.name}</span>
            <span className="text-[10px] font-mono text-cyan-700">{sport.fields.length} stats</span>
          </button>
        ))}
      </div>

      {/* Zoomed sport card modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[300px] rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-[#0a0f1a] via-[#0d1525] to-[#0a1a2a] p-8 shadow-[0_0_50px_rgba(0,229,255,0.2)]"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 text-cyan-700 hover:text-cyan-300 text-lg"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Sport info */}
              <div className="flex flex-col items-center text-center">
                <span className="text-6xl">{selected.icon}</span>
                <h2 className="mt-4 text-2xl font-bold font-mono text-cyan-200">{selected.name}</h2>
                <p className="mt-2 text-xs font-mono text-cyan-600">{selected.fields.length} trackable stats</p>

                {/* Stats preview */}
                <div className="mt-5 w-full space-y-1.5">
                  {selected.fields.map((f) => (
                    <div key={f.name} className="flex items-center justify-between rounded-lg bg-cyan-950/30 px-3 py-1.5">
                      <span className="text-xs font-mono text-cyan-400">{f.label}</span>
                      <span className="text-[10px] font-mono text-cyan-700">{f.unit}</span>
                    </div>
                  ))}
                </div>

                {/* Action button */}
                <button
                  onClick={() => router.push(`/record?sport=${selected.id}`)}
                  className="mt-6 w-full rounded-xl bg-cyan-500 py-3 text-base font-bold text-black shadow-lg shadow-cyan-500/25 active:scale-95 transition-transform"
                >
                  ▶ Start Recording
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
