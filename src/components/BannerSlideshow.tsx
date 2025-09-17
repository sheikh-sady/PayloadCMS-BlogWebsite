"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/assets/banner1.jpg",
    title: "Welcome To Blogger",
    subtitle: "Discover stories, ideas, and insights",
  },
  {
    image: "/assets/banner2.jpg",
    title: "Be a blogger",
    subtitle: "Write blogs one at a time",
  },
  {
    image: "/assets/banner3.jpg",
    title: "Meaningful Insights",
    subtitle: "See what people think about you",
  },
];

export default function BannerSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt="banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-4">
            <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-2">
              {slides[current].title}
            </h2>
            <p className="text-sm sm:text-lg md:text-xl">
              {slides[current].subtitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
