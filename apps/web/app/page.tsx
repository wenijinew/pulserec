import Link from "next/link";
import { FadeInView } from "./components/animations";

const features = [
  { icon: "🏀", title: "Multi-Sport", desc: "Basketball, football, ping pong, handball — track them all." },
  { icon: "📅", title: "Daily Records", desc: "One tap to log your stats. Build streaks over time." },
  { icon: "📤", title: "Share Cards", desc: "Beautiful stat cards for Instagram, TikTok, and more." },
  { icon: "🔒", title: "Privacy First", desc: "Choose exactly which stats to share. You're in control." },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-6xl font-bold tracking-tight sm:text-7xl">
          Pulse<span className="text-accent">Rec</span>
        </h1>
        <p className="mt-4 max-w-md text-xl text-neutral-400">
          Track your sports stats. Share your pulse.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/onboarding"
            className="rounded-xl bg-accent px-8 py-3.5 text-lg font-semibold text-black transition-transform active:scale-95"
          >
            Get Started
          </Link>
          <Link
            href="/record"
            className="rounded-xl border border-neutral-700 px-8 py-3.5 text-lg font-semibold transition-colors hover:border-neutral-500"
          >
            Try Demo
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-2xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <FadeInView key={f.title}>
              <div className="rounded-2xl bg-neutral-900 dark:bg-neutral-900 p-6">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-neutral-400">{f.desc}</p>
              </div>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t border-neutral-800 py-20 text-center">
        <h2 className="text-3xl font-bold">Ready to track your pulse?</h2>
        <p className="mt-3 text-neutral-400">Free. No ads. Just your stats.</p>
        <Link
          href="/onboarding"
          className="mt-8 inline-block rounded-xl bg-accent px-10 py-4 text-lg font-semibold text-black transition-transform active:scale-95"
        >
          Start Now →
        </Link>
      </section>
    </main>
  );
}
