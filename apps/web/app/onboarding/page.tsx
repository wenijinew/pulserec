"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const steps = [
  {
    icon: "⚡",
    title: "Track Your Pulse",
    description: "Log your daily sports stats in seconds. Basketball, football, ping pong, handball — all in one place.",
  },
  {
    icon: "📊",
    title: "See Your Progress",
    description: "Watch your stats grow over time. Daily records build into a powerful history of your athletic journey.",
  },
  {
    icon: "📤",
    title: "Share Your Flex",
    description: "Generate beautiful stat cards and share them to Instagram, TikTok, or anywhere. Show the world your grind.",
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("pulserec-onboarded", "true");
      router.push("/sports");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("pulserec-onboarded", "true");
    router.push("/sports");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      {/* Progress dots */}
      <div className="mb-12 flex gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={["h-1.5 rounded-full transition-all", i === step ? "w-8 bg-accent" : "w-1.5 bg-neutral-700"].join(" ")}
          />
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="mb-6 text-6xl">{steps[step].icon}</div>
          <h1 className="mb-3 text-3xl font-bold">{steps[step].title}</h1>
          <p className="mx-auto max-w-xs text-neutral-400">{steps[step].description}</p>
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-16 flex w-full max-w-xs flex-col gap-3">
        <button
          onClick={handleNext}
          className="w-full rounded-xl bg-accent py-3.5 text-lg font-semibold text-black transition-transform active:scale-95"
        >
          {step < steps.length - 1 ? "Next" : "Get Started"}
        </button>
        {step < steps.length - 1 && (
          <button onClick={handleSkip} className="text-sm text-neutral-500 hover:text-neutral-300">
            Skip
          </button>
        )}
      </div>
    </main>
  );
}
