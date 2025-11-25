import { Button } from "@/components/ui/button";
import { allData } from "@/data/whatWeDoData";

export default function AboutSection() {
  const handleKnowUsClick = () => {
    window.location.href = '/about';
  };

  return (
    <section id="about" className="py-20 bg-[#d3d3d3] dark:bg-[#000000E5] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-primary">About Us</h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Player on the Left */}
          <div className="relative">
            <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/TLbR9oIszas"
                title="About Nairobi DevOps"
                className="w-full h-full rounded-2xl"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          
          {/* Text Content on the Right */}
          <div className="space-y-6 text-foreground dark:text-white">
            <h3 className="text-2xl font-semibold mb-4">Building a Stronger Tech Community Through DevOps.</h3>
            <p className="text-foreground dark:text-white leading-relaxed">
            As part of Nairobi’s growing tech ecosystem, we’re fostering inclusive learning, collaboration, and innovation among DevOps engineers, developers, designers, students, and tech enthusiasts across Kenya and beyond.
            </p>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 dark:bg-[#FFFFFF99] rounded-xl p-4">
              {allData.whatDefinesUs.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex flex-col items-center justify-center text-center gap-3">
                    <Icon className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <div className="text-xl md:text-2xl font-bold text-foreground">{stat.title}</div>
                      <div className="text-xs md:text-sm text-muted-foreground dark:text-white">{stat.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center space-x-4 pt-4 ">
              <Button size="lg" className="hover:bg-[#023047] transition-colors duration-200 " onClick={handleKnowUsClick}>
                Get to Know Us
              </Button>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
