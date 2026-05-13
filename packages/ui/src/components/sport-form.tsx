"use client";

import React, { useState } from "react";
import type { SportConfig } from "@pulserec/db";

interface SportFormProps {
  sport: SportConfig;
  onSubmit: (values: Record<string, number>) => void;
  initialValues?: Record<string, number>;
}

export function SportForm({ sport, onSubmit, initialValues = {} }: SportFormProps) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(sport.fields.map((f) => [f.name, initialValues[f.name] ?? 0]))
  );

  const handleChange = (name: string, value: number) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{sport.icon}</span>
        <h2 className="text-2xl font-bold">{sport.name}</h2>
      </div>

      <div className="grid gap-4">
        {sport.fields.map((field) => (
          <div key={field.name} className="flex items-center justify-between rounded-xl bg-neutral-900 px-4 py-3">
            <label htmlFor={field.name} className="text-sm text-neutral-400">
              {field.label}
            </label>
            <div className="flex items-center gap-2">
              <input
                id={field.name}
                type="number"
                min={field.min}
                max={field.max}
                step={field.step ?? 1}
                value={values[field.name] ?? 0}
                onChange={(e) => handleChange(field.name, parseFloat(e.target.value) || 0)}
                className="w-20 rounded-lg bg-neutral-800 px-3 py-2 text-right text-lg font-semibold text-white outline-none focus:ring-2 focus:ring-accent"
                aria-label={`${field.label} in ${field.unit}`}
              />
              <span className="w-8 text-xs text-neutral-500">{field.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-accent py-3 text-lg font-semibold text-black transition-transform active:scale-95"
      >
        Save Record
      </button>
    </form>
  );
}
