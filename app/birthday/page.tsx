"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Sparkles, ArrowDown } from "lucide-react"
import PhotoCollage from "@/components/photo-collage"
import MemoriesSection from "@/components/memories-section"

const BirthdayCard3D = dynamic(() => import("@/components/birthday-card-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[50vh] md:h-[60vh] flex items-center justify-center bg-background">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-8 h-8 text-primary" />
      </motion.div>
    </div>
  ),
})

export default function BirthdayPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero 3D Section */}
      <section className="relative">
        <BirthdayCard3D />
        
        {/* Overlay text */}
        <div className="absolute bottom-0 left-0 right-0 pb-6 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-foreground/60 text-sm">Scroll down for your surprise</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 text-primary/60" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-4 py-8">
        <div className="h-px w-16 bg-primary/20" />
        <Sparkles className="w-5 h-5 text-secondary" />
        <div className="h-px w-16 bg-primary/20" />
      </div>

      {/* Photo Collage Section */}
      <PhotoCollage />

      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-4 py-4">
        <div className="h-px w-16 bg-secondary/20" />
        <Sparkles className="w-5 h-5 text-primary" />
        <div className="h-px w-16 bg-secondary/20" />
      </div>

      {/* Memories Timeline Section */}
      <MemoriesSection />

      {/* Footer */}
      <footer className="text-center py-8 border-t border-primary/10">
        <p className="text-muted-foreground text-sm">
          {"Made with love, just for you"}
        </p>
      </footer>
    </main>
  )
}
