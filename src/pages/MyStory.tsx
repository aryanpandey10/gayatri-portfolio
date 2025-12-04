import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition, { fadeUp, staggerContainer } from "@/components/layout/PageTransition";
import { galleryImages, paintings, lifestyleContent } from "@/data/content";
import { Play, Volume2 } from "lucide-react";
import { useRef } from "react";

const tabs = [
  { id: "gallery", label: "Gallery" },
  { id: "paintings", label: "Paintings" },
  { id: "lifestyle", label: "Lifestyle" },
];

const GalleryTab = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="masonry-grid"
  >
    {galleryImages.map((image, index) => (
      <motion.div
        key={image.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="overflow-hidden rounded-xl group cursor-pointer"
      >
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          src={image.src}
          alt={image.alt}
          className="w-full object-cover"
          style={{
            aspectRatio:
              image.aspectRatio === "portrait"
                ? "3/4"
                : image.aspectRatio === "landscape"
                ? "4/3"
                : "1/1",
          }}
        />
      </motion.div>
    ))}
  </motion.div>
);

const PaintingsTab = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    {paintings.map((painting, index) => (
      <motion.div
        key={painting.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-4">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            src={painting.image}
            alt={painting.title}
            className="w-full h-full object-cover"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center text-primary-foreground">
              <p className="font-display text-2xl">{painting.title}</p>
              <p className="text-sm opacity-80">{painting.medium}</p>
            </div>
          </div>
        </div>
        <h3 className="font-display text-xl">{painting.title}</h3>
        <p className="text-muted-foreground text-sm">
          {painting.medium} · {painting.year}
        </p>
      </motion.div>
    ))}
  </motion.div>
);

const LifestyleVideoCard = ({ content }: { content: typeof lifestyleContent[0] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleInteraction = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        videoRef.current.muted = true;
        setIsPlaying(false);
      } else {
        videoRef.current.muted = false;
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div
      className="relative aspect-[9/16] overflow-hidden rounded-xl cursor-pointer group"
      onClick={handleInteraction}
    >
      <video
        ref={videoRef}
        poster={content.thumbnail}
        src={content.videoUrl}
        loop
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      
      {/* Play overlay */}
      <div className={`absolute inset-0 bg-foreground/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center">
          <Play className="w-6 h-6 ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Sound indicator */}
      <div className={`absolute top-4 right-4 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-8 h-8 rounded-full bg-background/90 flex items-center justify-center">
          <Volume2 className="w-4 h-4" />
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent">
        <p className="text-primary-foreground text-sm">{content.caption}</p>
      </div>
    </div>
  );
};

const LifestyleTab = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="grid grid-cols-2 md:grid-cols-4 gap-4"
  >
    {lifestyleContent.map((content, index) => (
      <motion.div
        key={content.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
      >
        <LifestyleVideoCard content={content} />
      </motion.div>
    ))}
  </motion.div>
);

const MyStory = () => {
  const [activeTab, setActiveTab] = useState("gallery");

  return (
    <PageTransition>
      <main className="pt-24">
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="enter"
            >
              <motion.span
                variants={fadeUp}
                className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground"
              >
                My Story
              </motion.span>
              <motion.h1
                variants={fadeUp}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-light mt-4 mb-6"
              >
                A Visual Journey
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-lg max-w-2xl mb-12"
              >
                Explore my world through personal moments, artistic creations, 
                and glimpses into my creative lifestyle. Each image tells a story, 
                each painting holds emotion.
              </motion.p>

              {/* Tabs */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-2 mb-12"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full font-body text-sm tracking-wider uppercase transition-all ${
                      activeTab === tab.id
                        ? "bg-foreground text-background"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </motion.div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "gallery" && <GalleryTab key="gallery" />}
                {activeTab === "paintings" && <PaintingsTab key="paintings" />}
                {activeTab === "lifestyle" && <LifestyleTab key="lifestyle" />}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default MyStory;
