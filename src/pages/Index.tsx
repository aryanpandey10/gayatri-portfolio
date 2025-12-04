import PageTransition from "@/components/layout/PageTransition";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import FeaturedWorks from "@/components/home/FeaturedWorks";
import Testimonials from "@/components/home/Testimonials";
import VideoGallery from "@/components/home/VideoGallery";
import ContactCTA from "@/components/home/ContactCTA";

const Index = () => {
  return (
    <PageTransition>
      <main>
        <Hero />
        <AboutSection />
        <FeaturedWorks />
        <Testimonials />
        <VideoGallery />
        <ContactCTA />
      </main>
    </PageTransition>
  );
};

export default Index;
