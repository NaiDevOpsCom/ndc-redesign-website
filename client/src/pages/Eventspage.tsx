import React, { useState, useEffect, useRef, useCallback } from "react";
import { Cloud, Wrench, Award, Rocket, Handshake, Youtube, CalendarX } from "lucide-react";
import { Image as UnpicImage } from "@unpic/react";
import { Link } from "wouter";
import { format, isValid } from "date-fns";
import Autoplay from "embla-carousel-autoplay";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFAQsByCategory } from "@/data/faqData";
import { useLumaEvents } from "@/hooks/useLumaEvents";
import { GalleryImage, communityGallery } from "@/data/galleryData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RecordedVideoCard from "@/components/RecordedVideoCard";
import { recordedSessions } from "@/data/communityPageData";
import { getRandomItems } from "@/utils/getRandomItems";

// Reusable Event Card Component for Events Page
interface UpcomingEventCardProps {
  event: {
    uid: string;
    title: string;
    startDate: string;
    endDate: string;
    location?: string;
    description?: string;
    url?: string;
    categories?: string[];
  };
}

function UpcomingEventCard({ event }: UpcomingEventCardProps) {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  const isStartDateValid = isValid(startDate);
  const isEndDateValid = isValid(endDate);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full flex flex-col h-full">
      <CardContent className="flex flex-col items-start p-4 sm:p-5 md:p-6 grow">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
          <Badge className="bg-primary/10 text-primary text-xs sm:text-sm">Upcoming</Badge>
          {event.categories?.slice(0, 2).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs sm:text-sm">
              {category}
            </Badge>
          ))}
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-left line-clamp-2">
          {event.title}
        </h3>

        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground text-left">
          <div className="flex items-start gap-2">
            <span className="shrink-0">🗓️</span>
            <span className="wrap-break-word">
              {isStartDateValid ? format(startDate, "EEEE, MMMM d, yyyy") : "Invalid date"}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="shrink-0">⏰</span>
            <span className="wrap-break-word">
              {isStartDateValid ? format(startDate, "h:mm a") : "Invalid time"} -{" "}
              {isEndDateValid ? format(endDate, "h:mm a") : "Invalid time"}
            </span>
          </div>
          {event.location && (
            <div className="flex items-start gap-2">
              <span className="shrink-0">📍</span>
              <span className="wrap-break-word">{event.location}</span>
            </div>
          )}
        </div>

        {event.description && (
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-3 text-left">
            {event.description}
          </p>
        )}

        {/* Push button to bottom */}
        <div className="mt-auto pt-3 sm:pt-4 w-full">
          <Button
            className="w-full bg-primary text-white hover:bg-[#023047] transition-colors duration-200 text-sm sm:text-base"
            onClick={() => {
              if (event.url) {
                window.open(event.url, "_blank", "noopener,noreferrer");
              }
            }}
          >
            View Details & Register
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function UpcomingLumaEvents() {
  const { events, loading, error } = useLumaEvents();
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading upcoming events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error loading events from Luma calendar.</p>
        <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        {/* Calendar Icon with "0" Badge */}
        <div className="relative mb-6">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
            <CalendarX className="h-16 w-16 text-gray-300 dark:text-gray-600" />
          </div>
          <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-900 rounded-full w-12 h-12 flex items-center justify-center shadow-md border-2 border-gray-200 dark:border-gray-700">
            <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">0</span>
          </div>
        </div>

        {/* Headline */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          No Upcoming Events
        </h3>

        {/* Description */}
        <p className="text-lg max-w-3xl text-muted-foreground text-center mb-6">
          We don&apos;t have any events scheduled at the moment, but we&apos;re always planning
          something exciting. Subscribe to our newsletter to be notified when new events are
          announced.
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-primary hover:bg-[#023047] text-white px-8 py-6 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => {
            const newsletterSection = document.getElementById("newsletter");
            if (newsletterSection) {
              newsletterSection.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }}
        >
          Be the First to Know
        </Button>
      </div>
    );
  }

  if (events.length > 3) {
    return (
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {events.map((event) => (
            <CarouselItem
              key={event.uid}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div className="h-full">
                <UpcomingEventCard event={event} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {events.map((event) => (
        <UpcomingEventCard key={event.uid} event={event} />
      ))}
    </div>
  );
}

// --- Main Page Component ---
export default function Eventspage() {
  // --- Data ---

  const reasons = [
    { icon: Cloud, title: "Explore cloud and DevOps" },
    { icon: Wrench, title: "Spark practical learning and growth" },
    { icon: Award, title: "Recognize and certify practical skills" },
    { icon: Rocket, title: "Empower Kenya's future tech leaders" },
    { icon: Handshake, title: "Host workshops and campus tours" },
  ];

  // Random background image for "Why Our Events Matter"
  const [matterBgImage] = useState<GalleryImage | null>(() => {
    return getRandomItems(communityGallery, 1)[0] || null;
  });

  // Random CTA background image from galleryData (weighted by priority)
  const [ctaBgImage] = useState<GalleryImage>(() => {
    const pool = communityGallery.flatMap((img) => (img.priority ? [img, img] : [img]));
    return pool.length > 0
      ? pool[Math.floor(Math.random() * pool.length)]
      : { url: "", alt: "Community image", priority: false };
  });

  // --- Render ---
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <header
        className="relative min-h-[50vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/nairobidevops/ndc-assets/PXL_20240601_141554232.jpg?updatedAt=1755152981738')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Events & Workshops
          </h1>
          <p className="text-md md:text-lg text-white/80 max-w-3xl mx-auto mb-8">
            Discover what’s happening, when, and why it matters. From casual meetups to hands-on
            workshops, our events are where DevOps ideas come to life—your voice included.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-[#023047] text-white"
              onClick={() => (window.location.hash = "#meetup")}
            >
              Check our Events
            </Button>
          </div>
        </div>
      </header>

      {/* Why Our Events Matter */}
      <section className="py-16 lg:py-24 bg-blue-50 dark:bg-ndc-darkblue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Our Events Matter
              </h2>
              <ul className="space-y-6 max-w-xl">
                {reasons.map(({ icon: Icon, title }, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="shrink-0 mt-1">
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-white shadow text-primary">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                    </span>
                    <span className="text-base md:text-lg text-gray-800 dark:text-gray-200">
                      {title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <UnpicImage
                  src={
                    matterBgImage?.url ||
                    "https://ik.imagekit.io/nairobidevops/ndcAssets/IMG_9864.jpg?updatedAt=1764488001283"
                  }
                  alt={matterBgImage?.alt || "Event group photo"}
                  className="w-full h-80 md:h-96 object-cover"
                  width={1200}
                  height={800}
                  loading="lazy"
                  layout="constrained"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meetups */}
      <section id="meetup" className="py-16 lg:py-24 dark:bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Events & Meetups</h2>
            <h3 className="text-3xl md:text-4xl font-bold">
              Workshops, Talks & Real-World Collaboration
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
              Join us for hands-on sessions, tech talks, and community meetups designed to sharpen
              your skills and grow your DevOps journey.
            </p>
          </div>

          {/* Upcoming Events from Luma */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
              Upcoming Events
            </h3>
            <UpcomingLumaEvents />
          </div>
        </div>
      </section>

      {/* Past Events Highlights */}
      <section className="py-16 lg:py-24 bg-primary-light-blue dark:bg-ndc-darkblue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Past Events Highlights</h2>
          </div>
          <p className="text-center text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Explore our curated selection of past sessions — recordings, recaps, and highlights to
            help you catch up, learn, and revisit talks from our community events.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recordedSessions.map((session) => (
              <RecordedVideoCard
                key={session.id}
                id={session.id}
                title={session.title}
                videoUrl={session.videoUrl}
              />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            {/* hidden md:inline-flex bg-primary text-white hover:bg-[#023047] transition-colors duration-200 */}

            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white bg-primary hover:bg-ndc-darkblue hover:text-white px-8 py-6 text-lg transition-all duration-300 shadow-lg dark:bg-white dark:text-primary dark:hover:bg-primary dark:hover:text-white"
            >
              <a
                href="https://www.youtube.com/@NairobiDevopsCommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Youtube className="w-5 h-5" />
                <span>Visit Channel Library</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image with optimized loading */}
        <div className="absolute inset-0">
          {ctaBgImage.url && (
            <UnpicImage
              src={ctaBgImage.url}
              alt={ctaBgImage.alt}
              layout="fullWidth"
              className="w-full h-full object-cover"
              loading="lazy"
              priority={false}
            />
          )}
        </div>

        {/* Dark overlay: 70% black */}
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Join the Movement</h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Whether you want to attend events, share your expertise as a speaker, host a campus
            session, or partner with us—there&apos;s a place for you in the Nairobi DevOps
            Community. Let&apos;s build the future of tech together.
          </p>
          <div className="flex flex-col lg:flex-row flex-wrap gap-4 items-center justify-center">
            {/* Primary CTA */}
            <div className="mb-6 lg:mb-0 lg:mr-6">
              <Link href="/partners">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-[#023047] text-white px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Partner with Us
                </Button>
              </Link>
            </div>

            {/* Secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/partners">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 text-base font-medium backdrop-blur-sm transition-all duration-300"
                >
                  Become a Speaker
                </Button>
              </Link>
              <Link href="/community#campustour">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 text-base font-medium backdrop-blur-sm transition-all duration-300"
                >
                  Learn About Campus Tour
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (Events & Programs) - Carousel showing 3 cards per slide */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-2">
              Filtered to the &ldquo;Events & Programs&rdquo; category.
            </p>
          </div>

          {/* Carousel container */}
          <FAQCarousel />
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- FAQ Carousel (Events & Programs) ---
function FAQCarousel() {
  const faqsForEvents = getFAQsByCategory("Events & Programs");
  const perSlide = 3;
  const slides: (typeof faqsForEvents)[] = [];
  for (let i = 0; i < faqsForEvents.length; i += perSlide) {
    slides.push(faqsForEvents.slice(i, i + perSlide));
  }

  const [slideIdx, setSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const next = useCallback(() => {
    setSlideIdx((s) => (s + 1) % slides.length);
  }, [slides.length]);

  // const prev = useCallback(() => {
  //   setSlideIdx((s) => (s - 1 + slides.length) % slides.length);
  // }, [slides.length]);

  // Attach event listeners manually to avoid ESLint non-interactive element warnings
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);
    const handleFocusIn = () => setIsPaused(true);
    const handleFocusOut = () => setIsPaused(false);

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("focusin", handleFocusIn);
    container.addEventListener("focusout", handleFocusOut);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("focusin", handleFocusIn);
      container.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  // Autoplay: advance every 5s when not paused
  useEffect(() => {
    // clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!isPaused && slides.length > 1) {
      intervalRef.current = window.setInterval(() => {
        next();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, slides.length, next]);

  if (slides.length === 0) {
    return (
      <p className="text-center text-muted-foreground">No FAQs available for this category.</p>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative rounded-lg outline-none"
      aria-roledescription="carousel"
      aria-label="Event FAQs Carousel"
    >
      {/* Slides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {slides[slideIdx].map((f, idx) => (
          <div key={`${f.question}-${idx}`} className="bg-primary-light-blue rounded-lg p-6">
            <h3 className="font-semibold mb-3">{f.question}</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{f.answer}</p>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={`dot-${i}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === slideIdx}
            onClick={() => {
              setSlideIdx(i);
              setIsPaused(true);
            }}
            className={`h-3 w-3 rounded-full ${i === slideIdx ? "bg-primary" : "bg-primary-light-blue dark:bg-slate-600"}`}
          />
        ))}
      </div>
    </section>
  );
}
