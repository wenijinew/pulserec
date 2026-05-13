"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: "⚡" },
  { href: "/sports", label: "Sports", icon: "🎯" },
  { href: "/record", label: "Record", icon: "✏️" },
  { href: "/history", label: "History", icon: "📊" },
  { href: "/share", label: "Share", icon: "📤" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-800 bg-black/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md justify-around py-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors",
                active ? "text-accent" : "text-neutral-500",
              ].join(" ")}
              aria-current={active ? "page" : undefined}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
