"use client"

import { motion } from "framer-motion"
import { Heart, Star, Gift, Music, Camera, Smile } from "lucide-react"

const timelineMemories = [
  {
    icon: Heart,
    title: "The First Time We Met",
    text: "That moment changed everything. Who knew a simple hello would turn into a lifetime of memories? From that very first conversation, I knew you were someone special.",
    year: "The Beginning",
  },
  {
    icon: Star,
    title: "Late Night Conversations",
    text: "Remember those endless nights where we talked until dawn? About dreams, fears, and everything in between. Those conversations shaped who we are today.",
    year: "The Bonding",
  },
  {
    icon: Music,
    title: "Our Silly Dance Moments",
    text: "Every time a good song came on, we couldn't help it. Dancing in the living room, in the car, everywhere. Your energy is absolutely contagious!",
    year: "The Fun Times",
  },
  {
    icon: Camera,
    title: "Adventures Together",
    text: "From spontaneous road trips to planned getaways, every adventure with you feels like the best day of my life. You make everything an unforgettable experience.",
    year: "The Adventures",
  },
  {
    icon: Gift,
    title: "Surprise Moments",
    text: "You have the most genuine reactions. Whether it's a tiny gift or a grand surprise, your joy is the most beautiful thing in the world.",
    year: "The Surprises",
  },
  {
    icon: Smile,
    title: "And Many More To Come...",
    text: "This is just the beginning. There are so many more memories to create, so many more laughs to share, and so many more birthdays to celebrate together!",
    year: "The Future",
  },
]

const decorativeHearts = Array.from({ length: 20 }, (_, i) => {
  const leftSeed = ((i * 37 + 17) % 100) + (((i * 29 + 11) % 100) / 100)
  const topSeed = ((i * 53 + 23) % 100) + (((i * 31 + 7) % 100) / 100)
  const duration = 3 + ((i * 17 + 5) % 20) / 10
  const delay = ((i * 11 + 3) % 20) / 10

  return {
    left: `${leftSeed}%`,
    top: `${topSeed}%`,
    duration,
    delay,
  }
})

export default function MemoriesSection() {
  return (
    <section className="px-4 py-12 md:py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        {decorativeHearts.map((heart, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: heart.left,
              top: heart.top,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
            }}
          >
            <Heart className="w-4 h-4 text-primary" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-20"
      >
        <h2 className="font-serif text-4xl md:text-6xl text-secondary mb-4">
          A Walk Down Memory Lane
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg leading-relaxed">
          Every chapter of our story is filled with love, laughter, and moments
          that I will cherish forever.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Center line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2" />

        {timelineMemories.map((memory, index) => {
          const Icon = memory.icon
          const isLeft = index % 2 === 0

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                type: "spring",
                stiffness: 80,
              }}
              className={`relative flex items-start mb-12 md:mb-16 ${
                isLeft
                  ? "md:flex-row flex-row"
                  : "md:flex-row-reverse flex-row"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-4 border-background"
                >
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              </div>

              {/* Content card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-xl p-5 md:p-6 border border-primary/10 shadow-lg"
                >
                  <span className="text-xs text-secondary font-semibold uppercase tracking-wider">
                    {memory.year}
                  </span>
                  <h3 className="text-foreground text-lg md:text-xl font-semibold mt-1 mb-2">
                    {memory.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {memory.text}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Final message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mt-12 md:mt-20"
      >
        <div className="inline-block bg-card border border-primary/20 rounded-2xl p-6 md:p-10 shadow-xl max-w-xl">
          <Heart className="w-10 h-10 text-primary mx-auto mb-4" fill="currentColor" />
          <h3 className="font-serif text-3xl md:text-4xl text-primary mb-3">
            Happy Birthday!
          </h3>
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
            You deserve all the happiness in the world. May this year bring you
            endless joy, incredible adventures, and everything your heart desires.
            I love celebrating you!
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-secondary">
            <Star className="w-4 h-4" fill="currentColor" />
            <span className="text-sm font-semibold">With all my love, forever and always</span>
            <Star className="w-4 h-4" fill="currentColor" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
