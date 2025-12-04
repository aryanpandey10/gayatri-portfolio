import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { personalInfo } from "@/data/content";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { fadeUp, staggerContainer } from "@/components/layout/PageTransition";

const ContactCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "enter" : "initial"}
          className="relative bg-gradient-to-br from-secondary/60 via-secondary/40 to-accent/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-accent/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-blush/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-background/5 to-transparent" />
          
          <div className="relative z-10">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="font-body text-xs sm:text-sm tracking-[0.2em] uppercase text-muted-foreground">
                Let's Create Together
              </span>
            </motion.div>
            
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-6 sm:mb-8"
            >
              Have a project in mind?
            </motion.h2>
            
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-12 px-2"
            >
              I'd love to hear about your ideas. Whether it's a commissioned artwork, 
              brand collaboration, or creative consultation, let's bring your vision to life.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            >
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-foreground text-background rounded-full font-body text-sm tracking-wider uppercase hover:bg-foreground/90 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                Get in Touch
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-background/80 backdrop-blur-sm border border-border rounded-full font-body text-xs sm:text-sm tracking-wider hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 hover:scale-105"
              >
                <span className="truncate max-w-[200px]">{personalInfo.email}</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
