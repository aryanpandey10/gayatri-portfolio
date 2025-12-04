import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { personalInfo, navigationLinks } from "@/data/content";
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-medium tracking-tight">
                  Gayatri
                </span>
                <span className="font-body text-sm font-light tracking-widest uppercase text-muted-foreground">
                  Dhanda
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              Artist, painter, and creative professional crafting meaningful
              visual experiences that connect and inspire.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-body text-sm font-medium tracking-wider uppercase mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                >
                  {link.name}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-body text-sm font-medium tracking-wider uppercase mb-6">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {personalInfo.email}
              </a>
              <p className="text-muted-foreground">{personalInfo.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with passion & creativity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
