import { Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const handleJoinClick = () => {
    window.location.href = '/join';
  };

  const handleEventsClick = () => {
    const el = document.getElementById('events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(https://pbs.twimg.com/media/GazTq0aaMAAFNSa?format=jpg&name=large)",
      }}
    >
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-in-up">
        <h1 className="text-l md:text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
              Innovate . Empower . Grow.
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome To <span className="text-primary">Nairobi DevOps Community</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
          Promoting Collaboration, Innovation and best practices within the DevOps industry in Nairobi and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center ">
            <Button size="lg" className="flex items-center text-lg px-8 py-4 hover:bg-[#023047] transition-colors duration-200" onClick={handleJoinClick}>
              <Users className="mr-2 h-5 w-5" />
              Join Our Community
            </Button>
            <Button variant="outline" size="lg" className="flex items-center text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white hover:text-black" onClick={handleEventsClick}>
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Events
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
