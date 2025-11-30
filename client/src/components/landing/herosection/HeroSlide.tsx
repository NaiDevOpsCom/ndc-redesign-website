import { Users, Calendar, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSlideData } from "../../../data/heroSlidesData.ts";

interface HeroSlideProps {
  slide: HeroSlideData;
}

const iconMap: { [key: string]: React.ElementType } = {
  "Join Our Community": Users,
  "Upcoming Events": Calendar,
  "Explore Our Blog": ArrowRight,
  "View Past Talks": Calendar,
  "Become a Partner": Briefcase,
  "See Our Members": Users,
};


export default function HeroSlide({ slide }: HeroSlideProps) {
    
  const handlePrimaryClick = () => {
    window.location.href = slide.ctaPrimary.link;
  };

  const handleSecondaryClick = () => {
    if (slide.ctaSecondary.isScroll) {
      const el = document.getElementById(slide.ctaSecondary.link);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = slide.ctaSecondary.link;
    }
  };

  const PrimaryIcon = iconMap[slide.ctaPrimary.text] || Users;
  const SecondaryIcon = iconMap[slide.ctaSecondary.text] || Calendar;

  return (
    <div
      className="absolute inset-0 w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${slide.bgImage})` }}
      aria-label={slide.headlineMain}
      role="group"
    >
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      <div className="relative z-10 max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-center">
        <div>
          <h2 className="text-l md:text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
            {slide.headlineTop}
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {slide.headlineMain}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
            {slide.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="flex items-center text-lg px-8 py-4 hover:bg-[#023047] transition-colors duration-200"
              onClick={handlePrimaryClick}
            >
              <PrimaryIcon className="mr-2 h-5 w-5" />
              {slide.ctaPrimary.text}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
              onClick={handleSecondaryClick}
            >
              <SecondaryIcon className="mr-2 h-5 w-5" />
              {slide.ctaSecondary.text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
