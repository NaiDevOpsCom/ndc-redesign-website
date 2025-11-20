import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { testimonials } from "@/data/testimonialsData";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="py-20 bg-background dark:bg-[#000000CC] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Members Say</h2>
          <p className="text-lg text-[#023047] dark:text-[#FFFFFFCC]">
            Real stories from people, Real community.
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="embla__slide flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                  <Card
                    className="h-full transition-all duration-500 shadow-sm hover:shadow-lg hover:shadow-gray-300 transform hover:scale-105"
                    style={{ backgroundColor: "#FFFFFFB2" }}
                  >
                    <CardContent className="p-6 flex flex-col">
                      <p className="text-muted-foreground mb-6 leading-relaxed dark:text-muted flex-grow">
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
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {emblaApi?.scrollSnapList().map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-primary scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
