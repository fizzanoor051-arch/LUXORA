"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  initialScale?: number;
  className?: string;
}

export default function ScaleIn({
  children,
  delay = 0,
  duration = 0.6,
  initialScale = 0.9,
  className = "",
}: ScaleInProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: initialScale,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}