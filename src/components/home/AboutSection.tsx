import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { aboutData } from "@/data/content";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/components/layout/PageTransition";
import about from "../../image/about.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "enter" : "initial"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image */}
          <motion.div
            variants={fadeUp}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
              src={about}
              alt="Gayatri Dhanda portrait"
              className="w-full h-full object-cover"
            />
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-border rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <div className="lg:pl-8">
            <motion.span
              variants={fadeUp}
              className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground"
            >
              About Me
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-light mt-4 mb-8"
            >
              Creating art that
              <span className="italic text-muted-foreground"> speaks</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-lg leading-relaxed mb-6"
            >
              {aboutData.shortBio}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
              {aboutData.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-background rounded-full text-sm text-muted-foreground border border-border"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-body text-sm tracking-wider uppercase group"
              >
                <span className="relative">
                  Learn More
                  <span className="absolute bottom-0 left-0 w-full h-px bg-foreground origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
