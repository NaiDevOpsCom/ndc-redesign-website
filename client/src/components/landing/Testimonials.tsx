import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { testimonials } from "@/data/testimonialsData";
import { useState, useEffect, useRef } from "react";

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Calculate total slides based on 3 cards per slide
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, totalSlides]);

  // Get current testimonials for display
  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return testimonials.slice(startIndex, startIndex + cardsPerSlide);
  };

  // Handle dot click
  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <section className="py-20 bg-background dark:bg-[#000000CC] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Members Say</h2>
          <p className="text-lg text-[#023047] dark:text-[#FFFFFFCC]">
            Real stories from people, Real community.
          </p>
        </div>
        
        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {getCurrentTestimonials().map((testimonial, index) => (
              <Card
                key={`${currentSlide}-${index}`}
                className="transition-all duration-500 shadow-sm hover:shadow-lg hover:shadow-gray-300 transform hover:scale-105"
                style={{ backgroundColor: "#FFFFFFB2" }}
              >
                <CardContent className="p-6">
                  {/* <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div> */}
                  <p className="text-muted-foreground mb-6 leading-relaxed dark:text-muted">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <Avatar className={`${testimonial.avatarColor} text-white`}>
                      <AvatarFallback className={`${testimonial.avatarColor} text-white`}>
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground dark:text-muted">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          {/* <div className="text-center mt-4 text-sm text-muted-foreground">
            {currentSlide + 1} of {totalSlides}
          </div> */}
        </div>
      </div>
    </section>
  );
}
