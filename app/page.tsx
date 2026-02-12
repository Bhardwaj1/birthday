"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import QuestionCard from "@/components/question-card"
import HappyBirthdaySplash from "@/components/happy-birthday-splash"

const BalloonScene = dynamic(() => import("@/components/balloon-scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-10 h-10 text-primary" />
        </motion.div>
        <p className="text-muted-foreground text-sm font-sans">Preparing your surprise...</p>
      </motion.div>
    </div>
  ),
})

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(false)
  const [showQuestion, setShowQuestion] = useState(true)
  const router = useRouter()

  const handleCorrectAnswer = useCallback(() => {
    setShowQuestion(false)
    setShowSplash(true)
  }, [])

  const handleSplashComplete = useCallback(() => {
    router.push("/birthday")
  }, [router])

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* 3D Balloon Background */}
      <div className="fixed inset-0 z-0">
        <BalloonScene />
      </div>

      {/* Question Card Overlay */}
      {showQuestion && (
        <div className="relative z-10">
          <QuestionCard onCorrectAnswer={handleCorrectAnswer} />
        </div>
      )}

      {/* Happy Birthday Splash Screen */}
      <HappyBirthdaySplash
        active={showSplash}
        onComplete={handleSplashComplete}
      />
    </main>
  )
}
