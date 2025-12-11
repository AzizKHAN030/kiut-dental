'use client';

import { motion } from 'framer-motion';

export function FloatingTooth() {
  return (
    <motion.div
      className="fixed top-1/4 right-12 z-50 pointer-events-none hidden lg:block"
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        width="60"
        height="70"
        viewBox="0 0 60 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M30 5C15 5 10 15 10 25C10 35 10 45 10 52C10 58 13 65 20 65C23 65 25 63 27 60C28 58 29 55 30 55C31 55 32 58 33 60C35 63 37 65 40 65C47 65 50 58 50 52C50 45 50 35 50 25C50 15 45 5 30 5Z"
          fill="white"
          stroke="#2563eb"
          strokeWidth="2"
          initial={{ pathLength: 0, fill: "rgba(255,255,255,0)" }}
          animate={{ 
            pathLength: 1, 
            fill: "rgba(255,255,255,1)",
          }}
          transition={{ 
            pathLength: { duration: 2, ease: "easeInOut" },
            fill: { duration: 1, delay: 1 }
          }}
        />
        <motion.circle
          cx="22"
          cy="30"
          r="2"
          fill="#2563eb"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, duration: 0.3 }}
        />
        <motion.circle
          cx="38"
          cy="30"
          r="2"
          fill="#2563eb"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.2, duration: 0.3 }}
        />
        <motion.path
          d="M25 40C25 40 27.5 43 30 43C32.5 43 35 40 35 40"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.4, duration: 0.5 }}
        />
      </svg>
      
      {/* Sparkle effects */}
      <motion.div
        className="absolute -top-2 -right-2"
        animate={{
          scale: [0, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 0L11 9L20 10L11 11L10 20L9 11L0 10L9 9L10 0Z"
            fill="#fbbf24"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}