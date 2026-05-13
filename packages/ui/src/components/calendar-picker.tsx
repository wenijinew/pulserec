"use client";

import React, { useState } from "react";

interface CalendarPickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  hasRecordDates?: string[]; // ISO date strings that have records
}

export function CalendarPicker({ selectedDate, onDateChange, hasRecordDates = [] }: CalendarPickerProps) {
  const [viewMonth, setViewMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();

  const prevMonth = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));
  const nextMonth = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));

  const toISO = (d: Date) => d.toISOString().split("T")[0];
  const isToday = (day: number) => toISO(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)) === toISO(new Date());
  const isSelected = (day: number) => toISO(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)) === toISO(selectedDate);
  const hasRecord = (day: number) => hasRecordDates.includes(toISO(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)));

  const monthLabel = viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="rounded-2xl bg-neutral-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={prevMonth} className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800" aria-label="Previous month">
          ←
        </button>
        <span className="text-sm font-semibold">{monthLabel}</span>
        <button onClick={nextMonth} className="rounded-lg p-2 text-neutral-400 hover:bg-neutral-800" aria-label="Next month">
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-neutral-500">
        {weekDays.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const selected = isSelected(day);
          const today = isToday(day);
          const recorded = hasRecord(day);

          return (
            <button
              key={day}
              onClick={() => onDateChange(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day))}
              className={[
                "relative rounded-lg py-2 text-sm transition-colors",
                selected ? "bg-accent text-black font-bold" : "hover:bg-neutral-800",
                today && !selected ? "ring-1 ring-accent" : "",
              ].join(" ")}
              aria-label={`${monthLabel} ${day}${recorded ? ", has records" : ""}`}
            >
              {day}
              {recorded && !selected && (
                <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
