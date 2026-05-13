"use client";

import React from "react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options: { value: "light" | "dark" | "system"; icon: string }[] = [
    { value: "light", icon: "☀️" },
    { value: "system", icon: "💻" },
    { value: "dark", icon: "🌙" },
  ];

  return (
    <div className="flex rounded-xl bg-neutral-900 p-1 dark:bg-neutral-800" role="radiogroup" aria-label="Theme">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setTheme(opt.value)}
          role="radio"
          aria-checked={theme === opt.value}
          className={[
            "rounded-lg px-3 py-1.5 text-sm transition-colors",
            theme === opt.value ? "bg-accent text-black" : "text-neutral-400 hover:text-white",
          ].join(" ")}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
}
