"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"

interface QuestionCardProps {
  onCorrectAnswer: () => void
}

const QUESTION = "Which is your faevorite nickname?"
const OPTIONS = [
  { text: "Poplu", correct: false },
  { text: "Khoman", correct: false },
  { text: "Bhalu", correct: false },
  { text: "Kiku", correct: true },
]

export default function QuestionCard({ onCorrectAnswer }: QuestionCardProps) {
  const [isShaking, setIsShaking] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [wrongAttempts, setWrongAttempts] = useState<number[]>([])
  const [hintVisible, setHintVisible] = useState(false)

  const handleAnswer = useCallback(
    (index: number, correct: boolean) => {
      setSelectedIndex(index)

      if (correct) {
        onCorrectAnswer()
      } else {
        setIsShaking(true)
        setWrongAttempts((prev) => [...prev, index])
        setTimeout(() => {
          setIsShaking(false)
          setSelectedIndex(null)
        }, 700)

        if (wrongAttempts.length >= 1) {
          setHintVisible(true)
        }
      }
    },
    [onCorrectAnswer, wrongAttempts]
  )

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <motion.div
        className={`relative w-full max-w-md ${isShaking ? "animate-shake" : ""}`}
        initial={{ opacity: 0, y: 50, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        {/* Glow effect behind card */}
        <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl" />
        
        <div className="relative bg-card rounded-2xl p-6 md:p-8 border border-primary/20 shadow-2xl overflow-hidden">
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-20 h-20 opacity-20">
            <svg viewBox="0 0 80 80" fill="none">
              <path d="M0 0C0 44.18 35.82 80 80 80V0H0Z" fill="hsl(340, 80%, 60%)" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20 opacity-20 rotate-180">
            <svg viewBox="0 0 80 80" fill="none">
              <path d="M0 0C0 44.18 35.82 80 80 80V0H0Z" fill="hsl(35, 80%, 55%)" />
            </svg>
          </div>

          {/* Card header */}
          <div className="text-center mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block"
            >
              <Sparkles className="w-8 h-8 text-secondary mx-auto mb-3" />
            </motion.div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-2">
              A Special Question
            </h2>
            <p className="text-muted-foreground text-sm">
              Answer correctly to unlock your surprise!
            </p>
          </div>

          {/* Question */}
          <div className="bg-muted/50 rounded-xl p-4 mb-6 border border-primary/10">
            <p className="text-foreground text-center text-base md:text-lg font-medium leading-relaxed">
              {QUESTION}
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {OPTIONS.map((option, index) => {
              const isWrong = wrongAttempts.includes(index)
              const isSelected = selectedIndex === index

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index, option.correct)}
                  disabled={isWrong}
                  className={`
                    relative w-full text-left p-4 rounded-xl border-2 transition-all duration-300
                    ${isWrong
                      ? "border-destructive/50 bg-destructive/10 text-muted-foreground opacity-60 cursor-not-allowed"
                      : isSelected && option.correct
                        ? "border-secondary bg-secondary/20 text-secondary"
                        : "border-primary/20 bg-card hover:border-primary/50 hover:bg-primary/5 text-foreground cursor-pointer"
                    }
                  `}
                  whileHover={!isWrong ? { scale: 1.02, x: 5 } : {}}
                  whileTap={!isWrong ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center gap-3">
                    <span className={`
                      flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold
                      ${isWrong 
                        ? "bg-destructive/20 text-destructive" 
                        : "bg-primary/20 text-primary"
                      }
                    `}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium">{option.text}</span>
                    {isWrong && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto text-destructive text-lg"
                      >
                        {"x"}
                      </motion.span>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Hint */}
          {hintVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <p className="text-primary/70 text-sm flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" />
                {"Hint: Think with your heart!"}
                <Heart className="w-4 h-4" />
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
