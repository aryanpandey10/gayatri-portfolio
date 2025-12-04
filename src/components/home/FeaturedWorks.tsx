import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { featuredWorks } from "@/data/content";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/components/layout/PageTransition";

const FeaturedWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "enter" : "initial"}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground"
            >
              Portfolio
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-light mt-4"
            >
              Selected Works
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              to="/my-story"
              className="inline-flex items-center gap-2 font-body text-sm tracking-wider uppercase group"
            >
              <span className="relative">
                View All
                <span className="absolute bottom-0 left-0 w-full h-px bg-foreground origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Works Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "enter" : "initial"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              variants={fadeUp}
              custom={index}
            >
              <Link
                to={work.link}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-6 image-reveal">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Arrow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.div>
                </div>

                <span className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {work.category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl mt-2 mb-2 group-hover:text-muted-foreground transition-colors">
                  {work.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {work.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
