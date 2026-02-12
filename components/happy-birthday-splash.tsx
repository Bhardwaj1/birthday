"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ConfettiExplosion from "./confetti-explosion"

interface HappyBirthdaySplashProps {
  active: boolean
  onComplete: () => void
}

function FireworkBurst({ x, y, delay }: { x: number; y: number; delay: number }) {
  const colors = ["#ff69b4", "#ffd700", "#ff1493", "#ff85a2", "#ffc107"]
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2
    const distance = 60 + Math.random() * 40
    return {
      id: i,
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance,
      color: colors[Math.floor(Math.random() * colors.length)],
    }
  })

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: 6,
            height: 6,
            backgroundColor: p.color,
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.5, 0],
            x: p.tx,
            y: p.ty,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  )
}

export default function HappyBirthdaySplash({ active, onComplete }: HappyBirthdaySplashProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (active) {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        onComplete()
      }, 4500)
      return () => clearTimeout(timer)
    }
  }, [active, onComplete])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "radial-gradient(ellipse at center, #2d1020 0%, #1a0a10 70%)",
          }}
        >
          <ConfettiExplosion active={showConfetti} />

          {/* Fireworks */}
          <div className="absolute inset-0 pointer-events-none">
            <FireworkBurst x={20} y={25} delay={0.3} />
            <FireworkBurst x={80} y={20} delay={0.6} />
            <FireworkBurst x={50} y={15} delay={0.9} />
            <FireworkBurst x={15} y={50} delay={1.2} />
            <FireworkBurst x={85} y={45} delay={1.5} />
          </div>

          {/* Glowing rings */}
          <motion.div
            className="absolute rounded-full border-2 border-primary/30"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: [0, 400, 600],
              height: [0, 400, 600],
              opacity: [0, 0.5, 0],
            }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute rounded-full border-2 border-secondary/30"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: [0, 300, 500],
              height: [0, 300, 500],
              opacity: [0, 0.5, 0],
            }}
            transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
          />

          {/* Main text */}
          <div className="text-center z-10 px-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            >
              <h1 className="font-serif text-5xl md:text-8xl text-primary drop-shadow-lg">
                Happy
              </h1>
            </motion.div>

            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.6,
              }}
            >
              <h1 className="font-serif text-6xl md:text-9xl text-secondary drop-shadow-lg mt-2">
                Birthday!
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <p className="text-foreground/80 text-lg md:text-xl mt-6 font-sans">
                {"Wishing you the most magical day ever!"}
              </p>
            </motion.div>

            {/* Sparkle stars around text */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z"
                    fill="#ffd700"
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
