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

  if (saved) {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-accent">✓</span>
            <span className="text-sm font-medium">{name || `Record ${index + 1}`}</span>
          </div>
          <div className="flex gap-2 text-xs text-neutral-500">
            {sport.fields.slice(0, 3).map((f) => (
              <span key={f.name}>{values[f.name]} {f.unit}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-neutral-900 transition-all">
      {/* Collapsed: blank card */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-sm font-bold text-neutral-500">
            {index + 1}
          </span>
          <span className="text-sm text-neutral-500">
            {expanded ? "Fill in your stats" : "Tap to record"}
          </span>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          className="text-neutral-600"
        >
          ▾
        </motion.span>
      </button>

      {/* Expanded: inputs */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 px-5 pb-5">
              {/* Name input */}
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg bg-neutral-800 px-3 py-2 text-sm text-white placeholder-neutral-600 outline-none focus:ring-2 focus:ring-accent"
                aria-label="Your name"
              />

              {/* Stat fields */}
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

              {/* Save button */}
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
