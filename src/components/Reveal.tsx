"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Révélation au scroll : fondu + glissement + léger flou, une seule fois.
 * Sert de brique de base aux transitions de « scène » de la page d'accueil.
 */
export const EASE_CINEMA: [number, number, number, number] = [0.16, 1, 0.3, 1];

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Décalage de démarrage, en secondes (pour créer des cascades). */
  delay?: number;
  /** Amplitude du glissement vertical, en pixels. */
  y?: number;
  /** Durée de l'animation, en secondes. */
  duration?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  duration = 0.9,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y, filter: "blur(8px)" }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: reduceMotion ? 0.3 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: EASE_CINEMA,
      }}
    >
      {children}
    </motion.div>
  );
}
