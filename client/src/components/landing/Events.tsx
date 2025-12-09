// src/components/landing/Events.tsx
import { Button } from "@/components/ui/button";
import { featuredEvents } from "@/data/eventsData";
import { FeaturedEventCard } from "@/components/events/FeaturedEventCard";
import { useLumaEvents } from "@/hooks/useLumaEvents";
import { format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

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
    <Card className="max-w-sm bg-card rounded-lg border border-border hover:shadow-md transition-shadow flex flex-col h-full">
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <Badge className="bg-primary/10 text-primary">Upcoming</Badge>
          {event.categories?.slice(0, 2).map(category => (
            <Badge key={category} variant="secondary">{category}</Badge>
          ))}
        </div>

        <h4 className="text-lg font-semibold mb-2 text-left">{event.title}</h4>

        <div className="text-sm text-muted-foreground mb-4 text-left">
          <p className="mb-1 flex items-center">
            <span className="mr-2">🗓️</span>
            {format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}
          </p>
          <p className="mb-1 flex items-center">
            <span className="mr-2">⏰</span>
            {format(new Date(event.startDate), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}
          </p>
          {event.location && (
            <p className="mt-2 flex items-center">
              <span className="mr-2">📍</span>
              {event.location}
            </p>
          )}
        </div>

        {event.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 text-left">
            {event.description}
          </p>
        )}

        {/* Push button to bottom with margin-top auto */}
        <div className="mt-auto pt-4">
          <Button
            className="w-full bg-primary text-white hover:bg-[#023047] transition-colors duration-200"
            onClick={() => {
              if (event.url) {
                window.open(event.url, '_blank', 'noopener,noreferrer');
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
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

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
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No upcoming events scheduled. Check back soon!</p>
      </div>
    );
  }

  if (events.length > 3) {
    return (
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-6xl mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem key={event.uid} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <EventCard event={event} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {events.map((event) => (
        <EventCard key={event.uid} event={event} />
      ))}
    </div>
  );
}

export default function Events() {
  return (
    <section id="events" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Events & Meetups
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join us for hands-on sessions, tech talks, and community meetups designed to sharpen your skills and elevate your DevOps journey.
          </p>
        </div>

        {/* Upcoming events from Luma Calendar */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            Upcoming Events
          </h3>
          <LumaEventsList />
        </div>


        {/* Featured Events */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            Featured Events
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredEvents.map((event, index) => (
              <FeaturedEventCard key={index} event={event} />
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            Past Events
          </h3>
          <p className="text-center text-muted-foreground mb-8">
            Missed an event? Check out our recorded sessions below.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* You can add past events here or leave empty for now */}
            <div className="text-center py-12 text-muted-foreground">
              Past events will appear here
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button size="lg" onClick={() => { window.location.href = '/events'; }}>
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
