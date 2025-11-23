// src/components/events/FeaturedEventCard.tsx
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeaturedEvent } from "@/data/eventsData";

interface FeaturedEventCardProps {
  event: FeaturedEvent;
}

export function FeaturedEventCard({ event }: FeaturedEventCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img 
        src={event.image} 
        alt={event.title}
        className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105" 
      />
      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <Badge className={event.badgeColor}>{event.type}</Badge>
          <span className="ml-3 text-muted-foreground text-sm flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {event.date}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {event.title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {event.description}
        </p>
        <Button>{event.buttonText}</Button>
      </CardContent>
    </Card>
  );
}
