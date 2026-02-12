"use client"

import { useMemo, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  color: string
  delay: number
  rotation: number
  size: number
  duration: number
}

export default function ConfettiExplosion({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  const colors = useMemo(
    () => ["#ff69b4", "#ffd700", "#ff1493", "#ff85a2", "#ffc107", "#e91e63", "#ffb6c1", "#ff4081"],
    []
  )

  useEffect(() => {
    if (active) {
      const newPieces: ConfettiPiece[] = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.8,
        rotation: Math.random() * 360,
        size: 6 + Math.random() * 10,
        duration: 2 + Math.random() * 2,
      }))
      setPieces(newPieces)
    } else {
      setPieces([])
    }
  }, [active, colors])

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{
                x: `${piece.x}vw`,
                y: -20,
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                y: "110vh",
                rotate: piece.rotation * 3,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: "linear",
              }}
              style={{
                position: "absolute",
                width: piece.size,
                height: piece.size * 0.6,
                backgroundColor: piece.color,
                borderRadius: piece.size > 10 ? "50%" : "2px",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
