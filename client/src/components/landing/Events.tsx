// src/components/landing/Events.tsx
import { Button } from "@/components/ui/button";
import { featuredEvents, upcomingEvents } from "@/data/eventsData";
import { FeaturedEventCard } from "@/components/events/FeaturedEventCard";
import { UpcomingEventCard } from "@/components/events/UpcomingEventCard";

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

        {/* Upcoming Events */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            Upcoming
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <UpcomingEventCard key={index} event={event} />
            ))}
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
