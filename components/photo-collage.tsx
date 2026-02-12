"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const memories = [
  {
    src: "https://picsum.photos/id/1062/1200/900",
    alt: "Friends celebrating at a birthday party",
    caption: "The night we laughed until our stomachs hurt",
    rotation: -3,
  },
  {
    src: "https://picsum.photos/id/1027/1200/900",
    alt: "A beautiful birthday cake with candles",
    caption: "Remember this cake? Best one ever!",
    rotation: 2,
  },
  {
    src: "https://picsum.photos/id/1005/1200/900",
    alt: "Group selfie with party hats",
    caption: "The squad that always shows up",
    rotation: -2,
  },
  {
    src: "https://picsum.photos/id/1011/1200/900",
    alt: "Sunset celebration on a rooftop",
    caption: "That magical golden hour moment",
    rotation: 3,
  },
  {
    src: "https://picsum.photos/id/1012/1200/900",
    alt: "Opening gifts and laughing together",
    caption: "Your face when you opened that gift!",
    rotation: -1,
  },
  {
    src: "https://picsum.photos/id/1035/1200/900",
    alt: "Outdoor adventure with friends",
    caption: "Adventures are better with you",
    rotation: 2,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function PhotoCollage() {
  return (
    <section className="px-4 py-12 md:py-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-16"
      >
        <h2 className="font-serif text-4xl md:text-6xl text-primary mb-4">
          Our Precious Memories
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto text-base md:text-lg leading-relaxed">
          Every moment spent with you is a memory I treasure forever. Here are some of my favorites.
        </p>
      </motion.div>

      {/* Photo grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {memories.map((memory, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className="relative group"
            style={{ rotate: `${memory.rotation}deg` }}
          >
            <div className="bg-card rounded-xl overflow-hidden border border-primary/10 shadow-xl">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={memory.src}
                  alt={memory.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Caption */}
              <div className="p-4">
                <p className="text-foreground/80 text-sm md:text-base font-medium italic">
                  {`"${memory.caption}"`}
                </p>
              </div>
            </div>

            {/* Decorative tape effect */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-secondary/30 rounded-sm rotate-1" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
