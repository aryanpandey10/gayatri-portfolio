import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const defaultSEO = {
  title: "Gayatri Dhanda | Artist, Painter & Creative Professional",
  description: "Gayatri Dhanda is an artist, painter, social media influencer and corporate creative professional. Explore her portfolio of paintings, artwork, and creative projects.",
  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200",
  type: "website",
};

const pageSEO: Record<string, SEOProps> = {
  "/": {
    title: "Gayatri Dhanda | Artist, Painter & Creative Professional",
    description: "Welcome to the portfolio of Gayatri Dhanda - a passionate artist, painter, and creative professional crafting meaningful visual experiences.",
  },
  "/about": {
    title: "About Gayatri Dhanda | My Story & Creative Journey",
    description: "Learn about Gayatri Dhanda's artistic journey, experience, skills, and passion for creating meaningful art and visual experiences.",
  },
  "/my-story": {
    title: "My Story | Gallery, Paintings & Lifestyle | Gayatri Dhanda",
    description: "Explore Gayatri Dhanda's visual journey through personal gallery, original paintings, and lifestyle content. Each piece tells a unique story.",
  },
  "/contact": {
    title: "Contact Gayatri Dhanda | Commission Art & Collaborate",
    description: "Get in touch with Gayatri Dhanda for art commissions, brand collaborations, or creative consultations. Let's bring your vision to life.",
  },
};

const SEO = ({ title, description, image, type }: SEOProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const pageData = pageSEO[currentPath] || {};
  const seo = {
    title: title || pageData.title || defaultSEO.title,
    description: description || pageData.description || defaultSEO.description,
    image: image || defaultSEO.image,
    type: type || defaultSEO.type,
  };

  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", seo.description);
    
    // Open Graph tags
    updateMetaTag("og:title", seo.title, true);
    updateMetaTag("og:description", seo.description, true);
    updateMetaTag("og:image", seo.image, true);
    updateMetaTag("og:type", seo.type, true);
    updateMetaTag("og:url", window.location.href, true);
    
    // Twitter Card tags
    updateMetaTag("twitter:title", seo.title);
    updateMetaTag("twitter:description", seo.description);
    updateMetaTag("twitter:image", seo.image);
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = window.location.origin + currentPath;

  }, [seo.title, seo.description, seo.image, seo.type, currentPath]);

  return null;
};

export default SEO;
