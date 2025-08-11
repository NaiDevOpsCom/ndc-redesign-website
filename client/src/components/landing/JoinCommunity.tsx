import { Users, Linkedin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JoinCommunity() {
  return (
    <section 
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: "url('https://pbs.twimg.com/media/Gw1gwJhWsAAZcBo?format=jpg&name=large')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 bg-primary/80 dark:bg-primary/90"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Join Our Community
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Be part of Nairobi’s growing DevOps movement.
        </h3>
        <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
          Connect with fellow DevOps learners, builders, and leaders. Jump into conversations, share ideas, and grow with us.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            className="flex items-center text-lg px-8 py-4 hover:bg-[#023047] transition-colors duration-200 overflow-hidden"
            onClick={() => { window.location.href = "/join"; }}
          >
            <Users className="mr-3 h-5 w-5" />
            Join Our Community
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex items-center text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white hover:text-black overflow-hidden"
            onClick={() => window.open("https://www.linkedin.com/company/nairobidevops/", "_blank", "noopener,noreferrer")}
          >
            <Linkedin className="mr-3 h-5 w-5" />
            Connect On LinkedIn
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex items-center text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white hover:text-black overflow-hidden"
            onClick={() => window.open("https://x.com/nairobidevops", "_blank", "noopener,noreferrer")}
          >
            <X className="mr-3 h-5 w-5" />
            Follow On X
          </Button>
        </div>
      </div>
    </section>
  );
}
