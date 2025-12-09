// src/components/landing/Events.tsx
import { Button } from "@/components/ui/button";
import { featuredEvents } from "@/data/eventsData";
import { FeaturedEventCard } from "@/components/events/FeaturedEventCard";
import { UpcomingEventCard } from "@/components/events/UpcomingEventCard";
import { useLumaEvents } from "@/hooks/useLumaEvents";
import { format } from 'date-fns';

function LumaEventsList() {
  const { events, loading, error } = useLumaEvents();

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

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div 
          key={event.uid}
          className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
        >
          <h4 className="text-lg font-semibold mb-2">{event.title}</h4>
          <div className="text-sm text-muted-foreground mb-4">
            <p className="mb-1">
              {format(new Date(event.startDate), 'EEEE, MMMM d, yyyy')}
            </p>
            <p className="mb-1">
              {format(new Date(event.startDate), 'h:mm a')} - {format(new Date(event.endDate), 'h:mm a')}
            </p>
            {event.location && <p className="mt-2">📍 {event.location}</p>}
          </div>
          {event.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {event.description}
            </p>
          )}
          {event.url && (
            <a 
              href={event.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-2 text-primary hover:underline text-sm font-medium"
            >
              View Details →
            </a>
          )}
        </div>
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
