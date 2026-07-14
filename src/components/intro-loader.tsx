"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export function IntroLoader({
  businessName,
  logoUrl,
  onComplete
}: {
  businessName: string;
  logoUrl: string;
  onComplete?: () => void;
}) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(true);
  const reducedMotion = useReducedMotion();
  const completed = useRef(false);

  const completeIntro = useCallback(() => {
    if (completed.current) {
      return;
    }
    completed.current = true;
    setVisible(false);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((current) => Math.min(current + Math.floor(Math.random() * 18) + 8, 100));
    }, reducedMotion ? 40 : 120);

    const timeout = window.setTimeout(() => {
      completeIntro();
    }, reducedMotion ? 300 : 1650);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [completeIntro, reducedMotion]);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = window.setTimeout(() => {
        completeIntro();
      }, 260);
      return () => window.clearTimeout(timeout);
    }
  }, [completeIntro, progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-black px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className="relative w-full max-w-sm text-center">
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
                  className="mx-auto h-20 w-auto object-contain sm:h-24"
                  onError={() => setShowLogo(false)}
                  priority
                />
              ) : (
                <span className="font-serif text-4xl gold-text sm:text-5xl">{businessName}</span>
              )}
            </motion.div>
            <motion.div
              className="mx-auto h-px w-full max-w-64 overflow-hidden bg-white/10"
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
