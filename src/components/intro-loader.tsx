"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function IntroLoader({
  businessName,
  logoUrl
}: {
  businessName: string;
  logoUrl: string;
}) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const seen = window.sessionStorage.getItem("only_intro_seen");
    if (seen) {
      return;
    }

    setVisible(true);
    const interval = window.setInterval(() => {
      setProgress((current) => Math.min(current + Math.floor(Math.random() * 18) + 8, 100));
    }, reducedMotion ? 40 : 120);

    const timeout = window.setTimeout(() => {
      window.sessionStorage.setItem("only_intro_seen", "true");
      setVisible(false);
    }, reducedMotion ? 300 : 1650);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = window.setTimeout(() => setVisible(false), 260);
      return () => window.clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mx-auto mb-7 flex justify-center"
            >
              {showLogo && logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={`${businessName} logo`}
                  width={150}
                  height={90}
                  className="h-24 w-auto object-contain"
                  onError={() => setShowLogo(false)}
                  priority
                />
              ) : (
                <span className="font-serif text-5xl gold-text">{businessName}</span>
              )}
            </motion.div>
            <motion.div
              className="mx-auto h-px w-64 overflow-hidden bg-white/10"
              initial={{ width: 0 }}
              animate={{ width: 256 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="h-full bg-gold-gradient"
                initial={{ x: "-100%" }}
                animate={{ x: `${Math.min(progress, 100) - 100}%` }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            <p className="mt-5 text-xs uppercase tracking-[0.4em] text-champagne">
              {Math.min(progress, 100)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
