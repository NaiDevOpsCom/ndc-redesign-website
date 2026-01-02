import React from "react";
import { format } from "date-fns";
import Autoplay from "embla-carousel-autoplay";
import { Calendar, Clock, MapPin, CalendarX } from "lucide-react";

import { useLumaEvents } from "@/hooks/useLumaEvents";
import { getRandomItems } from "@/utils/getRandomItems";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RecordedVideoCard from "@/components/RecordedVideoCard.tsx";
import { recordedSessions } from "@/data/communityPageData.ts";
// Reusable Event Card Component
interface EventCardProps {
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

function EventCard({ event }: EventCardProps) {
  return (
    <Card className="w-full bg-card rounded-lg border border-border hover:shadow-md transition-shadow flex flex-col h-full">
      <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col grow">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
          <Badge className="bg-primary/10 text-primary text-xs sm:text-sm">Upcoming</Badge>
          {event.categories?.slice(0, 2).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs sm:text-sm">
              {category}
            </Badge>
          ))}
        </div>

        <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-left line-clamp-2">
          {event.title}
        </h4>

        <div className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 text-left space-y-1">
          <p className="flex items-start">
            <Calendar className="mr-2 h-4 w-4 shrink-0 text-primary" />
            <span className="wrap-break-word">
              {format(new Date(event.startDate), "EEEE, MMMM d, yyyy")}
            </span>
          </p>
          <p className="flex items-start">
            <Clock className="mr-2 h-4 w-4 shrink-0 text-primary" />
            <span className="wrap-break-word">
              {format(new Date(event.startDate), "h:mm a")} -{" "}
              {format(new Date(event.endDate), "h:mm a")}
            </span>
          </p>
          {event.location && (
            <p className="flex items-start">
              <MapPin className="mr-2 h-4 w-4 shrink-0 text-primary" />
              <span className="wrap-break-word">{event.location}</span>
            </p>
          )}
        </div>

        {event.description && (
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-3 text-left">
            {event.description}
          </p>
        )}

        {/* Push button to bottom with margin-top auto */}
        <div className="mt-auto pt-3 sm:pt-4">
          <Button
            className="w-full bg-primary text-white hover:bg-[#023047] transition-colors duration-200 text-sm sm:text-base"
            onClick={() => {
              if (event.url) {
                window.open(event.url, "_blank", "noopener,noreferrer");
              }
            }}
          >
            Register
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function LumaEventsList() {
  const { events, loading, error } = useLumaEvents();
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading upcoming events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error loading events. Please try again later.</p>
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
          No Upcoming Events Scheduled
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
                <EventCard event={event} />
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
        <EventCard key={event.uid} event={event} />
      ))}
    </div>
  );
}


export default function Events() {
  const randomRecorded = React.useMemo(() => getRandomItems(recordedSessions, 4), []);
  return (
    <section
      id="events"
      className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Events & Meetups
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join us for hands-on sessions, tech talks, and community meetups designed to sharpen
            your skills and elevate your DevOps journey.
          </p>
        </div>

        {/* Upcoming events from Luma Calendar */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            Upcoming Events
          </h3>
          <LumaEventsList />
        </div>

        {/* Past Events */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            Past Events
          </h3>
          <p className="text-center text-muted-foreground mb-8">
            Missed an event? Check out our recorded sessions below.
          </p>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-flow-col auto-cols-[min(80%,320px)] gap-6 overflow-x-auto pb-2 lg:grid-flow-row lg:auto-cols-auto lg:grid-cols-4 lg:overflow-hidden">
              {randomRecorded.map((session) => (
                <RecordedVideoCard
                  key={session.id}
                  id={session.id}
                  title={session.title}
                  videoUrl={session.videoUrl}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-primary hover:bg-ndc-darkblue"
            onClick={() => {
              window.location.href = "/events";
            }}
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
