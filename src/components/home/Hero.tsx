import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { personalInfo } from "@/data/content";
import { ChevronDown } from "lucide-react";
import hero from "../../image/hero.png";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  // Smooth spring for background parallax
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  // Magnetic cursor effect
  const magneticX = useSpring(0, { stiffness: 150, damping: 15 });
  const magneticY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Subtle parallax for background
      setMousePosition({
        x: (clientX - innerWidth / 2) / 50,
        y: (clientY - innerHeight / 2) / 50,
      });

      // Magnetic effect for text (subtle)
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      magneticX.set((clientX - centerX) / 80);
      magneticY.set((clientY - centerY) / 80);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [magneticX, magneticY]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{
          y: smoothY,
          scale,
          x: mousePosition.x,
        }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background z-10" />
        <img
          src={hero}
          alt="Creative studio background"
          className="w-full h-[120%] object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6"
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Name with Magnetic Effect */}
        <motion.div
          style={{ x: magneticX, y: magneticY }}
          className="overflow-hidden"
        >
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="hero-text"
          >
            <span className="block">Gayatri</span>
            <span className="block text-muted-foreground/70">Dhanda</span>
          </motion.h1>
        </motion.div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-lg md:text-xl text-muted-foreground mt-8 max-w-md mx-auto"
        >
          {personalInfo.role}
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity }}
        className="scroll-indicator flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Scroll to content"
      >
        <span className="font-body text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
