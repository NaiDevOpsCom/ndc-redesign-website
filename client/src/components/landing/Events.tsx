import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Events() {
  const events = [
    {
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      type: "Workshop",
      date: "Dec 15, 2024",
      title: "API Testing Best Practices & Automation",
      description: "Deep dive into comprehensive API testing strategies, tools, and automation frameworks with hands-on practical sessions.",
      buttonText: "Register Now",
      buttonVariant: "default" as const,
      badgeColor: "bg-primary/10 text-primary",
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      type: "Meetup",
      date: "Dec 22, 2024",
      title: "API & Software Development",
      description: "Monthly networking meetup featuring lightning talks, project showcases, and collaborative discussions about the latest in DevOps trends.",
      buttonText: "Join Meetup",
      buttonVariant: "secondary" as const,
      badgeColor: "bg-green-500/10 text-green-500",
    },
  ];

  return (
    <section id="events" className="py-20 bg-[#023047] dark:bg-[rgba(0,0,0,0.8)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Events & Meetups</h2>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Workshops, Talks & Real-World Collaboration</h2>
          <p className="text-lg text-white ">
          Join us for hands-on sessions, tech talks, and community meetups designed to sharpen your skills and grow your DevOps journey.
          </p>
        </div>
          <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            Featured Events
          </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
        
          {events.map((event, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover hover-scale" 
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
                <Button variant={event.buttonVariant}>
                  {event.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Upcoming Events Section */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-12">
            Upcoming Events
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Automation Night */}
            <Card className="bg-[#d3d3d3] dark:bg-gray-800 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-center mb-4 text-foreground">
                  Automation Night
                </h4>
                <p className="text-muted-foreground text-sm text-center mb-4">
                  Online. Explore CI/CD pipelines and workflow hacks with guest engineers.
                </p>
                <div className="text-center mb-4">
                  <p className="font-semibold text-foreground">Thursday, August 1st 2025</p>
                </div>
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Join Us
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Hands-On Workshop */}
            <Card className="bg-[#d3d3d3] dark:bg-gray-800 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-center mb-4 text-foreground">
                  Hands-On Workshop: Kubernetes Basics
                </h4>
                <p className="text-muted-foreground text-sm text-center mb-4">
                  JKUAT Innovation Centre. For beginners and curious minds – bring your laptop and dive in.
                </p>
                <div className="text-center mb-4">
                  <p className="font-semibold text-foreground">Saturday, August 10th 2025</p>
                </div>
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Sign Up
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* DevOps Social Hour */}
            <Card className="bg-[#d3d3d3] dark:bg-gray-800 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-center mb-4 text-foreground">
                  DevOps Social Hour
                </h4>
                <p className="text-muted-foreground text-sm text-center mb-4">
                  The Alchemist, Westlands. Casual meetup, tech banter, and a chance to grow your network. Find us on us
                </p>
                <div className="text-center mb-4">
                  <p className="font-semibold text-foreground">Friday, August 15th 2025</p>
                </div>
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    RSVP
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="text-white border-white hover:bg-white ">
            View Our Events
          </Button>
        </div>

        
      </div>
    </section>
  );
}
