import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { feedbackVideos } from "@/data/content";
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/components/layout/PageTransition";

const VideoCard = ({ video, isActive }: { video: typeof feedbackVideos[0]; isActive?: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      setIsPlaying(false);
    }
  };

  const handleTouchStart = () => {
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
    <motion.div
      variants={fadeUp}
      className="video-card flex-shrink-0 w-full group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <video
        ref={videoRef}
        poster={video.poster}
        src={video.videoUrl}
        loop
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent transition-opacity duration-500 ${isHovered || isPlaying ? 'opacity-40' : 'opacity-100'}`} />
      
      {/* Play Icon with Pulse Animation */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-background/30 animate-ping" />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-background/95 backdrop-blur-sm flex items-center justify-center shadow-2xl">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 text-foreground" fill="currentColor" />
          </div>
        </motion.div>
      </div>

      {/* Sound Indicator */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isPlaying ? 1 : 0, scale: isPlaying ? 1 : 0.8 }}
        className="absolute top-3 right-3 sm:top-4 sm:right-4"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          ) : (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          )}
        </div>
      </motion.div>
      
      {/* Info Card */}
      <motion.div 
        className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 transition-all duration-500 ${isHovered ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <div className="bg-background/10 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-primary-foreground/10">
          <p className="text-primary-foreground font-medium text-sm sm:text-base">{video.name}</p>
          <p className="text-primary-foreground/70 text-xs sm:text-sm">{video.title}</p>
        </div>
      </motion.div>

      {/* Decorative corner accent */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 border-l-2 border-t-2 border-primary-foreground/30 rounded-tl-lg" />
    </motion.div>
  );
};

const VideoGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={ref} className="section-padding overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background">
      <div className="container-custom mb-8 sm:mb-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "enter" : "initial"}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-muted-foreground"
            >
              Client Feedback
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-light mt-3 sm:mt-4"
            >
              Video Testimonials
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground mt-3 max-w-md text-sm sm:text-base"
            >
              Hear directly from clients about their experience working with me
            </motion.p>
          </div>

          {/* Navigation Arrows - Desktop */}
          <motion.div variants={fadeUp} className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container - Desktop & Tablet */}
      <motion.div
        ref={scrollContainerRef}
        variants={staggerContainer}
        initial="initial"
        animate={isInView ? "enter" : "initial"}
        className="hidden sm:flex gap-4 md:gap-6 overflow-x-auto pb-4 px-4 sm:px-6 md:px-12 lg:px-20 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {feedbackVideos.map((video) => (
          <div key={video.id} className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] lg:w-[320px] snap-start">
            <VideoCard video={video} />
          </div>
        ))}
      </motion.div>

      {/* Mobile Grid - 2 columns */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate={isInView ? "enter" : "initial"}
        className="sm:hidden grid grid-cols-2 gap-3 px-4"
      >
        {feedbackVideos.slice(0, 4).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </motion.div>

      {/* Mobile scroll hint */}
      <motion.p
        variants={fadeUp}
        initial="initial"
        animate={isInView ? "enter" : "initial"}
        className="sm:hidden text-center text-muted-foreground text-xs mt-4 px-4"
      >
        Tap to play with sound
      </motion.p>
    </section>
  );
};

export default VideoGallery;
