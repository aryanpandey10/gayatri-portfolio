import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PageTransition, {
  fadeUp,
  staggerContainer,
} from "@/components/layout/PageTransition";
import { aboutData, personalInfo } from "@/data/content";
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import aboutPage from "../image/aboutPage.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <PageTransition>
      <main className="pt-24">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="enter"
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
            >
              {/* Image Column */}
              <motion.div variants={fadeUp} className="order-2 lg:order-1">
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                    <motion.img
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.7 }}
                      src={aboutPage}
                      alt="Gayatri Dhanda"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative frame */}
                  <div className="absolute -bottom-6 -right-6 w-full h-full border border-border rounded-2xl -z-10" />

                  {/* Stats overlay */}
                  <div className="absolute -bottom-8 -left-8 bg-background border border-border rounded-xl p-6 shadow-lg">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="font-display text-3xl font-light">5+</p>
                        <p className="text-muted-foreground text-sm">
                          Years Experience
                        </p>
                      </div>
                      <div>
                        <p className="font-display text-3xl font-light">100+</p>
                        <p className="text-muted-foreground text-sm">
                          Projects
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content Column */}
              <div className="order-1 lg:order-2">
                <motion.span
                  variants={fadeUp}
                  className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground"
                >
                  About Me
                </motion.span>

                <motion.h1
                  variants={fadeUp}
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-light mt-4 mb-8"
                >
                  Hello, I'm{" "}
                  <span className="italic text-muted-foreground">Gayatri</span>
                </motion.h1>

                <motion.div
                  variants={fadeUp}
                  className="space-y-6 text-muted-foreground text-lg leading-relaxed"
                >
                  {aboutData.fullBio.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </motion.div>

                {/* Social Links */}
                <motion.div variants={fadeUp} className="flex gap-4 mt-8">
                  <a
                    href={personalInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors group"
                  >
                    <Instagram className="w-4 h-4" />
                    <span className="text-sm">Instagram</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors group"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={ref} className="section-padding bg-secondary/30">
          <div className="container-custom">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={isInView ? "enter" : "initial"}
            >
              <motion.span
                variants={fadeUp}
                className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground"
              >
                Expertise
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl font-light mt-4 mb-12"
              >
                Skills & Capabilities
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {aboutData.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    variants={fadeUp}
                    custom={index}
                    className="p-6 bg-background rounded-xl border border-border hover:border-foreground/20 transition-colors"
                  >
                    <span className="font-display text-3xl font-light text-muted-foreground/30 block mb-2">
                      0{index + 1}
                    </span>
                    <p className="font-body font-medium">{skill}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section ref={timelineRef} className="section-padding">
          <div className="container-custom">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate={timelineInView ? "enter" : "initial"}
            >
              <motion.span
                variants={fadeUp}
                className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground"
              >
                Journey
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl font-light mt-4 mb-16"
              >
                Experience
              </motion.h2>

              <div className="space-y-0">
                {aboutData.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-border group"
                  >
                    <div className="md:col-span-3">
                      <span className="text-muted-foreground">{exp.year}</span>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="font-display text-2xl font-light group-hover:text-muted-foreground transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {exp.company}
                      </p>
                    </div>
                    <div className="md:col-span-5">
                      <p className="text-muted-foreground">{exp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Fun Facts */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="enter"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span
                variants={fadeUp}
                className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground"
              >
                Personal
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl font-light mt-4 mb-12"
              >
                Fun Facts
              </motion.h2>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {aboutData.funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="flex items-start gap-4 p-6 bg-background rounded-xl"
                  >
                    <span className="font-display text-4xl font-light text-muted-foreground/30">
                      {index + 1}
                    </span>
                    <p className="text-lg pt-2">{fact}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default About;
