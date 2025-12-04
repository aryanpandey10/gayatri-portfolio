import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { testimonials } from "@/data/content";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/components/layout/PageTransition";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "enter" : "initial"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span
            variants={fadeUp}
            className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground"
          >
            Testimonials
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl font-light mt-4 mb-16"
          >
            Kind Words
          </motion.h2>

          {/* Testimonial Slider */}
          <motion.div variants={fadeUp} className="relative">
            <Quote className="w-12 h-12 mx-auto mb-8 text-muted-foreground/30" />
            
            <div className="relative overflow-hidden">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-8 italic">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                <div>
                  <p className="font-body font-medium">
                    {testimonials[activeIndex].author}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[activeIndex].role}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeIndex
                        ? "bg-foreground"
                        : "bg-border hover:bg-muted-foreground"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
