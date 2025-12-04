import { useState } from "react";
import { motion } from "framer-motion";
import PageTransition, { fadeUp, staggerContainer } from "@/components/layout/PageTransition";
import { personalInfo } from "@/data/content";
import { Instagram, Linkedin, Mail, MapPin, ArrowUpRight, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    console.log("Form submitted:", formData);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <PageTransition>
      <main className="pt-24">
        <section className="section-padding min-h-[calc(100vh-6rem)]">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Left Column - Info */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="enter"
              >
                <motion.span
                  variants={fadeUp}
                  className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground"
                >
                  Get in Touch
                </motion.span>
                <motion.h1
                  variants={fadeUp}
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-light mt-4 mb-6"
                >
                  Let's create
                  <span className="italic text-muted-foreground"> together</span>
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  className="text-muted-foreground text-lg mb-12 max-w-md"
                >
                  Have a project in mind or just want to chat about art and creativity? 
                  I'd love to hear from you. Fill out the form or reach out directly.
                </motion.p>

                {/* Contact Info */}
                <motion.div variants={fadeUp} className="space-y-6 mb-12">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="group-hover:text-muted-foreground transition-colors">
                        {personalInfo.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p>{personalInfo.location}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div variants={fadeUp}>
                  <p className="text-sm text-muted-foreground mb-4">Follow me</p>
                  <div className="flex gap-3">
                    <a
                      href={personalInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors group"
                    >
                      <Instagram className="w-4 h-4" />
                      <span className="text-sm">Instagram</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors group"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-sm">LinkedIn</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="enter"
              >
                <motion.form
                  variants={fadeUp}
                  onSubmit={handleSubmit}
                  className="bg-secondary/30 rounded-2xl p-8 md:p-10"
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none"
                        placeholder="Tell me about your project or just say hello..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-lg font-body text-sm tracking-wider uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Contact;
